import type {
    ChatbotIntent,
    ChatbotResponse,
    ChatbotState,
} from "../types/chatbot";

interface IntentRule {
  intent: ChatbotIntent;
  keywords: string[];
}

const intentRules: IntentRule[] = [
  {
    intent: "crisis",
    keywords: [
      "kill myself",
      "suicide",
      "suicidal",
      "want to die",
      "hurt myself",
      "self harm",
      "self-harm",
      "end my life",
    ],
  },
  {
    intent: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
  },
  {
    intent: "anxiety",
    keywords: [
      "anxious",
      "anxiety",
      "worried",
      "worry",
      "panic",
      "nervous",
      "overthinking",
    ],
  },
  {
    intent: "stress",
    keywords: [
      "stress",
      "stressed",
      "pressure",
      "overwhelmed",
      "burnout",
    ],
  },
  {
    intent: "sleep",
    keywords: [
      "sleep",
      "sleeping",
      "insomnia",
      "tired",
      "can't sleep",
      "cannot sleep",
    ],
  },
  {
    intent: "sadness",
    keywords: [
      "sad",
      "sadness",
      "lonely",
      "loneliness",
      "unhappy",
      "down",
    ],
  },
  {
    intent: "motivation",
    keywords: [
      "motivation",
      "motivated",
      "unmotivated",
      "productive",
      "procrastinating",
    ],
  },
  {
    intent: "assessment",
    keywords: [
      "assessment",
      "test",
      "phq",
      "gad",
      "questionnaire",
      "check in",
    ],
  },
];

const responses: Record<ChatbotIntent, string> = {
  greeting:
    "Hi! I'm here to help you with your mental wellness check-in. How are you feeling today?",

  anxiety:
    "It sounds like anxiety may be weighing on you. Try taking a few slow breaths and focusing on what is happening right now, one moment at a time.",

  stress:
    "When things feel overwhelming, it can help to pause and break the situation into smaller, manageable steps. Give yourself a moment to reset.",

  sleep:
    "A consistent wind-down routine can help with sleep. Try reducing screen time before bed and keeping your sleep and wake times as regular as possible.",

  sadness:
    "I'm sorry you're having a difficult moment. Consider reaching out to someone you trust and giving yourself some space to rest and process what you're feeling.",

  motivation:
    "When motivation is low, start with something very small. One simple task can be enough to create a little momentum.",

  assessment:
    "EMORA currently offers PHQ-9 and GAD-7 wellness assessments. They can help you reflect on symptoms, but they are not a diagnosis.",

  crisis:
    "If you feel that you may hurt yourself or someone else, please seek immediate help from local emergency services or a trusted person who can stay with you.",

  fallback:
    "I'm here to listen. You can tell me a little more about what you're experiencing, and I'll try to point you toward something helpful.",
};

const normalizeMessage = (message: string): string => {
  return message.toLowerCase().trim();
};

const detectIntent = (message: string): ChatbotIntent => {
  const normalizedMessage = normalizeMessage(message);

  for (const rule of intentRules) {
    const matched = rule.keywords.some((keyword) => {
  if (keyword.includes(" ")) {
    return normalizedMessage.includes(keyword);
  }

  const words = normalizedMessage.split(/\s+/);
  return words.includes(keyword);
});

    if (matched) {
      return rule.intent;
    }
  }

  return "fallback";
};

export const getChatbotResponse = (
  message: string
): ChatbotResponse => {
  const intent = detectIntent(message);

  return {
  intent,
  text: responses[intent],
  shouldEscalate: intent === "crisis",
  safetyActions:
    intent === "crisis"
      ? [
          "contact_trusted_person",
          "contact_emergency_services",
          "seek_professional_help",
        ]
      : undefined,
    };
};

export const createInitialChatbotState = (): ChatbotState => {
  return {
    messages: [],
    lastIntent: null,
    isEscalated: false,
  };
};

export const processChatbotMessage = (
  state: ChatbotState,
  message: string
): { response: ChatbotResponse; state: ChatbotState } => {
  const response = getChatbotResponse(message);

  const userMessage = {
    role: "user" as const,
    text: message,
    timestamp: new Date().toISOString(),
  };

  const assistantMessage = {
    role: "assistant" as const,
    text: response.text,
    timestamp: new Date().toISOString(),
  };

  const updatedState: ChatbotState = {
    messages: [
      ...state.messages,
      userMessage,
      assistantMessage,
    ],
    lastIntent: response.intent,
    isEscalated: state.isEscalated || response.shouldEscalate,
  };

  return {
    response,
    state: updatedState,
  };
};