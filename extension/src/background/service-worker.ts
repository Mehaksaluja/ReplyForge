import type { GenerateRequestMessage, GenerateResponseMessage } from "../types";

const BACKEND_URL = "http://localhost:3000/generate";

chrome.runtime.onInstalled.addListener(() => {
  console.log("MailPilot installed");
});

// Content scripts run on mail.google.com and are subject to Gmail's page CSP,
// which complicates cross-origin fetches. The background worker has its own
// host_permissions and isn't bound by the page's CSP, so it does the fetch
// and relays the result back to the content script.
chrome.runtime.onMessage.addListener((message: GenerateRequestMessage, _sender, sendResponse) => {
  if (message.type !== "GENERATE_REPLY") return;

  fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ thread: message.thread, instruction: message.instruction }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        const response: GenerateResponseMessage = { error: data.error ?? "Request failed" };
        sendResponse(response);
        return;
      }
      const response: GenerateResponseMessage = { reply: data.reply };
      sendResponse(response);
    })
    .catch((err) => {
      console.error("MailPilot: backend request failed", err);
      const response: GenerateResponseMessage = {
        error: "Could not reach the backend. Is it running?",
      };
      sendResponse(response);
    });

  return true; // keep the message channel open for the async sendResponse above
});
