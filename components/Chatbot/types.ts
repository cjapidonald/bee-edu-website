export interface PageLink {
  path: string;
  text: string;
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  pageLink?: PageLink;
  isLLM?: boolean;
}

export type ChatbotCategory =
  | "pricing"
  | "features"
  | "general"
  | "ai"
  | "support"
  | "security"
  | "roles"
  | "technical"
  | "comparison";
