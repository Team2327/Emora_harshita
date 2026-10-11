
import { describe, it, expect } from "vitest";
import { getMoodPattern } from "../services/moodPatternService";
import type { MoodEntry, MoodLevel } from "../types/mood";

const createEntries = (
  moods: MoodLevel[],
  today: Date
): MoodEntry[] =>
  moods.map((mood, index) => ({
    id: `mood-${index}`,
    mood,
    createdAt: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12
    ).toISOString(),
  }));

describe("getMoodPattern", () => {
  const today = new Date(2026, 9, 12, 12);

  it("requires at least three entries", () => {
    expect(
      getMoodPattern(
        createEntries(["sad", "very_sad"], today),
        today
      )
    ).toBe("not_enough_data");
  });

  it("identifies mostly low moods", () => {
    expect(
      getMoodPattern(
        createEntries(
          ["sad", "very_sad", "sad", "neutral"],
          today
        ),
        today
      )
    ).toBe("mostly_low");
  });

  it("identifies mostly positive moods", () => {
    expect(
      getMoodPattern(
        createEntries(
          ["good", "very_good", "good", "neutral"],
          today
        ),
        today
      )
    ).toBe("mostly_positive");
  });

  it("identifies a mixed pattern", () => {
    expect(
      getMoodPattern(
        createEntries(
          ["sad", "good", "neutral"],
          today
        ),
        today
      )
    ).toBe("mixed");
  });
});
