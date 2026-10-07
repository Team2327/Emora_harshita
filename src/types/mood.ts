export type MoodLevel =
  | "very_sad"
  | "sad"
  | "neutral"
  | "good"
  | "very_good";

export interface MoodEntry {
  id: string;
  mood: MoodLevel;
  note?: string;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  text: string;
  createdAt: string;
}