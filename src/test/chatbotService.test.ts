import { describe, expect, it } from "vitest";
import {
  createInitialChatbotState,
  getChatbotResponse,
  processChatbotMessage,
 } from "../services/chatbotService";

describe("Chatbot service", () => {
  it("detects a greeting", () => {
    const response = getChatbotResponse("Hello");

    expect(response.intent).toBe("greeting");
    expect(response.shouldEscalate).toBe(false);
    expect(response.text).toBeTruthy();
  });

  it("detects anxiety-related messages", () => {
    const response = getChatbotResponse(
      "I feel really anxious and worried"
    );

    expect(response.intent).toBe("anxiety");
    expect(response.shouldEscalate).toBe(false);
  });

  it("detects stress-related messages", () => {
    const response = getChatbotResponse(
      "I am feeling very stressed and overwhelmed"
    );

    expect(response.intent).toBe("stress");
    expect(response.shouldEscalate).toBe(false);
  });

  it("detects sleep-related messages", () => {
    const response = getChatbotResponse(
      "I cannot sleep properly"
    );

    expect(response.intent).toBe("sleep");
    expect(response.shouldEscalate).toBe(false);
  });

  it("detects sadness-related messages", () => {
    const response = getChatbotResponse(
      "I feel lonely and sad"
    );

    expect(response.intent).toBe("sadness");
    expect(response.shouldEscalate).toBe(false);
  });

  it("detects motivation-related messages", () => {
    const response = getChatbotResponse(
      "I have no motivation and keep procrastinating"
    );

    expect(response.intent).toBe("motivation");
    expect(response.shouldEscalate).toBe(false);
  });

  it("detects assessment-related messages", () => {
    const response = getChatbotResponse(
      "Can I take the PHQ assessment?"
    );

    expect(response.intent).toBe("assessment");
    expect(response.shouldEscalate).toBe(false);
  });

  it("uses fallback for unknown messages", () => {
    const response = getChatbotResponse(
      "Tell me something random"
    );

    expect(response.intent).toBe("fallback");
    expect(response.shouldEscalate).toBe(false);
    expect(response.text).toBeTruthy();
  });

 it("flags crisis messages and provides safety actions", () => {
  const response = getChatbotResponse(
    "I want to hurt myself"
  );

  expect(response.intent).toBe("crisis");
  expect(response.shouldEscalate).toBe(true);

  expect(response.safetyActions).toEqual([
    "contact_trusted_person",
    "contact_emergency_services",
    "seek_professional_help",
  ]);
  });
});

it("maintains conversation state", () => {
  const initialState = createInitialChatbotState();

  const result = processChatbotMessage(
    initialState,
    "I am feeling stressed"
  );

  expect(result.response.intent).toBe("stress");
  expect(result.state.lastIntent).toBe("stress");
  expect(result.state.messages).toHaveLength(2);
  expect(result.state.isEscalated).toBe(false);
});

it("keeps escalation active after a crisis message", () => {
  const initialState = createInitialChatbotState();

  const result = processChatbotMessage(
    initialState,
    "I want to hurt myself"
  );

  expect(result.response.intent).toBe("crisis");
  expect(result.state.isEscalated).toBe(true);
  expect(result.state.messages).toHaveLength(2);
});