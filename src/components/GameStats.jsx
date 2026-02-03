/** @format */

import React, { useEffect, useState } from 'react';

function GameStats({ isTimerRunning, restartKey, moves, onTimeUpdate }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
  }, [restartKey]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newTime = prev + 1;
          if (onTimeUpdate) {
            onTimeUpdate(newTime);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, onTimeUpdate]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-stats">
      <div className="stat-card">
        <div className="stat-icon">◷</div>
        <div className="stat-content">
          <div className="stat-label">Time</div>
          <div className="stat-value">{formatTime(seconds)}</div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">♠</div>
        <div className="stat-content">
          <div className="stat-label">Moves</div>
          <div className="stat-value">{moves}</div>
        </div>
      </div>
    </div>
  );
}

export default GameStats;