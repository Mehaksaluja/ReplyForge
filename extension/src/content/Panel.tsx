import { useEffect, useState } from "react";
import type {
  GenerateRequestMessage,
  GenerateResponseMessage,
  GetProStatusMessage,
  OpenUpgradePageMessage,
  ProStatusResponseMessage,
  TogglePanelMessage,
  HistoryTurn,
} from "../types";

interface ChatMessage {
  id: number;
  role: "assistant" | "user";
  text: string;
  isError?: boolean;
  insertable?: boolean;
  paywall?: boolean;
  retryInstruction?: string;
}

const INTRO_MESSAGE: ChatMessage = {
  id: 0,
  role: "assistant",
  text: 'Hi! I\'m ReplyForge. Open an email and tell me what to do, like "accept politely," "tell them I\'ll send it tomorrow," or "say no politely," and I\'ll write the reply for you.',
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

function requestReply(
  thread: string,
  instruction: string,
  history: HistoryTurn[]
): Promise<GenerateResponseMessage> {
  const message: GenerateRequestMessage = { type: "GENERATE_REPLY", thread, instruction, history };
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (response: GenerateResponseMessage) => {
      resolve(response ?? { error: "No response from extension background." });
    });
  });
}

// The panel keeps the AI's prior drafts and instructions as real conversation
// history so follow-ups like "remove that line" have something to refer to.
// Error/paywall messages are excluded since they were never part of what the
// model actually said.
function buildHistory(messages: ChatMessage[]): HistoryTurn[] {
  return messages
    .filter((m) => m.id !== INTRO_MESSAGE.id && !m.isError)
    .map((m) => ({ role: m.role, content: m.text }));
}

function openUpgradePage() {
  const message: OpenUpgradePageMessage = { type: "OPEN_UPGRADE_PAGE" };
  chrome.runtime.sendMessage(message);
}

function checkProStatus(): Promise<boolean> {
  const message: GetProStatusMessage = { type: "GET_PRO_STATUS" };
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (response?: ProStatusResponseMessage) => {
      resolve(response?.isPro ?? false);
    });
  });
}

interface PanelProps {
  getThreadContext: () => string;
  onInsert: (text: string) => Promise<boolean>;
}

export function Panel({ getThreadContext, onInsert }: PanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [insertedId, setInsertedId] = useState<number | null>(null);
  const [insertingId, setInsertingId] = useState<number | null>(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    function handleRuntimeMessage(message: TogglePanelMessage) {
      if (message.type === "TOGGLE_PANEL") {
        setIsOpen((v) => !v);
      }
    }
    chrome.runtime.onMessage.addListener(handleRuntimeMessage);
    return () => chrome.runtime.onMessage.removeListener(handleRuntimeMessage);
  }, []);

  useEffect(() => {
    // Re-check on every open, not just once on mount, so upgrading in another
    // tab (or a stale cached token) is reflected next time the panel is used
    // rather than only after a full Gmail reload.
    if (!isOpen) return;
    let cancelled = false;
    checkProStatus().then((pro) => {
      if (!cancelled) setIsPro(pro);
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    // Gmail is a single-page app that switches threads by changing the URL
    // hash rather than navigating. Conversation history must not leak from
    // one email into another, so wipe it whenever Gmail moves to a different
    // thread (or back to the inbox list).
    function handleHashChange() {
      setMessages([INTRO_MESSAGE]);
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function pushResponse(instruction: string, response: GenerateResponseMessage) {
    if (response.error === "free_tier_exhausted") {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          role: "assistant",
          text: "You've used all 5 free replies. Upgrade to keep going.",
          isError: true,
          paywall: true,
        },
      ]);
      return;
    }

    if (response.error || !response.reply) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          role: "assistant",
          text: response.error ?? "Something went wrong.",
          isError: true,
          retryInstruction: instruction,
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: prev.length, role: "assistant", text: response.reply as string, insertable: true },
    ]);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const thread = getThreadContext();
    const history = buildHistory(messages);
    setMessages((prev) => [...prev, { id: prev.length, role: "user", text }]);
    setInput("");
    setIsLoading(true);

    const response = await requestReply(thread, text, history);
    setIsLoading(false);
    pushResponse(text, response);
  }

  async function handleRetry(message: ChatMessage) {
    if (!message.retryInstruction || isLoading) return;
    setIsLoading(true);
    const thread = getThreadContext();
    const history = buildHistory(messages);
    const response = await requestReply(thread, message.retryInstruction, history);
    setIsLoading(false);
    pushResponse(message.retryInstruction, response);
  }

  function handleUpgrade() {
    openUpgradePage();
  }

  async function handleInsert(message: ChatMessage) {
    if (insertingId !== null) return;
    setInsertingId(message.id);
    const success = await onInsert(message.text);
    setInsertingId(null);
    if (success) {
      setInsertedId(message.id);
      setTimeout(() => setInsertedId((id) => (id === message.id ? null : id)), 2000);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          role: "assistant",
          text: "Couldn't open a reply box for this email. Open the thread in Gmail and try again.",
          isError: true,
        },
      ]);
    }
  }

  return (
    <>
      <button className="rf-fab" onClick={() => setIsOpen((v) => !v)} aria-label="Open ReplyForge">
        {isOpen ? <CloseIcon size={20} /> : <ChatIcon />}
      </button>

      {isOpen && (
        <div className="rf-panel">
          <div className="rf-header">
            <span>
              ReplyForge
              {isPro && <span className="rf-pro-badge">Pro</span>}
            </span>
            <button className="rf-close" onClick={() => setIsOpen(false)} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div className="rf-messages">
            {messages.map((m) => (
              <div key={m.id} className={`rf-message rf-message-${m.role}${m.isError ? " rf-message-error" : ""}`}>
                <div>{m.text}</div>
                {m.insertable && (
                  <button
                    className="rf-insert"
                    onClick={() => handleInsert(m)}
                    disabled={insertingId === m.id}
                  >
                    {insertedId === m.id
                      ? "Inserted"
                      : insertingId === m.id
                        ? "Opening reply..."
                        : "Insert into Reply"}
                  </button>
                )}
                {m.paywall && (
                  <button className="rf-insert" onClick={handleUpgrade}>
                    Upgrade
                  </button>
                )}
                {m.retryInstruction && (
                  <button className="rf-insert" onClick={() => handleRetry(m)} disabled={isLoading}>
                    Retry
                  </button>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="rf-message rf-message-assistant rf-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className="rf-input-row">
            <textarea
              className="rf-input"
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
            <button className="rf-send" onClick={handleSend} disabled={!input.trim() || isLoading}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
