import React from 'react';

const Square = ({ name, index, size, onClick, children }) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  const isDark = (row + col) % 2 !== 0;

  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`${isDark ? 'bg-green-700' : 'bg-green-100'} relative`}
    >
      <span className="absolute bottom-1 left-1 text-xs text-black/50 pointer-events-none">
        {name}
      </span>
      {children}
    </div>
  );
};

export default Square;