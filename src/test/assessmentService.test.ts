import { describe, expect, it } from "vitest";
import {
  calculatePHQ9Score,
  getPHQ9Severity, 
  createPHQ9Result,
  calculateGAD7Score,
  getGAD7Severity,
  createGAD7Result,
} from "../services/assessmentService";

describe("PHQ-9 assessment service", () => {
  it("calculates the total score correctly", () => {
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

    expect(calculatePHQ9Score(answers)).toBe(6);
  });

  it("classifies all PHQ-9 severity boundaries correctly", () => {
    expect(getPHQ9Severity(0)).toBe("Minimal");
    expect(getPHQ9Severity(4)).toBe("Minimal");

    expect(getPHQ9Severity(5)).toBe("Mild");
    expect(getPHQ9Severity(9)).toBe("Mild");

    expect(getPHQ9Severity(10)).toBe("Moderate");
    expect(getPHQ9Severity(14)).toBe("Moderate");

    expect(getPHQ9Severity(15)).toBe("Moderately severe");
    expect(getPHQ9Severity(19)).toBe("Moderately severe");

    expect(getPHQ9Severity(20)).toBe("Severe");
    expect(getPHQ9Severity(27)).toBe("Severe");
  });
  it("creates a complete PHQ-9 result", () => {
    const answers = [
        { questionId: 1, value: 2 },
        { questionId: 2, value: 2 },
        { questionId: 3, value: 1 },
        { questionId: 4, value: 2 },
        { questionId: 5, value: 1 },
        { questionId: 6, value: 1 },
        { questionId: 7, value: 1 },
        { questionId: 8, value: 1 },
        { questionId: 9, value: 1 },
    ];

    const result = createPHQ9Result(answers);

    expect(result.type).toBe("PHQ9");
    expect(result.score).toBe(12);
    expect(result.maxScore).toBe(27);
    expect(result.severity).toBe("Moderate");
    expect(result.answers).toEqual(answers);
    expect(result.completedAt).toBeDefined();
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

  expect(() => calculatePHQ9Score(answers)).toThrow(
    "Invalid answer value for question 1"
  );
});
it("rejects incomplete PHQ-9 responses", () => {
  const answers = [
    { questionId: 1, value: 2 },
    { questionId: 2, value: 1 },
    { questionId: 3, value: 0 },
  ];

  expect(() => calculatePHQ9Score(answers)).toThrow(
    "PHQ9 requires answers to all 9 questions"
  );
});
});

describe("GAD-7 assessment service", () => {
  it("calculates the total score correctly", () => {
    const answers = [
      { questionId: 1, value: 2 },
      { questionId: 2, value: 1 },
      { questionId: 3, value: 3 },
      { questionId: 4, value: 0 },
      { questionId: 5, value: 2 },
      { questionId: 6, value: 1 },
      { questionId: 7, value: 0 },
    ];

    expect(calculateGAD7Score(answers)).toBe(9);
  });

  it("classifies all GAD-7 severity boundaries correctly", () => {
    expect(getGAD7Severity(0)).toBe("Minimal");
    expect(getGAD7Severity(4)).toBe("Minimal");
    expect(getGAD7Severity(5)).toBe("Mild");
    expect(getGAD7Severity(9)).toBe("Mild");
    expect(getGAD7Severity(10)).toBe("Moderate");
    expect(getGAD7Severity(14)).toBe("Moderate");
    expect(getGAD7Severity(15)).toBe("Severe");
    expect(getGAD7Severity(21)).toBe("Severe");
  });

  it("rejects incomplete GAD-7 responses", () => {
    const answers = [
      { questionId: 1, value: 2 },
      { questionId: 2, value: 1 },
    ];

    expect(() => calculateGAD7Score(answers)).toThrow(
      "GAD7 requires answers to all 7 questions"
    );
  });

  it("creates a complete GAD-7 result", () => {
  const answers = [
    { questionId: 1, value: 2 },
    { questionId: 2, value: 1 },
    { questionId: 3, value: 3 },
    { questionId: 4, value: 0 },
    { questionId: 5, value: 2 },
    { questionId: 6, value: 1 },
    { questionId: 7, value: 0 },
  ];

  const result = createGAD7Result(answers);

  expect(result.type).toBe("GAD7");
  expect(result.score).toBe(9);
  expect(result.maxScore).toBe(21);
  expect(result.severity).toBe("Mild");
  expect(result.answers).toEqual(answers);
  expect(result.completedAt).toBeTruthy();
});


});