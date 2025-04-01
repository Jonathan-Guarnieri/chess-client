'use client';

import React from 'react';
import Square from '../Square';

const Board = () => {
  const squareSizeInPixels = 80;
  const boardSizeInPixels = squareSizeInPixels * 8;

  const keyToSquareName = (index) => {
    const column = String.fromCharCode(97 + (index % 8));
    const row = 8 - Math.floor(index / 8);
    return `${column}${row}`;
  };

  const handleSquareClick = (index) => {
    const square = keyToSquareName(index);
    alert(square);
  };

  return (
    <div style={{ width: boardSizeInPixels, height: boardSizeInPixels }} className="grid grid-cols-8 grid-rows-8">
      {[...Array(64)].map((_, index) => {
        const squareName = keyToSquareName(index);
        return (
          <Square
            key={squareName}
            name={squareName}
            index={index}
            size={squareSizeInPixels}
            onClick={() => handleSquareClick(index)}
          />
        );
      })}
    </div>
  );
};

export default Board;