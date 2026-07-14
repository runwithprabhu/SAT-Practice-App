import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { sections } from "../data/questions";
import Timer from "../components/Timer";
import Question from "../components/Question";
import "./Test.css";

function Test() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testStarted, setTestStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const section = sections[currentSection];
  const question = section.questions[currentQuestion];
  const answerKey = `${section.id}-${currentQuestion}`;

  const handleStartTest = () => {
    setTestStarted(true);
    setTimerRunning(true);
  };

  const handleSelectAnswer = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [answerKey]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setCurrentQuestion(0);
    } else {
      finishTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const handleTimeUp = useCallback(() => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setCurrentQuestion(0);
    } else {
      finishTest();
    }
  }, [currentSection]);

  const finishTest = () => {
    setTimerRunning(false);
    const results = sections.map((sec) => {
      let correct = 0;
      sec.questions.forEach((q, idx) => {
        const key = `${sec.id}-${idx}`;
        if (answers[key] === q.correct) {
          correct++;
        }
      });
      return {
        sectionId: sec.id,
        sectionTitle: sec.title,
        total: sec.questions.length,
        correct,
        answers: sec.questions.map((q, idx) => ({
          question: q.question,
          passage: q.passage,
          options: q.options,
          selected: answers[`${sec.id}-${idx}`],
          correct: q.correct,
          explanation: q.explanation,
        })),
      };
    });

    localStorage.setItem("satResults", JSON.stringify(results));
    navigate("/results");
  };

  const isFirstQuestion = currentSection === 0 && currentQuestion === 0;
  const isLastQuestion =
    currentSection === sections.length - 1 &&
    currentQuestion === section.questions.length - 1;

  const totalQuestions = sections.reduce(
    (sum, s) => sum + s.questions.length,
    0
  );
  const currentOverall =
    sections
      .slice(0, currentSection)
      .reduce((sum, s) => sum + s.questions.length, 0) +
    currentQuestion +
    1;

  if (!testStarted) {
    return (
      <div className="test-page">
        <div className="test-intro">
          <h2>SAT Practice Test</h2>
          <p>This practice test includes:</p>
          <ul>
            <li>
              <strong>Section 1:</strong> Reading and Writing — 5 questions, 32
              minutes
            </li>
            <li>
              <strong>Section 2:</strong> Math — 5 questions, 35 minutes
            </li>
          </ul>
          <p className="test-note">
            Each section is timed independently. When time runs out, you'll
            automatically move to the next section.
          </p>
          <button className="btn-begin" onClick={handleStartTest}>
            Begin Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="test-page">
      <div className="test-toolbar">
        <div className="section-info">
          <span className="section-badge">{section.title}</span>
          <span className="progress-text">
            {currentOverall} / {totalQuestions}
          </span>
        </div>
        <Timer
          minutes={section.timeMinutes}
          onTimeUp={handleTimeUp}
          isRunning={timerRunning}
        />
      </div>

      <div className="question-nav-dots">
        {section.questions.map((_, idx) => (
          <button
            key={idx}
            className={`nav-dot ${idx === currentQuestion ? "active" : ""} ${
              answers[`${section.id}-${idx}`] !== undefined ? "answered" : ""
            }`}
            onClick={() => setCurrentQuestion(idx)}
            aria-label={`Go to question ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <Question
        question={question}
        selectedAnswer={answers[answerKey]}
        onSelectAnswer={handleSelectAnswer}
        questionNumber={currentQuestion + 1}
        totalQuestions={section.questions.length}
      />

      <div className="test-actions">
        <button
          className="btn-nav btn-prev"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
        >
          ← Previous
        </button>
        <button className="btn-nav btn-next" onClick={handleNext}>
          {isLastQuestion ? "Submit Test" : "Next →"}
        </button>
      </div>
    </div>
  );
}

export default Test;
