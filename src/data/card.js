/** @format */

import CLUB1 from '../assets/cards/CLUB-1.svg';
import CLUB2 from '../assets/cards/CLUB-2.svg';
import CLUB3 from '../assets/cards/CLUB-3.svg';
import CLUB4 from '../assets/cards/CLUB-4.svg';
import CLUB5 from '../assets/cards/CLUB-5.svg';
import CLUB6 from '../assets/cards/CLUB-6.svg';
import CLUB7 from '../assets/cards/CLUB-7.svg';
import CLUB8 from '../assets/cards/CLUB-8.svg';
import CLUB9 from '../assets/cards/CLUB-9.svg';
import CLUB10 from '../assets/cards/CLUB-10.svg';
import CLUBJ from '../assets/cards/CLUB-11-JACK.svg';
import CLUBQ from '../assets/cards/CLUB-12-QUEEN.svg';
import CLUBK from '../assets/cards/CLUB-13-KING.svg';

const cardImages = [
  { name: 'club1', img: CLUB1 },
  { name: 'club2', img: CLUB2 },
  { name: 'club3', img: CLUB3 },
  { name: 'club4', img: CLUB4 },
  { name: 'club5', img: CLUB5 },
  { name: 'club6', img: CLUB6 },
  { name: 'club7', img: CLUB7 },
  { name: 'club8', img: CLUB8 },
  { name: 'club9', img: CLUB9 },
  { name: 'club10', img: CLUB10 },
  { name: 'clubJ', img: CLUBJ },
  { name: 'clubQ', img: CLUBQ },
  { name: 'clubK', img: CLUBK },
];

export function generateShuffledDeck() {
  const deck = [...cardImages, ...cardImages] // duplicate cards for matching
    .map((card, index) => ({ ...card, id: `${index}- ${card.name}` }))
    .sort(() => Math.random() - 0.5); // shuffle

  return deck;
}
