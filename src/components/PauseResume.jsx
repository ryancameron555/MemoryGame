/** @format */

import React from 'react';

function PauseResume({ isPaused, onPauseResume }) {
  return (
    <button 
      className={`btn-base pause-resume-btn ${isPaused ? 'paused' : 'playing'}`}
      onClick={onPauseResume}
      aria-label={isPaused ? 'Resume game' : 'Pause game'}
    >
      {isPaused ? (
        <>
          <span className="icon">▸</span>
          <span className="text">Resume</span>
        </>
      ) : (
        <>
          <span className="icon">❚❚</span>
          <span className="text">Pause</span>
        </>
      )}
    </button>
  );
}

export default PauseResume;