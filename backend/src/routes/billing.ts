import { Router, type Request, type Response } from "express";
import DodoPayments from "dodopayments";
import { getSupabase } from "../db/supabase.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

function getDodoClient(): DodoPayments {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  if (!apiKey) {
    throw new Error("DODO_PAYMENTS_API_KEY must be set");
  }
  return new DodoPayments({
    bearerToken: apiKey,
    webhookKey,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode",
  });
}

export const billingRouter = Router();

billingRouter.post("/create-checkout-session", requireAuth, async (req: AuthedRequest, res: Response) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ error: "missing_token" });
    return;
  }

  const productId = process.env.DODO_PAYMENTS_PRODUCT_ID;
  if (!productId) {
    res.status(500).json({ error: "Dodo Payments product not configured" });
    return;
  }

  try {
    const dodo = getDodoClient();
    const session = await dodo.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: { email: user.email, name: user.name },
      metadata: { userId: user.id },
      return_url: process.env.DODO_PAYMENTS_SUCCESS_URL ?? "https://example.com/success",
      cancel_url: process.env.DODO_PAYMENTS_CANCEL_URL ?? "https://example.com/cancel",
    });

    if (!session.checkout_url) {
      throw new Error("Dodo Payments session missing checkout_url");
    }
    res.json({ url: session.checkout_url });
  } catch (err) {
    console.error("Failed to create checkout session:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export async function dodoWebhookHandler(req: Request, res: Response) {
  const webhookId = req.headers["webhook-id"];
  const webhookSignature = req.headers["webhook-signature"];
  const webhookTimestamp = req.headers["webhook-timestamp"];
  if (
    typeof webhookId !== "string" ||
    typeof webhookSignature !== "string" ||
    typeof webhookTimestamp !== "string"
  ) {
    res.status(400).json({ error: "Missing webhook signature headers" });
    return;
  }

  const rawBody = (req.body as Buffer).toString("utf8");

  let event: DodoPayments.Webhooks.UnwrapWebhookEvent;
  try {
    const dodo = getDodoClient();
    event = dodo.webhooks.unwrap(rawBody, {
      headers: {
        "webhook-id": webhookId,
        "webhook-signature": webhookSignature,
        "webhook-timestamp": webhookTimestamp,
      },
    });
  } catch (err) {
    console.error("Dodo Payments webhook signature verification failed:", err);
    res.status(400).json({ error: "Invalid signature" });
    return;
  }

  try {
    const supabase = getSupabase();

    if (event.type === "subscription.active" || event.type === "subscription.renewed") {
      const email = event.data.customer.email;
      const customerId = event.data.customer.customer_id;
      const { error } = await supabase
        .from("users")
        .update({ subscription_status: "active", payment_customer_id: customerId })
        .eq("email", email);
      if (error) throw error;
    } else if (event.type === "subscription.cancelled" || event.type === "subscription.expired") {
      const email = event.data.customer.email;
      const { error } = await supabase
        .from("users")
        .update({ subscription_status: "canceled" })
        .eq("email", email);
      if (error) throw error;
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Failed to process Dodo Payments webhook:", err);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}
