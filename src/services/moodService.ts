import type { MoodEntry, MoodLevel } from "../types/mood";

export const createMoodEntry = (
  mood: MoodLevel,
  note?: string
): MoodEntry => {
  return {
    id: crypto.randomUUID(),
    mood,
    note: note?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
};

export const getMoodLabel = (
  mood: MoodLevel
): string => {
  const labels: Record<MoodLevel, string> = {
    very_sad: "Very Sad",
    sad: "Sad",
    neutral: "Neutral",
    good: "Good",
    very_good: "Very Good",
  };

  return labels[mood];
};