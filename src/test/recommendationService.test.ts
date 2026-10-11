
import { describe, it, expect } from "vitest";
import { getRecommendations } from "../services/recommendationService";
import type { AssessmentResult } from "../types/emora";
import type { MoodEntry } from "../types/mood";

const createAssessment = (
  severity: string
): AssessmentResult => ({
  type: "PHQ9",
  score: 0,
  maxScore: 27,
  severity,
  answers: [],
  completedAt: new Date().toISOString(),
});

const createMoodEntries = (count: number): MoodEntry[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `mood-${index}`,
    mood: "neutral",
    createdAt: new Date().toISOString(),
  }));

describe("getRecommendations", () => {
  it("offers a check-in when no assessment exists", () => {
    const result = getRecommendations(null, []);

    expect(result.some((item) => item.id === "daily-check-in"))
      .toBe(true);
  });

  it("offers self-care for minimal severity", () => {
    const result = getRecommendations(
      createAssessment("Minimal"),
      []
    );

    expect(result.some((item) => item.id === "self-care-routine"))
      .toBe(true);
  });

  
  it("offers personalized self-care suggestions for mild severity", () => {
    const result = getRecommendations(
      createAssessment("Mild"),
      []
    );

    expect(
      result.some((item) => item.id === "mild-support")
    ).toBe(true);
  });

  it("offers personalized self-care suggestions for moderate severity", () => {
    const result = getRecommendations(
      createAssessment("Moderate"),
      []
    );

    expect(
      result.some((item) => item.id === "moderate-support")
    ).toBe(true);
  });


  it.each(["Severe", "Moderately severe"])(
    "suggests professional support for %s severity",
    (severity) => {
      const result = getRecommendations(
        createAssessment(severity),
        []
      );

      expect(
        result.some((item) => item.id === "professional-support")
      ).toBe(true);
    }
  );

  it("offers mood reflection after three check-ins", () => {
    const result = getRecommendations(
      createAssessment("Minimal"),
      createMoodEntries(3)
    );

    expect(result.some((item) => item.id === "mood-reflection"))
      .toBe(true);
  });

  it("does not offer mood reflection with fewer than three check-ins", () => {
    const result = getRecommendations(
      createAssessment("Minimal"),
      createMoodEntries(2)
    );

    expect(result.some((item) => item.id === "mood-reflection"))
      .toBe(false);
  });

    it("offers safety support for a non-zero PHQ-9 question 9 response", () => {
    const assessment: AssessmentResult = {
        ...createAssessment("Minimal"),
        score: 1,
        answers: [{ questionId: 9, value: 1 }],
    };

    const result = getRecommendations(assessment, []);

    expect(
        result.some((item) => item.id === "self-harm-support")
    ).toBe(true);
    });

    it("does not trigger the safety rule for a zero response", () => {
    const assessment: AssessmentResult = {
        ...createAssessment("Minimal"),
        answers: [{ questionId: 9, value: 0 }],
    };

    const result = getRecommendations(assessment, []);

    expect(
        result.some((item) => item.id === "self-harm-support")
    ).toBe(false);
    });

    it("does not apply the PHQ-9 safety rule to GAD-7 answers", () => {
    const assessment: AssessmentResult = {
        ...createAssessment("Minimal"),
        type: "GAD7",
        answers: [{ questionId: 9, value: 1 }],
    };

    const result = getRecommendations(assessment, []);

    expect(
        result.some((item) => item.id === "self-harm-support")
    ).toBe(false);
    });

    
  it.each([
    {
      moods: ["sad", "very_sad", "sad"],
      expectedTitle: "Give yourself some extra support",
    },
    {
      moods: ["good", "very_good", "good"],
      expectedTitle: "Notice what's helping you",
    },
    {
      moods: ["sad", "good", "neutral"],
      expectedTitle: "Get curious about your mood",
    },
  ])(
    "personalizes reflection for recent mood patterns",
    ({ moods, expectedTitle }) => {
      const entries: MoodEntry[] = moods.map((mood, index) => ({
        id: `pattern-${index}`,
        mood: mood as MoodEntry["mood"],
        createdAt: new Date().toISOString(),
      }));

      const result = getRecommendations(
        createAssessment("Minimal"),
        entries
      );

      expect(
        result.some(
          (item) =>
            item.id === "mood-reflection" &&
            item.title === expectedTitle
        )
      ).toBe(true);
    }
  );


});
