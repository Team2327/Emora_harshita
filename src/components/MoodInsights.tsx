
import { useEffect, useState } from "react";
import type { MoodInsights as MoodInsightsData } from "../services/moodInsightsService";
import { getMoodInsights } from "../services/moodInsightsService";
import { getMoodEntries } from "../services/moodStorage";
import { getMoodLabel } from "../services/moodService";
import type { MoodLevel } from "../types/mood";

const moodLevels: MoodLevel[] = [
  "very_sad",
  "sad",
  "neutral",
  "good",
  "very_good",
];

interface MoodInsightsProps {
  refreshKey: number;
}

function MoodInsights({ refreshKey }: MoodInsightsProps) {
  const [insights, setInsights] = useState<MoodInsightsData>({
    totalEntries: 0,
    moodCounts: {
      very_sad: 0,
      sad: 0,
      neutral: 0,
      good: 0,
      very_good: 0,
    },
  });

  useEffect(() => {
    setInsights(getMoodInsights(getMoodEntries()));
  }, [refreshKey]);

  return (
    <section className="mood-insights-card">
      <h2>Your Mood Insights</h2>
      <p>Notice your patterns, one check-in at a time.</p>

      <div className="mood-insights-total">
        <strong>{insights.totalEntries}</strong>
        <span>mood check-ins recorded</span>
      </div>

      {insights.totalEntries === 0 ? (
        <p>
          Your insights will appear here after you record your first mood.
        </p>
      ) : (
        <div className="mood-insights-list">
          {moodLevels.map((mood) => (
            <div className="mood-insights-row" key={mood}>
              <span>{getMoodLabel(mood)}</span>
              <strong>{insights.moodCounts[mood]}</strong>
            </div>
          ))}
        </div>
      )}

      <p className="mood-insights-note">
        These counts describe your recorded check-ins. They are not a
        diagnosis or a measure of your overall mental health.
      </p>
    </section>
  );
}

export default MoodInsights;
