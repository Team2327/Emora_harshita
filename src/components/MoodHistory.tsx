import { useEffect, useState } from "react";
import type { MoodEntry } from "../types/mood";
import {
  getMoodEntries,
} from "../services/moodStorage";
import { getMoodLabel } from "../services/moodService";

function MoodHistory() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const storedEntries = getMoodEntries();

    setEntries(
      [...storedEntries].reverse()
    );
  }, []);

  return (
    <section className="mood-history-card">
      <div className="mood-header">
        <h2>Your Mood History</h2>
        <p>Look back at your recent check-ins.</p>
      </div>

      {entries.length === 0 ? (
        <div className="mood-history-empty">
          <p>No mood entries yet.</p>
          <p>Your check-ins will appear here.</p>
        </div>
      ) : (
        <div className="mood-history-list">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="mood-history-entry"
            >
              <div className="mood-history-top">
                <strong>
                  {getMoodLabel(entry.mood)}
                </strong>

                <span>
                  {new Date(
                    entry.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              {entry.note && (
                <p>{entry.note}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MoodHistory;