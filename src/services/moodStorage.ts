import type { MoodEntry } from "../types/mood";

const MOOD_STORAGE_KEY = "emora_mood_entries";

export const saveMoodEntry = (
  entry: MoodEntry
): void => {
  const existingEntries = getMoodEntries();

  const updatedEntries = [
    ...existingEntries,
    entry,
  ];

  localStorage.setItem(
    MOOD_STORAGE_KEY,
    JSON.stringify(updatedEntries)
  );
};

export const getMoodEntries = (): MoodEntry[] => {
  const storedEntries = localStorage.getItem(
    MOOD_STORAGE_KEY
  );

  if (!storedEntries) {
    return [];
  }

  try {
    return JSON.parse(storedEntries) as MoodEntry[];
  } catch {
    return [];
  }
};