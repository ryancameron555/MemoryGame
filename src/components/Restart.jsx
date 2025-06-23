/** @format */

import React from 'react';
import '../styles/Buttons.css';

export default function Restart({ onRestart }) {
  return (
    <button className="restart-button" onClick={onRestart}>
      Restart
    </button>
  );
}
