import type { AssessmentAnswer,AssessmentResult,} from "../types/emora";
const validateAssessmentAnswers = (answers: AssessmentAnswer[]): void => {
  for (const answer of answers) {
    if (!Number.isInteger(answer.value) || answer.value < 0 || answer.value > 3) {
      throw new Error(
        `Invalid answer value for question ${answer.questionId}`
      );
    }
  }
};

const PHQ9_QUESTION_COUNT = 9;
export const calculatePHQ9Score = (
  answers: AssessmentAnswer[]
): number => {
    if (answers.length !== PHQ9_QUESTION_COUNT) {
    throw new Error("PHQ-9 requires answers to all 9 questions");
  }
  validateAssessmentAnswers(answers);
  
  return answers.reduce((total, answer) => total + answer.value, 0);
};

export const getPHQ9Severity = (score: number): string => {
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  if (score <= 19) return "Moderately severe";
  return "Severe";
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