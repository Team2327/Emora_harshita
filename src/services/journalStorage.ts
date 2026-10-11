import type { JournalEntry } from "../types/mood";

const JOURNAL_STORAGE_KEY = "emora_journal_entries";

export const saveJournalEntry = (
  entry: JournalEntry
): void => {
  const existingEntries = getJournalEntries();

  const updatedEntries = [
    ...existingEntries,
    entry,
  ];

  localStorage.setItem(
    JOURNAL_STORAGE_KEY,
    JSON.stringify(updatedEntries)
  );
};

export const getJournalEntries = (): JournalEntry[] => {
  const storedEntries = localStorage.getItem(
    JOURNAL_STORAGE_KEY
  );

  if (!storedEntries) {
    return [];
  }

  try {
    return JSON.parse(storedEntries) as JournalEntry[];
  } catch {
    return [];
  }
};