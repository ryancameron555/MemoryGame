/** @format */

import React from 'react';
import Restart from './Restart';
import GameStats from './GameStats';
import PauseResume from './PauseResume';
import '../styles/Components.css'; // Single CSS file for all components

function GameControls({ 
  onRestart, 
  isTimerRunning, 
  restartKey, 
  moves,
  onPauseResume,
  isPaused,
  onTimeUpdate
}) {
  return (
    <div className="game-controls">
      <Restart onRestart={onRestart} />
      
      {onPauseResume && (
        <PauseResume 
          isPaused={isPaused} 
          onPauseResume={onPauseResume} 
        />
      )}
      
      <GameStats
        isTimerRunning={isTimerRunning}
        restartKey={restartKey}
        moves={moves}
        onTimeUpdate={onTimeUpdate}
      />
    </div>
  );
}

export default GameControls;