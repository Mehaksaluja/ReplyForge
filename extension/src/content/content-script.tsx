import { createRoot } from "react-dom/client";
import { Panel } from "./Panel";
import { panelStyles } from "./panel.styles";
import { extractThreadText, insertReplyIntoCompose } from "./gmail-dom";

function mountPanel() {
  if (document.getElementById("mailpilot-root")) return;

  const host = document.createElement("div");
  host.id = "mailpilot-root";
  document.body.appendChild(host);

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
