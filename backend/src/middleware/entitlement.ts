import type { Response, NextFunction } from "express";
import { getSupabase } from "../db/supabase.js";
import type { AuthedRequest } from "./auth.js";

const FREE_REPLY_LIMIT = 5;

export async function requireEntitlement(req: AuthedRequest, res: Response, next: NextFunction) {
  const user = req.user;
  if (!user) {
    res.status(401).json({ error: "missing_token" });
    return;
  }

  if (user.subscriptionStatus === "active") {
    next();
    return;
  }

  if (user.freeRepliesUsed >= FREE_REPLY_LIMIT) {
    res.status(402).json({ error: "free_tier_exhausted" });
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("users")
      .update({ free_replies_used: user.freeRepliesUsed + 1 })
      .eq("id", user.id);
    if (error) throw error;
    next();
  } catch (err) {
    console.error("Failed to record usage:", err);
    res.status(500).json({ error: "internal_error" });
  }
}
