import type { AssessmentType } from "../types/emora";

interface AssessmentSelectorProps {
  onSelect: (type: AssessmentType) => void;
}

function AssessmentSelector({
  onSelect,
}: AssessmentSelectorProps) {
  return (
    <section className="question-card">
      <h2>How would you like to check in?</h2>

      <p>
        Choose an assessment to begin your wellness check-in.
      </p>

      <div className="options">
        <button
          type="button"
          className="option-button"
          onClick={() => onSelect("PHQ9")}
        >
          <strong>PHQ-9</strong>
          <br />
          Mood &amp; wellbeing
        </button>

        <button
          type="button"
          className="option-button"
          onClick={() => onSelect("GAD7")}
        >
          <strong>GAD-7</strong>
          <br />
          Anxiety &amp; worry
        </button>
      </div>
    </section>
  );
}

export default AssessmentSelector;