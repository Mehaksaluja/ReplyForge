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

export interface CreateCheckoutMessage {
  type: "CREATE_CHECKOUT";
}

export interface CreateCheckoutResponseMessage {
  url?: string;
  error?: string;
}

export interface TogglePanelMessage {
  type: "TOGGLE_PANEL";
}
