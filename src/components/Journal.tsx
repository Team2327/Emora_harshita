
import { useState } from "react";
import { createJournalEntry } from "../services/journalService";
import { saveJournalEntry } from "../services/journalStorage";

interface JournalProps {
  onEntrySaved: () => void;
}

function Journal({ onEntrySaved }: JournalProps) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = () => {
    try {
      const entry = createJournalEntry(text);

        saveJournalEntry(entry);
        onEntrySaved();
        
        setText("");
      setSaved(true);
      setError("");
    } catch {
      setSaved(false);
      setError("Write something before saving your entry.");
    }
  };

  return (
    <section className="journal-card">
      <h2>Your Journal</h2>
      <p>
        A private space to pause, reflect, and put your thoughts into words.
      </p>

      <textarea
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setSaved(false);
          setError("");
        }}
        placeholder="What's on your mind today?"
        rows={6}
      />

      {error && <p role="alert">{error}</p>}

      {saved && (
        <p role="status">
          Your entry is ready. 💚
        </p>
      )}

      <button type="button" onClick={handleSave}>
        Save Entry
      </button>
    </section>
  );
}

export default Journal;
