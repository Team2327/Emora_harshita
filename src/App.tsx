import { useState } from "react";
import type {
  AssessmentAnswer,
  AssessmentType,
} from "./types/emora";

import Chatbot from "./components/chatbot";
import MoodTracker from "./components/MoodTracker";

import { phq9Questions } from "./data/phq9Questions";
import { gad7Questions } from "./data/gad7Questions";

import {
  calculatePHQ9Score,
  getPHQ9Severity,
  createGAD7Result,
} from "./services/assessmentService";

import AssessmentSelector from "./components/AssessmentSelector";

import "./App.css";

function App() {
  const [assessmentType, setAssessmentType] =
    useState<AssessmentType | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);

  const [completed, setCompleted] = useState(false);

  if (!assessmentType) {
    return (
      <main className="app">
        <div className="assessment-container">
          <header className="brand">
            <h1>emora</h1>
            <p>A gentle check-in with yourself</p>
          </header>

          <AssessmentSelector onSelect={setAssessmentType} />
          <Chatbot/>
          <MoodTracker />
        </div>
      </main>
    );
  }

  const questions =
    assessmentType === "PHQ9"
      ? phq9Questions
      : gad7Questions;

  const question = questions[currentQuestion];

  const selectedAnswer = answers.find(
    (answer) => answer.questionId === question.id
  );

  const handleAnswer = (value: number) => {
    const newAnswer: AssessmentAnswer = {
      questionId: question.id,
      value,
    };

    setAnswers((previousAnswers) => {
      const filteredAnswers = previousAnswers.filter(
        (answer) => answer.questionId !== question.id
      );

      return [...filteredAnswers, newAnswer];
    });
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (currentQuestion === questions.length - 1) {
      setCompleted(true);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
  };

  const handleBack = () => {
    if (currentQuestion === 0) {
      setAssessmentType(null);
      setAnswers([]);
      return;
    }

    setCurrentQuestion((previous) => previous - 1);
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setCompleted(false);
  };

  if (completed) {
    let score = 0;
    let severity = "";

    if (assessmentType === "PHQ9") {
      score = calculatePHQ9Score(answers);
      severity = getPHQ9Severity(score);
    } else {
      const result = createGAD7Result(answers);
      score = result.score;
      severity = result.severity;
    }

    const maxScore = assessmentType === "PHQ9" ? 27 : 21;

    return (
      <main className="app">
        <div className="assessment-container">
          <header className="brand">
            <h1>emora</h1>
            <p>Your mental wellness space</p>
          </header>

          <section className="result-card">
            <h2>Assessment Complete</h2>

            <p>
              Your {assessmentType === "PHQ9" ? "PHQ-9" : "GAD-7"} score
            </p>

            <div className="result-score">
              {score} / {maxScore}
            </div>

            <div className="result-severity">
              Severity: <strong>{severity}</strong>
            </div>

            <button type="button" onClick={handleRestart}>
              Take Again
            </button>
          </section>
        </div>
      </main>
    );
  }

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <main className="app">
      <div className="assessment-container">
        <header className="brand">
          <h1>emora</h1>
          <p>A gentle check-in with yourself</p>
        </header>

        <section className="progress-section">
          <div className="progress-text">
            <span>
              {assessmentType === "PHQ9"
                ? "PHQ-9 Assessment"
                : "GAD-7 Assessment"}
            </span>

            <span>
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="question-card">
          <h2>{question.text}</h2>

          <div className="options">
            {question.options.map((option) => {
              const isSelected =
                selectedAnswer?.value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={`option-button ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => handleAnswer(option.value)}
                  aria-pressed={isSelected}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="navigation">
            <button
              type="button"
              className="back-button"
              onClick={handleBack}
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {currentQuestion === questions.length - 1
                ? "View Results"
                : "Next"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;