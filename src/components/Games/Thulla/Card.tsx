import { useState } from 'react';

const Card = ({ img, onClick, code, squeeze, styles }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      style={styles}
      className={`transition duration-200 hover:-translate-y-5 ${squeeze ? '-mr-32' : ''}`}
    >
      <img className='h-full' src={img} alt={code} />
    </button>
  );
};

export default Card;
