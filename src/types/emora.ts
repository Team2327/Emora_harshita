// Assessment types

export type AssessmentType = "PHQ9" | "GAD7";

export interface AssessmentQuestion {
  id: number;
  text: string;
  options: AssessmentOption[];
}

export interface AssessmentOption {
  label: string;
  value: number;
}

export interface AssessmentAnswer {
  questionId: number;
  value: number;
}

export interface AssessmentResult {
  type: AssessmentType;
  score: number;
  maxScore: number;
  severity: string;
  answers: AssessmentAnswer[];
  completedAt: string;
}