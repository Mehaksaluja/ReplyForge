import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateRouter } from "./routes/generate.js";
import { billingRouter, dodoWebhookHandler } from "./routes/billing.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());

// Must be registered before express.json() below: Dodo Payments' signature
// check requires the raw, unparsed request body.
app.post("/billing/webhook", express.raw({ type: "application/json" }), dodoWebhookHandler);

app.use(express.json());

app.use("/generate", generateRouter);
app.use("/billing", billingRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`ReplyForge backend listening on http://localhost:${port}`);
});
