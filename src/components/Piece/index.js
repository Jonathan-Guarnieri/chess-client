import React, { useEffect } from 'react';
import Image from 'next/image';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const Piece = ({ pieceCode, size, from }) => {
  const pieceModel = "classic";

  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: 'piece',
    item: { pieceCode, from },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: size,
        height: size,
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'grab',
        zIndex: 10,
      }}
      className="select-none"
    >
      <Image
        src={`/pieces/${pieceModel}/${pieceCode}.png`}
        alt={pieceCode}
        width={size}
        height={size}
        className="pointer-events-none select-none"
      />
    </div>
  );
};

export default Piece;