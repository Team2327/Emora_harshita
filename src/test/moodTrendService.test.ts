
import { describe, it, expect } from "vitest";
import { getSevenDayMoodTrend } from "../services/moodTrendService";
import type { MoodEntry } from "../types/mood";

describe("getSevenDayMoodTrend", () => {
  const today = new Date(2026, 9, 10, 12);

  it("returns exactly seven days", () => {
    const result = getSevenDayMoodTrend([], today);

    expect(result).toHaveLength(7);
  });

  it("returns dates from oldest to newest", () => {
    const result = getSevenDayMoodTrend([], today);

    expect(result[0].date).toBe("2026-10-04");
    expect(result[6].date).toBe("2026-10-10");
  });

  it("counts mood entries on the correct days", () => {
    const entries: MoodEntry[] = [
      {
        id: "1",
        mood: "good",
        createdAt: new Date(2026, 9, 10, 9).toISOString(),
      },
      {
        id: "2",
        mood: "sad",
        createdAt: new Date(2026, 9, 10, 15).toISOString(),
      },
      {
        id: "3",
        mood: "neutral",
        createdAt: new Date(2026, 9, 8, 11).toISOString(),
      },
    ];

    const result = getSevenDayMoodTrend(entries, today);

    expect(result.find((day) => day.date === "2026-10-10")?.count).toBe(2);
    expect(result.find((day) => day.date === "2026-10-08")?.count).toBe(1);
    expect(result.find((day) => day.date === "2026-10-09")?.count).toBe(0);
  });

  it("does not modify the original entries", () => {
    const entries: MoodEntry[] = [
      {
        id: "1",
        mood: "very_good",
        createdAt: new Date(2026, 9, 10, 9).toISOString(),
      },
    ];

    const original = [...entries];

    getSevenDayMoodTrend(entries, today);

    expect(entries).toEqual(original);
  });
});
