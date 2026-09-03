import type {
  AssessmentAnswer,
  AssessmentType,
} from "../types/emora";

export interface AssessmentConfig {
  type: AssessmentType;
  questionCount: number;
  maxScore: number;
  getSeverity: (score: number) => string;
}

export const calculateAssessmentScore = (
  answers: AssessmentAnswer[],
  config: AssessmentConfig
): number => {
  if (answers.length !== config.questionCount) {
    throw new Error(
      `${config.type} requires answers to all ${config.questionCount} questions`
    );
  }

  for (const answer of answers) {
    if (
      !Number.isInteger(answer.value) ||
      answer.value < 0 ||
      answer.value > 3
    ) {
      throw new Error(
        `Invalid answer value for question ${answer.questionId}`
      );
    }
  }

  return answers.reduce((total, answer) => total + answer.value, 0);
};