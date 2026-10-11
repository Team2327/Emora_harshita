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


export type RecommendationCategory =
  | "self_care"
  | "professional_support"
  | "emergency_support";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: RecommendationCategory;
  reason: string;
}
