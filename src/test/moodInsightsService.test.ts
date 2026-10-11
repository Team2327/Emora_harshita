
import { describe, expect, it } from "vitest";
import {
  getMoodInsights,
} from "../services/moodInsightsService";
import type { MoodEntry } from "../types/mood";

describe("moodInsightsService", () => {
  it("returns zero counts when there are no entries", () => {
    expect(getMoodInsights([])).toEqual({
      totalEntries: 0,
      moodCounts: {
        very_sad: 0,
        sad: 0,
        neutral: 0,
        good: 0,
        very_good: 0,
      },
    });
  });

  it("counts each mood correctly", () => {
    const entries: MoodEntry[] = [
      {
        id: "1",
        mood: "good",
        createdAt: "2026-10-08T10:00:00.000Z",
      },
      {
        id: "2",
        mood: "sad",
        createdAt: "2026-10-09T10:00:00.000Z",
      },
      {
        id: "3",
        mood: "good",
        createdAt: "2026-10-10T10:00:00.000Z",
      },
    ];

    expect(getMoodInsights(entries)).toEqual({
      totalEntries: 3,
      moodCounts: {
        very_sad: 0,
        sad: 1,
        neutral: 0,
        good: 2,
        very_good: 0,
      },
    });
  });

  it("does not modify the original entries", () => {
    const entries: MoodEntry[] = [
      {
        id: "1",
        mood: "neutral",
        createdAt: "2026-10-10T10:00:00.000Z",
      },
    ];

    const originalEntries = [...entries];

    getMoodInsights(entries);

    expect(entries).toEqual(originalEntries);
  });
});
