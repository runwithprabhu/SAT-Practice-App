import { useState, useEffect, useCallback, useRef } from "react";
import "./Timer.css";

function Timer({ minutes, onTimeUp, isRunning }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    setTimeLeft(minutes * 60);
  }, [minutes]);

  // Runs one interval for the whole countdown instead of recreating it every tick.
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const percentage = (timeLeft / (minutes * 60)) * 100;
  const isLow = timeLeft < 120;

  return (
    <div className={`timer ${isLow ? "timer-low" : ""}`} aria-live="polite">
      <div className="timer-icon">⏱️</div>
      <div className="timer-display">
        <span className="timer-label">Time Remaining</span>
        <span className="timer-value">{formatTime(timeLeft)}</span>
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
