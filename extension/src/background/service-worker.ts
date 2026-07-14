import type {
  GenerateRequestMessage,
  GenerateResponseMessage,
  GetProStatusMessage,
  OpenLandingPageMessage,
  OpenUpgradePageMessage,
  ProStatusResponseMessage,
  TogglePanelMessage,
  WarmBackendMessage,
} from "../types";

const BACKEND_BASE = import.meta.env.DEV ? "http://localhost:3000" : "https://ai-email-extension.onrender.com";
const LANDING_PAGE_BASE = import.meta.env.DEV ? "http://localhost:5173" : "https://replyforge.mehakworks.com";

chrome.runtime.onInstalled.addListener(() => {
  console.log("ReplyForge installed");
});

// Throttle so a user with several Gmail tabs open, or who reloads often,
// doesn't fire a fresh /health ping every single time - one ping per window
// is plenty to keep Render from spinning the backend down.
const WARM_PING_INTERVAL_MS = 10 * 60 * 1000;

async function warmBackendIfStale(): Promise<void> {
  const { lastWarmPing } = await chrome.storage.session.get("lastWarmPing");
  const now = Date.now();
  if (typeof lastWarmPing === "number" && now - lastWarmPing < WARM_PING_INTERVAL_MS) {
    return;
  }
  await chrome.storage.session.set({ lastWarmPing: now });
  fetch(`${BACKEND_BASE}/health`).catch(() => {
    // Nothing to do with a failed warm-up ping - the real request will
    // surface its own error if the backend is still unreachable.
  });
}

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

// Creates the checkout session using the same account the extension is
// already authorized as, so the account that pays is always the account
// that gets checked for Pro status - no separate sign-in on the landing
// page that could pick a different Google account.
async function getCheckoutUrl(): Promise<string> {
  const res = await authorizedFetch("/billing/create-checkout-session", {});
  if (!res.ok) {
    throw new Error("Failed to create checkout session");
  }
  const data = await res.json();
  if (!data.url) {
    throw new Error("Checkout session missing url");
  }
  return data.url as string;
}

chrome.runtime.onMessage.addListener(
  (
    message:
      | GenerateRequestMessage
      | OpenUpgradePageMessage
      | OpenLandingPageMessage
      | WarmBackendMessage
      | GetProStatusMessage,
    _sender,
    sendResponse
  ) => {
    if (message.type === "WARM_BACKEND") {
      warmBackendIfStale();
      return false;
    }

    if (message.type === "GET_PRO_STATUS") {
      (async () => {
        try {
          // Non-interactive: this just refreshes a badge, so it should never
          // pop a sign-in prompt - if there's no cached token yet, treat the
          // user as not-Pro rather than force a login they didn't ask for.
          const token = await getAuthToken(false);
          const res = await fetch(`${BACKEND_BASE}/billing/status`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) {
            sendResponse({ isPro: false } satisfies ProStatusResponseMessage);
            return;
          }
          const data = await res.json();
          sendResponse({ isPro: data.subscriptionStatus === "active" } satisfies ProStatusResponseMessage);
        } catch {
          sendResponse({ isPro: false } satisfies ProStatusResponseMessage);
        }
      })();
      return true;
    }

    if (message.type === "GENERATE_REPLY") {
      (async () => {
        try {
          const res = await authorizedFetch("/generate", {
            thread: message.thread,
            instruction: message.instruction,
            history: message.history,
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

    if (message.type === "OPEN_UPGRADE_PAGE") {
      (async () => {
        try {
          const url = await getCheckoutUrl();
          chrome.tabs.create({ url });
        } catch (err) {
          console.error("ReplyForge: checkout session failed, falling back to landing page", err);
          chrome.tabs.create({ url: `${LANDING_PAGE_BASE}/upgrade` });
        }
      })();
      return false;
    }

    if (message.type === "OPEN_LANDING_PAGE") {
      chrome.tabs.create({ url: LANDING_PAGE_BASE });
      return false;
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
