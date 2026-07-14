import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Results.css";

function Results() {
  const [results, setResults] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("satResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  if (!results) {
    return (
      <div className="results-page">
        <div className="no-results">
          <h2>No Results Yet</h2>
          <p>Complete a practice test to see your results here.</p>
          <Link to="/test" className="btn-start-test">
            Take a Practice Test
          </Link>
        </div>
      </div>
    );
  }

  const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
  const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);
  const percentage = Math.round((totalCorrect / totalQuestions) * 100);

  // Approximate SAT score (simplified scaling)
  const scaledScore = Math.round(400 + (percentage / 100) * 1200);

  return (
    <div className="results-page">
      <div className="score-summary">
        <h2>Test Complete!</h2>
        <div className="score-circle">
          <span className="score-value">{scaledScore}</span>
          <span className="score-range">/ 1600</span>
        </div>
        <p className="score-detail">
          {totalCorrect} of {totalQuestions} correct ({percentage}%)
        </p>
      </div>

      <div className="section-results">
        {results.map((section) => (
          <div key={section.sectionId} className="section-result-card">
            <div className="section-result-header">
              <h3>{section.sectionTitle}</h3>
              <span className="section-score">
                {section.correct} / {section.total}
              </span>
            </div>
            <div className="section-bar">
              <div
                className="section-bar-fill"
                style={{
                  width: `${(section.correct / section.total) * 100}%`,
                }}
              />
            </div>
            <button
              className="btn-details"
              onClick={() =>
                setShowDetails(
                  showDetails === section.sectionId ? null : section.sectionId
                )
              }
            >
              {showDetails === section.sectionId
                ? "Hide Details"
                : "Show Details"}
            </button>

            {showDetails === section.sectionId && (
              <div className="answer-details">
                {section.answers.map((answer, idx) => (
                  <div
                    key={idx}
                    className={`answer-item ${
                      answer.selected === answer.correct
                        ? "correct"
                        : "incorrect"
                    }`}
                  >
                    <div className="answer-header">
                      <span className="answer-number">Q{idx + 1}</span>
                      <span
                        className={`answer-badge ${
                          answer.selected === answer.correct
                            ? "badge-correct"
                            : "badge-incorrect"
                        }`}
                      >
                        {answer.selected === answer.correct
                          ? "✓ Correct"
                          : "✗ Incorrect"}
                      </span>
                    </div>
                    <p className="answer-question">{answer.question}</p>
                    {answer.selected !== undefined &&
                      answer.selected !== answer.correct && (
                        <p className="your-answer">
                          Your answer:{" "}
                          <strong>{answer.options[answer.selected]}</strong>
                        </p>
                      )}
                    <p className="correct-answer">
                      Correct answer:{" "}
                      <strong>{answer.options[answer.correct]}</strong>
                    </p>
                    <p className="explanation">{answer.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="results-actions">
        <Link to="/test" className="btn-retake">
          Retake Test
        </Link>
        <button
          className="btn-clear"
          onClick={() => {
            localStorage.removeItem("satResults");
            setResults(null);
          }}
        >
          Clear Results
        </button>
      </div>
    </div>
  );
}

export default Results;
