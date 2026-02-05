/** @format */

import React, { useEffect, useState } from 'react';
import '../styles/HowToPlay.css';

function HowToPlay() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has seen the instructions before
    const hasSeenInstructions = localStorage.getItem('hasSeenInstructions');
    
    if (!hasSeenInstructions) {
      // Show modal after 3 second delay on first visit
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem('hasSeenInstructions', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Info Button */}
      <button 
        className="btn-base info-btn"
        onClick={handleOpen}
        aria-label="How to play"
      >
        <span className="icon">ⓘ</span>
        <span className="text">How to Play</span>
      </button>

      {/* Instructions Modal */}
      {showModal && (
        <div className="info-modal-overlay" onClick={handleClose}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleClose}>×</button>
            
            <h2>How to Play Memory Game</h2>
            
            <div className="instructions">
              <div className="instruction-step">
                <span className="step-number">1</span>
                <div className="step-content">
                  <h3>Find Matching Pairs</h3>
                  <p>Click on cards to flip them over and reveal the playing card underneath.</p>
                </div>
              </div>

              <div className="instruction-step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h3>Remember Card Positions</h3>
                  <p>Try to remember where each card is located. Match pairs of identical cards.</p>
                </div>
              </div>

              <div className="instruction-step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h3>Complete the Board</h3>
                  <p>Find all 15 pairs to win! Your time and number of moves are tracked.</p>
                </div>
              </div>

              <div className="instruction-step">
                <span className="step-number">4</span>
                <div className="step-content">
                  <h3>Beat Your Best Score</h3>
                  <p>Lower scores are better! Score = Time (seconds) + Moves × 2</p>
                </div>
              </div>
            </div>

            <div className="controls-info">
              <h3>Game Controls</h3>
              <ul>
                <li><strong>Restart:</strong> Start a new game with shuffled cards</li>
                <li><strong>Pause:</strong> Pause the timer (cards are hidden)</li>
                <li><strong>Scores:</strong> View your top 10 best scores</li>
              </ul>
            </div>

            <button className="got-it-btn" onClick={handleClose}>
              Got it, let's play!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HowToPlay;