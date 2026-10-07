import { describe, expect, it } from "vitest";
import {
  createMoodEntry,
  getMoodLabel,
} from "../services/moodService";

describe("Mood service", () => {
  it("creates a mood entry", () => {
    const entry = createMoodEntry("good");

    expect(entry.mood).toBe("good");
    expect(entry.id).toBeTruthy();
    expect(entry.createdAt).toBeTruthy();
  });

  it("creates a mood entry with a note", () => {
    const entry = createMoodEntry(
      "sad",
      "I had a difficult day."
    );

    expect(entry.mood).toBe("sad");
    expect(entry.note).toBe("I had a difficult day.");
  });

  it("trims whitespace from notes", () => {
    const entry = createMoodEntry(
      "neutral",
      "   Feeling okay today.   "
    );

    expect(entry.note).toBe("Feeling okay today.");
  });

  it("removes an empty note", () => {
    const entry = createMoodEntry(
      "very_good",
      "   "
    );

    expect(entry.note).toBeUndefined();
  });

  it("returns the correct mood label", () => {
    expect(getMoodLabel("very_sad")).toBe("Very Sad");
    expect(getMoodLabel("sad")).toBe("Sad");
    expect(getMoodLabel("neutral")).toBe("Neutral");
    expect(getMoodLabel("good")).toBe("Good");
    expect(getMoodLabel("very_good")).toBe("Very Good");
  });
});