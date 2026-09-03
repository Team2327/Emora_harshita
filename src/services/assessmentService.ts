import type {
  AssessmentAnswer,
  AssessmentResult,
} from "../types/emora";

import {
  calculateAssessmentScore,
  type AssessmentConfig,
} from "./assessmentEngine";

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

const gad7Config: AssessmentConfig = {
  type: "GAD7",
  questionCount: 7,
  maxScore: 21,
  getSeverity: (score) => {
    if (score <= 4) return "Minimal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    return "Severe";
  },
};

export const calculatePHQ9Score = (
  answers: AssessmentAnswer[]
): number => {
  return calculateAssessmentScore(answers, phq9Config);
};

export const calculateGAD7Score = (
  answers: AssessmentAnswer[]
): number => {
  return calculateAssessmentScore(answers, gad7Config);
};

export const getPHQ9Severity = (score: number): string => {
  return phq9Config.getSeverity(score);
};
export const createGAD7Result = (
  answers: AssessmentAnswer[]
): AssessmentResult => {
  const score = calculateGAD7Score(answers);

  return {
    type: "GAD7",
    score,
    maxScore: 21,
    severity: getGAD7Severity(score),
    answers,
    completedAt: new Date().toISOString(),
  };
};

export const getGAD7Severity = (score: number): string => {
  return gad7Config.getSeverity(score);
};

export const createPHQ9Result = (
  answers: AssessmentAnswer[]
): AssessmentResult => {
  const score = calculatePHQ9Score(answers);

  return {
    type: "PHQ9",
    score,
    maxScore: 27,
    severity: getPHQ9Severity(score),
    answers,
    completedAt: new Date().toISOString(),
  };
};