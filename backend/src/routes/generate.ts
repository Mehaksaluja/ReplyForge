import { Router } from "express";
import { generateReply } from "../services/openai.js";
import { requireAuth } from "../middleware/auth.js";
import { requireEntitlement } from "../middleware/entitlement.js";

export const generateRouter = Router();

generateRouter.post("/", requireAuth, requireEntitlement, async (req, res) => {
  const { thread, instruction } = req.body as { thread?: string; instruction?: string };

  if (!instruction || typeof instruction !== "string") {
    res.status(400).json({ error: "Missing 'instruction' in request body" });
    return;
  }

  try {
    const reply = await generateReply(thread ?? "", instruction);
    res.json({ reply });
  } catch (err) {
    console.error("generateReply failed:", err);
    res.status(500).json({ error: "Failed to generate reply" });
  }
});
