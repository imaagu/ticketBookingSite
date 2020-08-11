import React from "react";
import { Link } from "react-router-dom";
const BottomNav = () => {
  return (
    <nav
      className="navbar navbar-expand-md navbar-light text-light "
      style={{ maxHeight: 80, backgroundColor: "#f2f2f2" }}
    >
      <button
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
        className="navbar-toggler "
        data-target="#navbarTogglerDemo03"
        data-toggle="collapse"
        type="button"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              style={{
                fontSize: 18,
                color: "#333",
                lineHeight: 38,
                textAlign: "left",
              }}
            >
              Movies
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              style={{
                fontSize: 18,
                lineHeight: 38,
              }}
            >
              New Showing
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              style={{
                fontSize: 18,
                lineHeight: 38,
              }}
            >
              Coming Soon
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              style={{
                fontSize: 18,
                lineHeight: 38,
              }}
            >
              Exclusive
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BottomNav;
