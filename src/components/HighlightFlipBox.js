import React, { useState } from "react";
import "./HighlightFlipBox.css";

export default function HighlightFlipBox({ icon, title, description }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""}`}
      tabIndex={0}
      onClick={() => setFlipped(f => !f)}
      onKeyPress={e => {
        if (e.key === "Enter" || e.key === " ") setFlipped(f => !f);
      }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <span className="highlight-icon">{icon}</span>
          <span className="highlight-title">{title}</span>
          <div className="flip-hint">Haz clic para ver más</div>
        </div>
        <div className="flip-card-back">
          {/* Ya NO hay icono aquí */}
          <div className="highlight-desc">{description}</div>
        </div>
      </div>
    </div>
  );
}