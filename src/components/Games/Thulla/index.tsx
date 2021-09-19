import { useState, useEffect, useRef } from 'react';
import Card from './Card';
import top_view_table from '../../../static/top_view_table.png';

const Thulla = ({ playerCards, tableCards, transferCard, specs }) => {
  // const specs = useRef([]);

  // useEffect(() => {
  // const specsArray = [];
  // for (let i = 0; i < tableCards.length; i++) {
  //   specsArray.push({
  //     marginTop: Math.floor(Math.random() * 230),
  //     marginLeft: Math.floor(Math.random() * 230),
  //     marginRight: Math.floor(Math.random() * 230),
  //     transform: Math.floor(Math.random() * 360),
  //   });
  // }
  // specs.current = specsArray;
  // }, [tableCards]);

  return (
    <>
      <div
        className='flex w-3/4 h-full'
        style={{
          background: `url(${top_view_table})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {console.log(specs)}
        <div className='flex flex-col w-3/4 absolute h-full justify-center items-center'>
          <div className='w-96 h-96 flex items-center justify-center overflow-hidden'>
            {specs &&
              tableCards.map((card, index) => (
                <Card
                  key={card.code}
                  styles={{
                    height: 150,
                    width: 108,
                    marginTop: specs[index].marginTop,
                    marginLeft: specs[index].marginLeft,
                    marginRight: specs[index].marginRight,
                    transform: `rotate(${specs[index].transform}deg)`,
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
                  transferCard(card);
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
