import { createRoot } from "react-dom/client";
import { Panel } from "./Panel";
import { panelStyles } from "./panel.styles";
import { extractThreadText, insertReplyIntoCompose, isGmailDarkTheme } from "./gmail-dom";
import type { WarmBackendMessage } from "../types";

function mountPanel() {
  if (document.getElementById("replyforge-root")) return;

  const host = document.createElement("div");
  host.id = "replyforge-root";
  document.body.appendChild(host);

  // Match the panel's theme to Gmail's own theme setting, not the OS/browser
  // dark mode preference — those can disagree, and the panel should always
  // look at home next to whatever Gmail is actually showing.
  const applyTheme = () => {
    host.setAttribute("data-theme", isGmailDarkTheme() ? "dark" : "light");
  };
  applyTheme();
  new MutationObserver(applyTheme).observe(document.body, {
    attributes: true,
    attributeFilter: ["style", "class"],
  });

  // Shadow DOM keeps Gmail's global CSS out of our panel, and our CSS out of
  // Gmail — the same isolation problem the old inline-positioned button ran
  // into, solved properly this time.
  const shadowRoot = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = panelStyles;
  shadowRoot.appendChild(style);

  const appContainer = document.createElement("div");
  shadowRoot.appendChild(appContainer);

  createRoot(appContainer).render(
    <Panel getThreadContext={extractThreadText} onInsert={insertReplyIntoCompose} />
  );
}

mountPanel();

// Fire-and-forget so Render's cold start (backend spins down after inactivity
// on the free tier) happens while the user is reading, not when they hit
// Generate. No response is expected or handled.
const warmMessage: WarmBackendMessage = { type: "WARM_BACKEND" };
chrome.runtime.sendMessage(warmMessage);
