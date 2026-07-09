import type {
  GenerateRequestMessage,
  GenerateResponseMessage,
  CreateCheckoutMessage,
  CreateCheckoutResponseMessage,
  TogglePanelMessage,
} from "../types";

const BACKEND_BASE = "http://localhost:3000";

chrome.runtime.onInstalled.addListener(() => {
  console.log("ReplyForge installed");
});

async function getAuthToken(interactive: boolean): Promise<string> {
  const result = await chrome.identity.getAuthToken({ interactive });
  if (!result.token) {
    throw new Error("No auth token returned");
  }
  return result.token;
}

// Content scripts run on mail.google.com and are subject to Gmail's page CSP,
// which complicates cross-origin fetches. The background worker has its own
// host_permissions and isn't bound by the page's CSP, so it does the fetch
// and relays the result back to the content script.
async function authorizedFetch(path: string, body: unknown): Promise<Response> {
  const token = await getAuthToken(true);
  return fetch(`${BACKEND_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

chrome.runtime.onMessage.addListener(
  (message: GenerateRequestMessage | CreateCheckoutMessage, _sender, sendResponse) => {
    if (message.type === "GENERATE_REPLY") {
      (async () => {
        try {
          const res = await authorizedFetch("/generate", {
            thread: message.thread,
            instruction: message.instruction,
          });
          const data = await res.json();
          if (!res.ok) {
            const response: GenerateResponseMessage = { error: data.error ?? "Request failed" };
            sendResponse(response);
            return;
          }
          const response: GenerateResponseMessage = { reply: data.reply };
          sendResponse(response);
        } catch (err) {
          console.error("ReplyForge: backend request failed", err);
          const response: GenerateResponseMessage = {
            error: "Could not reach the backend. Is it running?",
          };
          sendResponse(response);
        }
      })();
      return true; // keep the message channel open for the async sendResponse above
    }

    if (message.type === "CREATE_CHECKOUT") {
      (async () => {
        try {
          const res = await authorizedFetch("/billing/create-checkout-session", {});
          const data = await res.json();
          if (!res.ok || !data.url) {
            const response: CreateCheckoutResponseMessage = {
              error: data.error ?? "Could not start checkout",
            };
            sendResponse(response);
            return;
          }
          chrome.tabs.create({ url: data.url });
          const response: CreateCheckoutResponseMessage = { url: data.url };
          sendResponse(response);
        } catch (err) {
          console.error("ReplyForge: checkout request failed", err);
          const response: CreateCheckoutResponseMessage = {
            error: "Could not reach the backend. Is it running?",
          };
          sendResponse(response);
        }
      })();
      return true;
    }

    return false;
  }
);

chrome.commands.onCommand.addListener((command) => {
  if (command !== "toggle-panel") return;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id;
    if (tabId === undefined) return;
    const message: TogglePanelMessage = { type: "TOGGLE_PANEL" };
    chrome.tabs.sendMessage(tabId, message);
  });
});
