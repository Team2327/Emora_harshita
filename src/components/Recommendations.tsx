
import { useEffect, useState } from "react";
import type {
  AssessmentResult,
  Recommendation,
} from "../types/emora";
import type { MoodEntry } from "../types/mood";
import { getRecommendations } from "../services/recommendationService";
import { getMoodEntries } from "../services/moodStorage";

interface RecommendationsProps {
  assessment: AssessmentResult | null;
  refreshKey: number;
}

function Recommendations({
  assessment,
  refreshKey,
}: RecommendationsProps) {
  const [recommendations, setRecommendations] =
    useState<Recommendation[]>([]);

  useEffect(() => {
    const moodEntries: MoodEntry[] = getMoodEntries();

    const updatedRecommendations = getRecommendations(
      assessment,
      moodEntries
    );

    setRecommendations(updatedRecommendations);
  }, [assessment, refreshKey]);

  return (
    <section className="recommendations-card">
      <h2>Recommendations for You</h2>
      <p>Small steps and support options for your wellbeing.</p>

      {recommendations.length === 0 ? (
        <p>
          No recommendations are available right now.
          Check in with yourself again soon.
        </p>
      ) : (
        recommendations.map((recommendation) => (
          <article
            className="recommendation-item"
            key={recommendation.id}
          >
            <h3>{recommendation.title}</h3>

            <p>{recommendation.description}</p>

            <p>
              <strong>Why this suggestion?</strong>{" "}
              {recommendation.reason}
            </p>
          </article>
        ))
      )}
    </section>
  );
}

export default Recommendations;
