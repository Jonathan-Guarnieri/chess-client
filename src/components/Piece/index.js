import React from 'react';
import Image from 'next/image';

const Piece = ({ pieceCode, size }) => {
  const pieceModel = "classic";

  return (
    <div className="absolute top-0 left-0">
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