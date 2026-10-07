import { describe, expect, it } from "vitest";
import { createJournalEntry } from "../services/journalService";

describe("Journal service", () => {
  it("creates a journal entry", () => {
    const entry = createJournalEntry(
      "Today was a productive day."
    );

    expect(entry.id).toBeTruthy();
    expect(entry.text).toBe("Today was a productive day.");
    expect(entry.createdAt).toBeTruthy();
  });

  it("trims whitespace from journal entries", () => {
    const entry = createJournalEntry(
      "   I feel better today.   "
    );

    expect(entry.text).toBe("I feel better today.");
  });

  it("rejects an empty journal entry", () => {
    expect(() => createJournalEntry("")).toThrow(
      "Journal entry cannot be empty"
    );
  });

  it("rejects a whitespace-only journal entry", () => {
    expect(() => createJournalEntry("   ")).toThrow(
      "Journal entry cannot be empty"
    );
  });
});