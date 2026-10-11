
import type { MoodEntry } from "../types/mood";

export interface DailyMoodCount {
  date: string;
  count: number;
}

export const getSevenDayMoodTrend = (
  entries: MoodEntry[],
  today: Date = new Date()
): DailyMoodCount[] => {
  const days: DailyMoodCount[] = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    const date = [
      day.getFullYear(),
      String(day.getMonth() + 1).padStart(2, "0"),
      String(day.getDate()).padStart(2, "0"),
    ].join("-");

    const count = entries.filter((entry) => {
      const entryDate = new Date(entry.createdAt);

      return (
        entryDate.getFullYear() === day.getFullYear() &&
        entryDate.getMonth() === day.getMonth() &&
        entryDate.getDate() === day.getDate()
      );
    }).length;

    days.push({ date, count });
  }

  return days;
};

