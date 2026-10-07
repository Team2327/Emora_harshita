import type { JournalEntry } from "../types/mood";

export const createJournalEntry = (
  text: string
): JournalEntry => {
  const trimmedText = text.trim();

  if (!trimmedText) {
    throw new Error("Journal entry cannot be empty");
  }

  return {
    id: crypto.randomUUID(),
    text: trimmedText,
    createdAt: new Date().toISOString(),
  };
};