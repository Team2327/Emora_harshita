
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
}

function Recommendations({ assessment }: RecommendationsProps) {
  const [recommendations, setRecommendations] =
    useState<Recommendation[]>([]);

  useEffect(() => {
    const moodEntries: MoodEntry[] = getMoodEntries();

    setRecommendations(
      getRecommendations(assessment, moodEntries)
    );
  }, [assessment]);

  return (
    <section className="recommendations-card">
      <h2>Recommendations for You</h2>
      <p>Small steps and support options for your wellbeing.</p>

      {recommendations.map((recommendation) => (
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
      ))}
    </section>
  );
}

export default Recommendations;
