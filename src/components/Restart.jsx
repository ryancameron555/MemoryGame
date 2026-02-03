/** @format */

import React from 'react';

function Restart({ onRestart }) {
  return (
    <button 
      className="btn-base restart-btn"
      onClick={onRestart}
      aria-label="Restart game"
    >
      <span className="icon">↻</span>
      <span className="text">Restart</span>
    </button>
  );
}

export default Restart;