
import type {
  AssessmentResult,
  Recommendation,
} from "../types/emora";
import type { MoodEntry } from "../types/mood";

export const getRecommendations = (
  assessment: AssessmentResult | null,
  moodEntries: MoodEntry[]
): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Safety check: PHQ-9 question 9 must be handled separately.
  const hasSelfHarmConcern =
    assessment?.type === "PHQ9" &&
    assessment.answers.some(
      (answer) => answer.questionId === 9 && answer.value > 0
    );

  if (hasSelfHarmConcern) {
    recommendations.push({
      id: "self-harm-support",
      title: "You deserve support right now",
      description:
        "Please reach out to someone you trust or a qualified mental-health professional. If you may act on these thoughts or cannot stay safe, contact local emergency services or go to the nearest emergency department.",
      category: "professional_support",
      reason:
        "Your response to a safety-related assessment question indicates that additional support may be helpful.",
    });
  }

  // Offer a check-in if no assessment has been completed.
  if (!assessment) {
    recommendations.push({
      id: "daily-check-in",
      title: "Start with a gentle check-in",
      description:
        "Take a moment to notice how you have been feeling lately. You can begin by recording your mood or writing a few thoughts in your journal.",
      category: "self_care",
      reason:
        "Reflecting on your feelings can help you understand your current wellbeing.",
    });
  } else {
    const severity = assessment.severity.toLowerCase();
    const isPHQ9 = assessment.type === "PHQ9";

    // Severe or moderately severe screening results.
    if (
      severity === "severe" ||
      severity === "moderately severe"
    ) {
      recommendations.push({
        id: "professional-support",
        title: isPHQ9
          ? "You don't have to manage low mood alone"
          : "You deserve support with what feels overwhelming",
        description: isPHQ9
          ? "Consider contacting a qualified mental-health professional to talk through changes in mood, motivation, or everyday activities."
          : "Consider speaking with a qualified mental-health professional about the worries or tension you have been experiencing.",
        category: "professional_support",
        reason: isPHQ9
          ? "Your depression-screening responses suggest that additional support may be helpful."
          : "Your anxiety-screening responses suggest that additional support may be helpful.",
      });
    }

    // Moderate screening results.
    else if (severity === "moderate") {
      recommendations.push({
        id: "moderate-support",
        title: isPHQ9
          ? "Make room for one manageable activity"
          : "Try breaking one worry into smaller steps",
        description: isPHQ9
          ? "Choose something small, such as taking a short walk, eating a regular meal, or spending a few minutes on a hobby. Keep the goal gentle."
          : "Write down one thing worrying you, identify what is within your control, and choose one small next step.",
        category: "self_care",
        reason: isPHQ9
          ? "A small, achievable activity may help you build a manageable routine."
          : "Breaking a concern into smaller steps can make it easier to approach.",
      });
    }

    // Mild screening results.
    else if (severity === "mild") {
      recommendations.push({
        id: "mild-support",
        title: isPHQ9
          ? "Notice what helps you feel a little better"
          : "Give your mind a short pause",
        description: isPHQ9
          ? "Notice whether rest, enjoyable activities, or connecting with someone you trust makes a difference to your day."
          : "Try a slow-breathing exercise or a short grounding break. You can also write down a worry instead of trying to solve everything at once.",
        category: "self_care",
        reason: isPHQ9
          ? "Noticing helpful activities can guide your personal self-care."
          : "Brief grounding practices may help you manage moments of stress.",
      });
    }

    // Minimal or unrecognised severity labels.
    else {
      recommendations.push({
        id: "self-care-routine",
        title: isPHQ9
          ? "Keep a little time for things you enjoy"
          : "Keep practising habits that help you reset",
        description: isPHQ9
          ? "Make time for a favourite song, sketching, a walk, or a conversation with someone you enjoy."
          : "Try maintaining a steady sleep routine, taking short breaks, and using a grounding exercise when you need one.",
        category: "self_care",
        reason:
          "Small, repeatable habits can support everyday wellbeing.",
      });
    }
  }

  // Encourage reflection after at least three mood check-ins.
  if (moodEntries.length >= 3) {
    recommendations.push({
      id: "mood-reflection",
      title: "Reflect on your mood check-ins",
      description:
        "Look back at your recent entries and notice whether anything seems connected to how you have been feeling. Consider whether any activities, situations, or routines stand out.",
      category: "self_care",
      reason:
        "You have recorded at least three mood check-ins.",
    });
  }

  return recommendations;
};
