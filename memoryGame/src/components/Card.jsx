/** @format */

import React from 'react';
import '..styles/Card.css';

export default function Card({ card, onClick, isFlipped, isMatched }) {
  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={card.img} alt={card.name} />
        </div>
        <div className="card-back">❓</div>
      </div>
    </div>
  );
}
