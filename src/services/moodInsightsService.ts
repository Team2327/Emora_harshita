
import type { MoodEntry, MoodLevel } from "../types/mood";

export interface MoodInsights {
  totalEntries: number;
  moodCounts: Record<MoodLevel, number>;
}

export const getMoodInsights = (
  entries: MoodEntry[]
): MoodInsights => {
  const moodCounts: Record<MoodLevel, number> = {
    very_sad: 0,
    sad: 0,
    neutral: 0,
    good: 0,
    very_good: 0,
  };

  for (const entry of entries) {
    moodCounts[entry.mood] += 1;
  }

  return {
    totalEntries: entries.length,
    moodCounts,
  };
};
