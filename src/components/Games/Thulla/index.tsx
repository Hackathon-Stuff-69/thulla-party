import { useState, useEffect, useRef } from 'react';
import Card from './Card';
import top_view_table from '../../../static/top_view_table.png';

const cards = [
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
];

const Thulla = () => {
  const [loaded, setLoaded] = useState(false);
  const [tableCards, setTableCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const specs = useRef([]);

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
    setTableCards(cards);

    const specsArray = [];
    for (let i = 0; i < cards.length; i++) {
      specsArray.push({
        marginTop: Math.floor(Math.random() * 230),
        marginLeft: Math.floor(Math.random() * 230),
        marginRight: Math.floor(Math.random() * 230),
        transform: Math.floor(Math.random() * 360),
      });
    }
    specs.current = specsArray;

    setLoaded(true);
  }, []);

  return !loaded ? (
    <div className='flex items-center justify-center w-3/4 text-3xl'>Loading...</div>
  ) : (
    <>
      <div
        className='flex w-3/4 h-full'
        style={{
          background: `url(${top_view_table})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='flex flex-col w-3/4 absolute h-full justify-center items-center'>
          <div className='w-96 h-96 flex items-center justify-center overflow-hidden'>
            {specs.current &&
              tableCards.map((card, index) => (
                <Card
                  key={card.code}
                  styles={{
                    height: 150,
                    width: 108,
                    marginTop: specs.current[index].marginTop,
                    marginLeft: specs.current[index].marginLeft,
                    marginRight: specs.current[index].marginRight,
                    transform: `rotate(${specs.current[index].transform}deg)`,
                    zIndex: index,
                    position: 'absolute',
                  }}
                  onClick={() => {
                    return;
                  }}
                  squeeze={false}
                  img={card.image}
                  code={card.code}
                  tableCard={true}
                />
              ))}
          </div>
          <div className='flex bottom-0 w-full'>
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
                tableCard={false}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Thulla;
