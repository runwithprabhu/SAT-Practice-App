import { useState } from "react";
import ChatPanel from "./ChatPanel";
import "./Question.css";

function Question({ question, selectedAnswer, onSelectAnswer, questionNumber, totalQuestions }) {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="question-wrapper">
      <div className="question-card">
        <div className="question-header">
          <span className="question-number">
            Question {questionNumber} of {totalQuestions}
          </span>
          <button
            className="btn-chat"
            onClick={() => setShowChat(!showChat)}
            aria-label={showChat ? "Close AI chat" : "Ask AI for help"}
          >
            {showChat ? "Close Chat 🤖" : "Ask AI 🤖"}
          </button>
        </div>

        {question.passage && (
          <div className="passage">
            <p>{question.passage}</p>
          </div>
        )}

        <div className="question-text">
          <p>{question.question}</p>
        </div>

        <div className="options" role="radiogroup" aria-label="Answer choices">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option ${selectedAnswer === index ? "selected" : ""}`}
              onClick={() => onSelectAnswer(index)}
              role="radio"
              aria-checked={selectedAnswer === index}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {showChat && (
        <ChatPanel question={question} onClose={() => setShowChat(false)} />
      )}
    </div>
  );
}

export default Question;
