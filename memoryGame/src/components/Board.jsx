/** @format */

import React from 'react';
import Card from './Card';
import '../styles/App.css';

export default function Board({
  cards,
  handleCardClick,
  flippedCards,
  matchedCards,
}) {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => handleCardClick(card)}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedCards.includes(card.name)}
        />
      ))}
    </div>
  );
}
