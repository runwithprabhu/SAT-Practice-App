import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h2>Master the SAT</h2>
        <p className="hero-subtitle">
          Practice with realistic questions covering Reading & Writing and Math
          sections in the digital SAT format.
        </p>
        <Link to="/test" className="btn-start">
          Start Practice Test
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">📖</span>
          <h3>Reading & Writing</h3>
          <p>
            Practice comprehension, grammar, and vocabulary in context with
            passage-based questions.
          </p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🧮</span>
          <h3>Math</h3>
          <p>
            Algebra, geometry, statistics, and advanced math problems matching
            real SAT difficulty.
          </p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⏱️</span>
          <h3>Timed Sections</h3>
          <p>
            Practice under real test conditions with section-specific timers to
            build test stamina.
          </p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📊</span>
          <h3>Instant Feedback</h3>
          <p>
            Get detailed explanations for every question and track your
            performance over time.
          </p>
        </div>
      </section>

      <section className="info-section">
        <h3>About the Digital SAT</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Format</strong>
            <span>2 sections: Reading & Writing, Math</span>
          </div>
          <div className="info-item">
            <strong>Duration</strong>
            <span>~2 hours 14 minutes total</span>
          </div>
          <div className="info-item">
            <strong>Score Range</strong>
            <span>400–1600 (200–800 per section)</span>
          </div>
          <div className="info-item">
            <strong>Question Types</strong>
            <span>Multiple choice, student-produced responses</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
