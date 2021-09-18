import { useState, useEffect, useRef } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Card from './Card';
import axios from 'axios';
import top_view_table from '../../../static/top_view_table.png';

const Thulla = (porps) => {
  const [loaded, setLoaded] = useState(false);
  const [tableCards, setTableCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);

  useEffect(() => {
    setPlayerCards([
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
    ]);
    setTableCards([
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/8C.png',
        value: '8',
        suit: 'CLUBS',
        code: '8C',
      },
      {
        image: 'https://deckofcardsapi.com/static/img/KH.png',
        value: 'KING',
        suit: 'HEARTS',
        code: 'KH',
      },
    ]);
    setLoaded(true);
  }, []);

  return !loaded ? (
    <div className='flex items-center justify-center w-3/4 text-3xl'>Loading...</div>
  ) : (
    <div className='flex flex-col w-3/4 justify-between'>
      <div
        className='flex justify-center w-full space-y-6 h-full'
        style={{
          background: `url(${top_view_table})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {tableCards.map((card) => (
          <Card
            key={card.code}
            styles={{ height: 80, width: 58 }}
            onClick={() => {
              return;
            }}
            squeeze={false}
            img={card.image}
            code={card.code}
          />
        ))}
      </div>
      <div className='flex absolute bottom-0 justify-evenly'>
        {playerCards.map((card) => (
          <Card
            styles={{ height: 216, width: 155 }}
            key={card.code}
            onClick={() => {
              return;
            }}
            squeeze={playerCards.length > 8}
            img={card.image}
            code={card.code}
          />
        ))}
      </div>
    </div>
  );
};

export default Thulla;
