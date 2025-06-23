/** @format */

import React, { useEffect, useState } from 'react';
import { generateShuffledDeck } from './data/card';
import Board from './components/Board';
import Timer from './components/Timer';
import Restart from './components/Restart';
import './styles/App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  useEffect(() => {
    setCards(generateShuffledDeck());
  }, []);

  useEffect(() => {
    if (matchedCards.length === cards.length / 2 && matchedCards.length > 0) {
      setIsTimerRunning(false);
    }
  }, [matchedCards, cards]);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || flippedCards.includes(card.id) || disabled)
      return;

    if (!isTimerRunning && flippedCards.length === 0) {
      setIsTimerRunning(true);
    }

    const newFlips = [...flippedCards, card.id];
    setFlippedCards(newFlips);

    if (newFlips.length === 2) {
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
    setIsTimerRunning(false);
    setRestartKey((prev) => prev + 1); //Timer reset
  };

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <h2>
        (This is still a work in progress , more functionality on the way!)
      </h2>
      <Restart onRestart={handleRestart} />
      <Timer key={restartKey} isRunning={isTimerRunning} />
      <Board
        cards={cards}
        handleCardClick={handleCardClick}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
      />
    </div>
  );
}

export default App;
