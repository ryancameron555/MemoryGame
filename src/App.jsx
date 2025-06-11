/** @format */

import React, { useEffect, useState } from 'react';
import { generateShuffledDeck } from './data/card';
import Board from './components/Board';
import Timer from './components/Timer';
import './styles/App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

    if (!isTimerRunning) {
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

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <Timer isRunning={isTimerRunning} />
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
