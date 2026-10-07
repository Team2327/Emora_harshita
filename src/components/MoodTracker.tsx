import { useState } from "react";
import type { MoodLevel } from "../types/mood";
import {
  createMoodEntry,
  getMoodLabel,
} from "../services/moodService";

function MoodTracker() {
  const [selectedMood, setSelectedMood] =
    useState<MoodLevel | null>(null);

  const [note, setNote] = useState("");

  const [saved, setSaved] = useState(false);

  const moods: MoodLevel[] = [
    "very_sad",
    "sad",
    "neutral",
    "good",
    "very_good",
  ];

  const handleSave = () => {
    if (!selectedMood) return;

    const entry = createMoodEntry(
      selectedMood,
      note
    );

    console.log("Mood entry:", entry);

    setSaved(true);
    setNote("");
  };

  return (
    <section className="mood-card">
      <div className="mood-header">
        <h2>How are you feeling today?</h2>

        <p>
          Take a moment to check in with yourself.
        </p>
      </div>

      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            className={`mood-option ${
              selectedMood === mood ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedMood(mood);
              setSaved(false);
            }}
          >
            {getMoodLabel(mood)}
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(event) => {
          setNote(event.target.value);
          setSaved(false);
        }}
        placeholder="Want to write a little about how you're feeling?"
        rows={4}
      />

      <button
        type="button"
        onClick={handleSave}
        disabled={!selectedMood}
      >
        Save Mood
      </button>

      {saved && (
        <p className="mood-success">
          Your mood has been recorded. 💚
        </p>
      )}
    </section>
  );
}

export default MoodTracker;