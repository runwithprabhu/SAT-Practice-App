import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">📝</span>
          <h1>SAT Practice</h1>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/test"
            className={`nav-link ${location.pathname === "/test" ? "active" : ""}`}
          >
            Practice Test
          </Link>
          <Link
            to="/results"
            className={`nav-link ${location.pathname === "/results" ? "active" : ""}`}
          >
            Results
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
