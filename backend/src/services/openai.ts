import OpenAI from "openai";

let client: OpenAI | undefined;

function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

const SYSTEM_PROMPT = `You are an email assistant embedded inside Gmail.
You are given the full email thread — every message in it, listed in
chronological order (oldest first) and labeled with its position — plus an
instruction from the user telling you what kind of reply to write.

Write a reply to the message explicitly marked "(reply to this one)" — that is
the specific message the user is responding to, which may or may not be the
most recent message in the thread. Use the other messages only as background
context — prior commitments, established tone, facts already agreed on — do
not re-address something a later message already resolved unless the marked
message is itself that later message.

Write only the reply itself — no subject line, no "Here's a reply:" preamble,
no explanation. Match a natural, professional email tone unless the
instruction says otherwise.`;

export async function generateReply(thread: string, instruction: string): Promise<string> {
  const completion = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Email thread:\n"""\n${thread}\n"""\n\nInstruction: ${instruction}`,
      },
    ],
    temperature: 0.7,
  });

  const reply = completion.choices[0]?.message?.content;
  if (!reply) {
    throw new Error("OpenAI returned an empty response");
  }
  return reply.trim();
}
