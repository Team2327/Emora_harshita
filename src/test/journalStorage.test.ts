
import { beforeEach, describe, expect, it } from "vitest";
import { JSDOM } from "jsdom";
import {
  getJournalEntries,
  saveJournalEntry,
} from "../services/journalStorage";
import type { JournalEntry } from "../types/mood";

let storage: Storage;

beforeEach(() => {
  const dom = new JSDOM("", {
    url: "http://localhost",
  });

  storage = dom.window.localStorage;
  globalThis.localStorage = storage;
  storage.clear();
});

describe("journalStorage", () => {
  it("returns an empty array when no entries exist", () => {
    expect(getJournalEntries()).toEqual([]);
  });

  it("saves and retrieves a journal entry", () => {
    const entry: JournalEntry = {
      id: "journal-1",
      text: "Today was a good day.",
      createdAt: "2026-10-10T10:00:00.000Z",
    };

    saveJournalEntry(entry);

    expect(getJournalEntries()).toEqual([entry]);
  });

  it("keeps multiple journal entries", () => {
    const firstEntry: JournalEntry = {
      id: "journal-1",
      text: "First entry",
      createdAt: "2026-10-10T10:00:00.000Z",
    };

    const secondEntry: JournalEntry = {
      id: "journal-2",
      text: "Second entry",
      createdAt: "2026-10-10T11:00:00.000Z",
    };

    saveJournalEntry(firstEntry);
    saveJournalEntry(secondEntry);

    expect(getJournalEntries()).toEqual([
      firstEntry,
      secondEntry,
    ]);
  });

  it("returns an empty array if stored data is invalid", () => {
    localStorage.setItem("emora_journal_entries", "{invalid json");

    expect(getJournalEntries()).toEqual([]);
  });
});
