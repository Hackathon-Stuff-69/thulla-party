import { useState } from 'react';

const Card = ({ img, onClick, code, squeeze, styles, tableCard }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      style={styles}
      className={`${!tableCard ? 'transition duration-200 hover:-translate-y-5' : 'pointer-events-none'} ${
        squeeze ? '-mr-32' : ''
      }`}
    >
      <img className='h-full' src={img} alt={code} />
    </button>
  );
};

export default Card;
