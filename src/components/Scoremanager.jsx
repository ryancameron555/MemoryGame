/** @format */

import React, { useEffect, useState, useRef } from 'react';
import '../styles/ScoreManager.css'; // Separate CSS file for ScoreManager component

function ScoreManager({ currentTime, currentMoves, isGameComplete, showLeaderboard, onCloseLeaderboard }) {
  const [bestScores, setBestScores] = useState([]);
  const [currentScore, setCurrentScore] = useState(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const lastSavedGameRef = useRef(null); // Track if we've already saved this game

  // Calculate score: lower is better (time in seconds + moves * 2)
  const calculateScore = (time, moves) => {
    return time + (moves * 2);
  };

  // Load scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem('memoryGameScores');
    if (savedScores) {
      setBestScores(JSON.parse(savedScores));
    }
  }, []);

  // Handle game completion
  useEffect(() => {
    if (isGameComplete && currentTime > 0) {
      // Create a unique key for this game to prevent duplicate saves
      const gameKey = `${currentTime}-${currentMoves}`;
      
      // Only save if this is a new game completion
      if (lastSavedGameRef.current === gameKey) {
        return;
      }
      
      lastSavedGameRef.current = gameKey;
      
      const score = calculateScore(currentTime, currentMoves);
      const newScore = {
        score: score,
        time: currentTime,
        moves: currentMoves,
        date: new Date().toISOString(),
      };

      setCurrentScore(newScore);
      
      // Update best scores
      setBestScores((prevScores) => {
        const updatedScores = [...prevScores, newScore]
          .sort((a, b) => a.score - b.score) // Lower score is better
          .slice(0, 10); // Keep only top 10

        localStorage.setItem('memoryGameScores', JSON.stringify(updatedScores));
        return updatedScores;
      });
      
      // Show the score modal
      setShowScoreModal(true);
    }
  }, [isGameComplete, currentTime, currentMoves]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const clearScores = () => {
    if (window.confirm('Are you sure you want to clear all scores?')) {
      setBestScores([]);
      localStorage.removeItem('memoryGameScores');
    }
  };

  const getRank = (score) => {
    const index = bestScores.findIndex(s => s === score);
    if (index === -1) return null;
    
    const rank = index + 1;
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <>
      {/* Game Complete Modal */}
      {showScoreModal && currentScore && (
        <div className="score-modal-overlay" onClick={() => setShowScoreModal(false)}>
          <div className="score-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Game Complete!</h2>
            <div className="score-details">
              <div className="score-item">
                <span className="score-label">Time:</span>
                <span className="score-value">{formatTime(currentScore.time)}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Moves:</span>
                <span className="score-value">{currentScore.moves}</span>
              </div>
              <div className="score-item score-total">
                <span className="score-label">Score:</span>
                <span className="score-value">{currentScore.score}</span>
              </div>
            </div>
            <div className="rank-display">
              {getRank(currentScore)}
            </div>
            <button className="close-modal-btn" onClick={() => setShowScoreModal(false)}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="score-modal-overlay" onClick={onCloseLeaderboard}>
          <div className="leaderboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="scores-header">
              <h2>Best Scores</h2>
              {bestScores.length > 0 && (
                <button className="clear-scores-btn" onClick={clearScores}>
                  Clear
                </button>
              )}
            </div>
            
            {bestScores.length === 0 ? (
              <p className="no-scores">No scores yet. Complete a game to start!</p>
            ) : (
              <div className="scores-list">
                {bestScores.map((score, index) => (
                  <div 
                    key={`${score.date}-${index}`}
                    className={`score-entry ${index < 3 ? 'top-three' : ''}`}
                  >
                    <div className="score-rank">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </div>
                    <div className="score-info">
                      <div className="score-primary">
                        Score: <strong>{score.score}</strong>
                      </div>
                      <div className="score-secondary">
                        {formatTime(score.time)} • {score.moves} moves • {formatDate(score.date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button className="close-modal-btn" onClick={onCloseLeaderboard}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ScoreManager;