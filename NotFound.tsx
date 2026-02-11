import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <section className="sky-page">
      <header className="sky-page-header">
        <h1 className="sky-page-title">Signal Lost</h1>
        <p className="sky-page-subtitle">
          The requested panel is outside the authorized airspace.
        </p>
      </header>
      <div className="glass-panel">
        <div className="glass-panel-inner">
          <p className="status-stat-label">
            Route not found in current SkyStrike Control map. Return to the
            primary dashboard to regain situational awareness.
          </p>
          <div style={{ marginTop: 12 }}>
            <Link to="/" className="mission-cta">
              BACK TO DASHBOARD
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

