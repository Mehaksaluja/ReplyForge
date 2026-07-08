import { Router } from "express";
import { generateReply } from "../services/openai.js";

export const generateRouter = Router();

generateRouter.post("/", async (req, res) => {
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
