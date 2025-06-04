/** @format */

const cardImages = [
  { name: 'club1', img: '/images/cards/CLUB-1.svg' },
  { name: 'club2', img: '/images/cards/CLUB-2.svg' },
  { name: 'club3', img: '/images/cards/CLUB-3.svg' },
  { name: 'club4', img: '/images/cards/CLUB-4.svg' },
  { name: 'club5', img: '/images/cards/CLUB-5.svg' },
  { name: 'club6', img: '/images/cards/CLUB-6.svg' },
  { name: 'club7', img: '/images/cards/CLUB-7.svg' },
  { name: 'club8', img: '/images/cards/CLUB-8.svg' },
  { name: 'club9', img: '/images/cards/CLUB-9.svg' },
  { name: 'club10', img: '/images/cards/CLUB-10.svg' },
  { name: 'clubJ', img: '/images/cards/CLUB-11-JACK.svg' },
  { name: 'clubQ', img: '/images/cards/CLUB-12-QUEEN.svg' },
  { name: 'clubK', img: '/images/cards/CLUB-13-KING.svg' },
];

export function generateShuffledDeck() {
  const deck = [...cardImages, ...cardImages] // duplicate cards for matching
    .map((card, index) => ({ ...card, id: index + '-' + card.name }))
    .sort(() => Math.random() - 0.5); // shuffle

  return deck;
}
