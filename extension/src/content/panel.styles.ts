export const panelStyles = `
  :host, .mp-fab, .mp-panel {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif;
  }

  .mp-fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: none;
    background: #111111;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease, background 0.15s ease;
  }

  .mp-fab:hover {
    background: #2a2a2a;
    transform: scale(1.06);
  }

  .mp-panel {
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

  .mp-header {
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

  .mp-close {
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

  .mp-close:hover {
    background: #f4f4f5;
    color: #111111;
  }

  .mp-messages {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 160px;
    background: #fafafa;
  }

  .mp-message {
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 13px;
    line-height: 1.45;
    max-width: 85%;
    white-space: pre-wrap;
  }

  .mp-message-assistant {
    background: #ffffff;
    border: 1px solid #e4e4e7;
    color: #111111;
    align-self: flex-start;
  }

  .mp-message-user {
    background: #111111;
    color: #ffffff;
    align-self: flex-end;
  }

  .mp-message-error {
    border-color: #dc2626;
    color: #991b1b;
  }

  .mp-insert {
    margin-top: 8px;
    display: block;
    background: transparent;
    border: 1px solid #111111;
    color: #111111;
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .mp-insert:hover {
    background: #111111;
    color: #ffffff;
  }

  .mp-typing {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px;
  }

  .mp-typing span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #a1a1aa;
    animation: mp-blink 1.2s infinite ease-in-out;
  }

  .mp-typing span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .mp-typing span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes mp-blink {
    0%, 80%, 100% { opacity: 0.3; }
    40% { opacity: 1; }
  }

  .mp-input-row {
    display: flex;
    gap: 8px;
    padding: 10px;
    border-top: 1px solid #e4e4e7;
    background: #ffffff;
  }

  .mp-input {
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

  .mp-input:focus {
    outline: none;
    border-color: #111111;
  }

  .mp-send {
    background: #111111;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 0 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .mp-send:hover:not(:disabled) {
    background: #2a2a2a;
  }

  .mp-send:disabled {
    background: #e4e4e7;
    color: #a1a1aa;
    cursor: default;
  }
`;
