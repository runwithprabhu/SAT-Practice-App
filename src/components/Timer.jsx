import { useState, useEffect } from "react";
import "./Timer.css";

function Timer({ minutes, onTimeUp, isRunning }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  // Reset timer when section changes
  useEffect(() => {
    setTimeLeft(minutes * 60);
  }, [minutes]);

  // Countdown logic
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const display = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const percentage = (timeLeft / (minutes * 60)) * 100;
  const isLow = timeLeft < 120;

  return (
    <div className={`timer ${isLow ? "timer-low" : ""}`} aria-live="polite">
      <div className="timer-icon">⏱️</div>
      <div className="timer-display">
        <span className="timer-label">Time Remaining</span>
        <span className="timer-value">{display}</span>
      </div>
      <div className="timer-bar">
        <div
          className="timer-bar-fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={timeLeft}
          aria-valuemin={0}
          aria-valuemax={minutes * 60}
        />
      </div>
    </div>
  );
}

export default Timer;
