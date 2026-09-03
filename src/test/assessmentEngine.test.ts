import { describe, expect, it } from "vitest";
import {
  calculateAssessmentScore,
  type AssessmentConfig,
} from "../services/assessmentEngine";

const phq9Config: AssessmentConfig = {
  type: "PHQ9",
  questionCount: 9,
  maxScore: 27,
  getSeverity: (score) => {
    if (score <= 4) return "Minimal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Moderately severe";
    return "Severe";
  },
};

describe("Reusable assessment engine", () => {
  it("calculates an assessment score", () => {
    const answers = [
      { questionId: 1, value: 2 },
      { questionId: 2, value: 1 },
      { questionId: 3, value: 3 },
      { questionId: 4, value: 0 },
      { questionId: 5, value: 0 },
      { questionId: 6, value: 0 },
      { questionId: 7, value: 0 },
      { questionId: 8, value: 0 },
      { questionId: 9, value: 0 },
    ];

    expect(calculateAssessmentScore(answers, phq9Config)).toBe(6);
  });

  it("rejects incomplete assessments", () => {
    const answers = [
      { questionId: 1, value: 2 },
      { questionId: 2, value: 1 },
    ];

    expect(() =>
      calculateAssessmentScore(answers, phq9Config)
    ).toThrow("PHQ9 requires answers to all 9 questions");
  });

  it("rejects invalid answer values", () => {
    const answers = [
      { questionId: 1, value: 4 },
      { questionId: 2, value: 0 },
      { questionId: 3, value: 0 },
      { questionId: 4, value: 0 },
      { questionId: 5, value: 0 },
      { questionId: 6, value: 0 },
      { questionId: 7, value: 0 },
      { questionId: 8, value: 0 },
      { questionId: 9, value: 0 },
    ];

    expect(() =>
      calculateAssessmentScore(answers, phq9Config)
    ).toThrow("Invalid answer value for question 1");
  });
});