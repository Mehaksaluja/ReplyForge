export interface GenerateRequestMessage {
  type: "GENERATE_REPLY";
  thread: string;
  instruction: string;
}

export interface GenerateResponseMessage {
  reply?: string;
  error?: string;
}
