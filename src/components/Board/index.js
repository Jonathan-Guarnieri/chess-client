'use client';

import React, { useState } from 'react';
import Square from '../Square';
import Piece from '../Piece';

const Board = () => {
  const squareSizeInPixels = 80;
  const boardSizeInPixels = squareSizeInPixels * 8;

  const [pieces, setPieces] = useState({
    a1: 'wr', a2: 'wp', a7: 'bp', a8: 'br',
    b1: 'wn', b2: 'wp', b7: 'bp', b8: 'bn',
    c1: 'wb', c2: 'wp', c7: 'bp', c8: 'bb',
    d1: 'wq', d2: 'wp', d7: 'bp', d8: 'bq',
    e1: 'wk', e2: 'wp', e7: 'bp', e8: 'bk',
    f1: 'wb', f2: 'wp', f7: 'bp', f8: 'bb',
    g1: 'wn', g2: 'wp', g7: 'bp', g8: 'bn',
    h1: 'wr', h2: 'wp', h7: 'bp', h8: 'br',
  });

  const keyToSquareName = (index) => {
    const column = String.fromCharCode(97 + (index % 8));
    const row = 8 - Math.floor(index / 8);
    return `${column}${row}`;
  };

  const handleDrop = (from, to, pieceCode) => {
    setPieces((prev) => {
      const newBoard = { ...prev };
      delete newBoard[from];
      newBoard[to] = pieceCode;
      return newBoard;
    });
  };

  return (
    <div style={{ width: boardSizeInPixels, height: boardSizeInPixels }} className="grid grid-cols-8 grid-rows-8">
      {[...Array(64)].map((_, index) => {
        const squareName = keyToSquareName(index);
        const pieceCode = pieces[squareName];

        return (
          <Square
            key={squareName}
            name={squareName}
            index={index}
            size={squareSizeInPixels}
            onDropPiece={handleDrop}
          >
            {pieceCode && (
              <Piece
                pieceCode={pieceCode}
                size={squareSizeInPixels}
                from={squareName}
              />
            )}
          </Square>
        );
      })}
    </div>
  );
};

export default Board;