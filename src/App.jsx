/** @format */

import React, { useEffect, useState } from 'react';
import { generateShuffledDeck } from './data/card';
import Board from './components/Board';
import GameControls from './components/GameControls';
import ScoreManager from './components/ScoreManager';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    setCards(generateShuffledDeck());
  }, []);

  useEffect(() => {
    if (matchedCards.length > 0 && matchedCards.length === cards.length / 2) {
      setIsTimerRunning(false);
      setGameComplete(true);
    }
  }, [matchedCards, cards]);

  const handleCardClick = (card) => {
    // Prevent card clicks when paused
    if (isPaused) return;
    
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(card.id) ||
      matchedCards.includes(card.name) ||
      disabled
    )
      return;

    if (!isTimerRunning && flippedCards.length === 0) {
      setIsTimerRunning(true);
    }

    // Define newFlips FIRST
    const newFlips = [...flippedCards, card.id];
    setFlippedCards(newFlips);

    // Then check its length and increment moves
    if (newFlips.length === 2) {
      setMoves((prev) => prev + 1);
      setDisabled(true);

      const [first, second] = newFlips.map((id) =>
        cards.find((card) => card.id === id)
      );

      if (first.name === second.name) {
        setMatchedCards((prev) => [...prev, first.name]);
      }

      setTimeout(() => {
        setFlippedCards([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleRestart = () => {
    setCards(generateShuffledDeck());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setIsTimerRunning(false);
    setIsPaused(false);
    setGameComplete(false);
    setFinalTime(0);
    setRestartKey((prev) => prev + 1); //Timer reset
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
    setIsTimerRunning((prev) => !prev);
  };

  return (
    <div className="App">
      <GameControls
        onRestart={handleRestart}
        isTimerRunning={isTimerRunning}
        restartKey={restartKey}
        moves={moves}
        onPauseResume={handlePauseResume}
        isPaused={isPaused}
        onTimeUpdate={setFinalTime}
        onViewScores={() => setShowLeaderboard(true)}
      />
      <Board
        cards={cards}
        handleCardClick={handleCardClick}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
      />
      <ScoreManager
        currentTime={finalTime}
        currentMoves={moves}
        isGameComplete={gameComplete}
        showLeaderboard={showLeaderboard}
        onCloseLeaderboard={() => setShowLeaderboard(false)}
      />
      <Footer />
    </div>
  );
}

export default App;