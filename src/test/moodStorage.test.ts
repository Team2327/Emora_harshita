import { beforeEach, describe, expect, it } from "vitest";
import { JSDOM } from "jsdom";
import {
  getMoodEntries,
  saveMoodEntry,
} from "../services/moodStorage";
import type { MoodEntry } from "../types/mood";

describe("Mood storage", () => {
 let storage: Storage;

    beforeEach(() => {
    const dom = new JSDOM("", {
        url: "http://localhost",
    });

    storage = dom.window.localStorage;
    globalThis.localStorage = storage;
    storage.clear();
    });
  it("returns an empty array when no moods are stored", () => {
    expect(getMoodEntries()).toEqual([]);
  });

  it("saves and retrieves a mood entry", () => {
    const entry: MoodEntry = {
      id: "mood-1",
      mood: "good",
      note: "Feeling good today.",
      createdAt: "2026-10-08T00:00:00.000Z",
    };

    saveMoodEntry(entry);

    expect(getMoodEntries()).toEqual([entry]);
  });

  it("preserves multiple mood entries", () => {
    const firstEntry: MoodEntry = {
      id: "mood-1",
      mood: "good",
      createdAt: "2026-10-08T00:00:00.000Z",
    };

    const secondEntry: MoodEntry = {
      id: "mood-2",
      mood: "neutral",
      createdAt: "2026-10-08T01:00:00.000Z",
    };

    saveMoodEntry(firstEntry);
    saveMoodEntry(secondEntry);

    expect(getMoodEntries()).toEqual([
      firstEntry,
      secondEntry,
    ]);
  });

  it("handles invalid stored data safely", () => {
    localStorage.setItem(
      "emora_mood_entries",
      "invalid json"
    );

    expect(getMoodEntries()).toEqual([]);
  });
});