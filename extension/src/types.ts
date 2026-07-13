export interface HistoryTurn {
  role: "user" | "assistant";
  content: string;
}

export interface GenerateRequestMessage {
  type: "GENERATE_REPLY";
  thread: string;
  instruction: string;
  history: HistoryTurn[];
}

export interface GenerateResponseMessage {
  reply?: string;
  error?: string;
}

export interface OpenUpgradePageMessage {
  type: "OPEN_UPGRADE_PAGE";
}

export interface TogglePanelMessage {
  type: "TOGGLE_PANEL";
}

export interface WarmBackendMessage {
  type: "WARM_BACKEND";
}
