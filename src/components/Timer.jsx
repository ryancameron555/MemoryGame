/** @format */

import React, { useEffect, useState } from 'react';
import '../styles/App.css';

export default function Timer({ isRunning, onStop }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
      if (onStop) onStop(time);
    }

    return () => clearInterval(timer);
  }, [isRunning, onStop, time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="timer">
      <h2>{formatTime(time)}</h2>
    </div>
  );
}
