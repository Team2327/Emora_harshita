
import { useEffect, useState } from "react";
import type { JournalEntry } from "../types/mood";
import { getJournalEntries } from "../services/journalStorage";

function JournalHistory() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setEntries(getJournalEntries().reverse());
  }, []);

  return (
    <section className="journal-history-card">
      <h2>Previous Entries</h2>

      {entries.length === 0 ? (
        <p className="journal-history-empty">
          Your journal is waiting for its first entry. Take your time. 💚
        </p>
      ) : (
        <div className="journal-history-list">
          {entries.map((entry) => (
            <article key={entry.id} className="journal-history-entry">
              <p className="journal-history-date">
                {new Date(entry.createdAt).toLocaleString()}
              </p>

              <p className="journal-history-text">{entry.text}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default JournalHistory;
