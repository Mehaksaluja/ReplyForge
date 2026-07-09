export const panelStyles = `
  :host, .rf-fab, .rf-panel {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif;
  }

  .rf-fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: none;
    background: #ea580c;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease, background 0.15s ease;
  }

  .rf-fab:hover {
    background: #c2410c;
    transform: scale(1.06);
  }

  .rf-panel {
    position: fixed;
    bottom: 88px;
    right: 24px;
    width: 340px;
    max-height: 480px;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 999999;
  }

  .rf-header {
    background: #ffffff;
    color: #111111;
    padding: 14px 16px;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.01em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e4e7;
  }

  .rf-close {
    background: transparent;
    border: none;
    color: #71717a;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  .rf-close:hover {
    background: #f4f4f5;
    color: #111111;
  }

  .rf-messages {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 160px;
    background: #fafafa;
  }

  .rf-message {
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 13px;
    line-height: 1.45;
    max-width: 85%;
    white-space: pre-wrap;
  }

  .rf-message-assistant {
    background: #ffffff;
    border: 1px solid #e4e4e7;
    color: #111111;
    align-self: flex-start;
  }

  .rf-message-user {
    background: #ea580c;
    color: #ffffff;
    align-self: flex-end;
  }

  .rf-message-error {
    border-color: #dc2626;
    color: #991b1b;
  }

  .rf-insert {
    margin-top: 8px;
    display: block;
    background: transparent;
    border: 1px solid #ea580c;
    color: #ea580c;
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .rf-insert:hover {
    background: #ea580c;
    color: #ffffff;
  }

  .rf-typing {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px;
  }

  .rf-typing span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #a1a1aa;
    animation: rf-blink 1.2s infinite ease-in-out;
  }

  .rf-typing span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .rf-typing span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes rf-blink {
    0%, 80%, 100% { opacity: 0.3; }
    40% { opacity: 1; }
  }

  .rf-input-row {
    display: flex;
    gap: 8px;
    padding: 10px;
    border-top: 1px solid #e4e4e7;
    background: #ffffff;
  }

  .rf-input {
    flex: 1;
    resize: none;
    border: 1px solid #e4e4e7;
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 13px;
    font-family: inherit;
    height: 38px;
    color: #111111;
  }

  .rf-input:focus {
    outline: none;
    border-color: #ea580c;
  }

  .rf-send {
    background: #ea580c;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 0 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .rf-send:hover:not(:disabled) {
    background: #c2410c;
  }

  .rf-send:disabled {
    background: #e4e4e7;
    color: #a1a1aa;
    cursor: default;
  }

  :host([data-theme="dark"]) .rf-panel {
    background: #18181b;
    border-color: #27272a;
  }

  :host([data-theme="dark"]) .rf-header {
    background: #18181b;
    color: #f5f5f5;
    border-bottom-color: #27272a;
  }

  :host([data-theme="dark"]) .rf-close {
    color: #a1a1aa;
  }

  :host([data-theme="dark"]) .rf-close:hover {
    background: #27272a;
    color: #f5f5f5;
  }

  :host([data-theme="dark"]) .rf-messages {
    background: #101012;
  }

  :host([data-theme="dark"]) .rf-message-assistant {
    background: #18181b;
    border-color: #27272a;
    color: #f5f5f5;
  }

  :host([data-theme="dark"]) .rf-message-error {
    border-color: #f87171;
    color: #fca5a5;
  }

  :host([data-theme="dark"]) .rf-input-row {
    background: #18181b;
    border-top-color: #27272a;
  }

  :host([data-theme="dark"]) .rf-input {
    background: #101012;
    border-color: #27272a;
    color: #f5f5f5;
  }

  :host([data-theme="dark"]) .rf-send:disabled {
    background: #27272a;
    color: #52525b;
  }
`;
