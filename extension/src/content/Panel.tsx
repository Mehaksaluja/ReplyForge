import { useState } from "react";
import type { GenerateRequestMessage, GenerateResponseMessage } from "../types";

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  text: string;
  isError?: boolean;
  insertable?: boolean;
}

const INTRO_MESSAGE: ChatMessage = {
  id: 0,
  role: "assistant",
  text: 'Hi! I\'m MailPilot. Open an email and tell me what to do — e.g. "accept politely", "tell them I\'ll send it tomorrow", or "say no politely" — and I\'ll write the reply for you.',
};

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CloseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function requestReply(thread: string, instruction: string): Promise<GenerateResponseMessage> {
  const message: GenerateRequestMessage = { type: "GENERATE_REPLY", thread, instruction };
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (response: GenerateResponseMessage) => {
      resolve(response ?? { error: "No response from extension background." });
    });
  });
}

interface PanelProps {
  getThreadContext: () => string;
  onInsert: (text: string) => boolean;
}

export function Panel({ getThreadContext, onInsert }: PanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [insertedId, setInsertedId] = useState<number | null>(null);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const thread = getThreadContext();
    setMessages((prev) => [...prev, { id: prev.length, role: "user", text }]);
    setInput("");
    setIsLoading(true);

    const response = await requestReply(thread, text);
    setIsLoading(false);

    if (response.error || !response.reply) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length, role: "assistant", text: response.error ?? "Something went wrong.", isError: true },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: prev.length, role: "assistant", text: response.reply as string, insertable: true },
    ]);
  }

  function handleInsert(message: ChatMessage) {
    const success = onInsert(message.text);
    if (success) {
      setInsertedId(message.id);
      setTimeout(() => setInsertedId((id) => (id === message.id ? null : id)), 2000);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          role: "assistant",
          text: "No open reply box found. Click Reply on an email first, then try inserting again.",
          isError: true,
        },
      ]);
    }
  }

  return (
    <>
      <button className="mp-fab" onClick={() => setIsOpen((v) => !v)} aria-label="Open MailPilot">
        {isOpen ? <CloseIcon size={20} /> : <ChatIcon />}
      </button>

      {isOpen && (
        <div className="mp-panel">
          <div className="mp-header">
            <span>MailPilot</span>
            <button className="mp-close" onClick={() => setIsOpen(false)} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div className="mp-messages">
            {messages.map((m) => (
              <div key={m.id} className={`mp-message mp-message-${m.role}${m.isError ? " mp-message-error" : ""}`}>
                <div>{m.text}</div>
                {m.insertable && (
                  <button
                    className="mp-insert"
                    onClick={() => handleInsert(m)}
                  >
                    {insertedId === m.id ? "Inserted" : "Insert into Reply"}
                  </button>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="mp-message mp-message-assistant mp-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className="mp-input-row">
            <textarea
              className="mp-input"
              placeholder="Tell me what to reply..."
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button className="mp-send" onClick={handleSend} disabled={!input.trim() || isLoading}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
