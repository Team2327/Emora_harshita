
import type { MoodEntry } from "../types/mood";

export type MoodPattern =
  | "mostly_low"
  | "mixed"
  | "mostly_positive"
  | "not_enough_data";

export const getMoodPattern = (
  entries: MoodEntry[],
  today: Date = new Date()
): MoodPattern => {
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setHours(0, 0, 0, 0);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const recentEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.createdAt);

    return (
      !Number.isNaN(entryDate.getTime()) &&
      entryDate >= sevenDaysAgo &&
      entryDate <= today
    );
  });

  if (recentEntries.length < 3) {
    return "not_enough_data";
  }

  const lowCount = recentEntries.filter(
    (entry) =>
      entry.mood === "very_sad" ||
      entry.mood === "sad"
  ).length;

  const positiveCount = recentEntries.filter(
    (entry) =>
      entry.mood === "good" ||
      entry.mood === "very_good"
  ).length;

  if (lowCount > positiveCount && lowCount > 0) {
    return "mostly_low";
  }

  if (positiveCount > lowCount && positiveCount > 0) {
    return "mostly_positive";
  }

  return "mixed";
};
