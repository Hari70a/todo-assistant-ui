export type Chat = {
  question: string;
  answer: string;
};

export type StreamPayload = {
  type: string;
  text?: string;
  chat_id?: string;
};

export const quickPrompts = [
  "Help me prioritize today's tasks",
  // "Break a big task into smaller steps",
  "Create a focused plan for this week",
];
