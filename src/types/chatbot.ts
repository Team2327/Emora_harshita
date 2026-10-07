export type ChatbotIntent =
  | "greeting"
  | "anxiety"
  | "stress"
  | "sleep"
  | "sadness"
  | "motivation"
  | "assessment"
  | "crisis"
  | "fallback";

export interface ChatbotMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface ChatbotResponse {
  intent: ChatbotIntent;
  text: string;
  shouldEscalate: boolean;
  safetyActions?: SafetyAction[];
}

export interface ChatbotState {
  messages: ChatbotMessage[];
  lastIntent: ChatbotIntent | null;
  isEscalated: boolean;
}

export type SafetyAction =
  | "contact_trusted_person"
  | "contact_emergency_services"
  | "seek_professional_help";