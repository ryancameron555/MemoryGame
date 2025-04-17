/** @format */

import React, { useEffect, useState } from 'react';
import { generateShuffledDeck } from './data/card';
import Board from './components/Board';
import './styles/App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    setCards(generateShuffledDeck());
  }, []);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || flippedCards.includes(card.id)) return;

    const newFlips = [...flippedCards, card.id];
    setFlippedCards(newFlips);

    if (newFlips.length === 2) {
      const [first, second] = newFlips.map((id) => cards.find(card.id === id));
      if (first.name === second.name) {
        setMatchedCards((prev) => [...prev, first.name]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
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
