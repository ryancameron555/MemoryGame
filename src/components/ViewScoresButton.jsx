/** @format */

import React from 'react';

function ViewScoresButton({ onClick }) {
  return (
    <button 
      className="btn-base view-scores-btn"
      onClick={onClick}
      aria-label="View best scores"
    >
      <span className="icon">★</span>
      <span className="text">Scores</span>
    </button>
  );
}

export default ViewScoresButton;