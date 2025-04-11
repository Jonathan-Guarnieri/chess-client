import React from 'react';
import { useDrop } from 'react-dnd';

const Square = ({ name, index, size, onClick, onDropPiece, children, sendMove }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'piece',
    drop: (item) => {
      onDropPiece(item.from, name, item.pieceCode);
      const from = item.from;
      const to = name;
      sendMove(from, to);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const row = Math.floor(index / 8);
  const col = index % 8;
  const isDark = (row + col) % 2 !== 0;

  return (
    <div
      ref={dropRef}
      onClick={onClick}
      style={{ width: size, height: size, backgroundColor: `${isDark ? '#769656' : '#eeeed2'}` }}
      className={`relative`}
    >
      <span className="absolute bottom-1 left-1 text-xs text-black/50 pointer-events-none">
        {name}
      </span>
      {children}
    </div>
  );
};

export default Square;