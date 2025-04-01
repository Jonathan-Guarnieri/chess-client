import React from 'react';

const Square = ({ name, index, size, onClick }) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const isDark = (row + col) % 2 !== 0;

  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`${isDark ? 'bg-gray-500' : 'bg-white'} relative`}
    >
      <span className="absolute bottom-1 left-1 text-xs text-black/50 pointer-events-none">
        {name}
      </span>
    </div>
  );
};

export default Square;