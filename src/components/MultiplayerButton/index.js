'use client'

import { useState } from 'react';
import MultiplayerConnection from './MultiplayerConnection';

export default function MultiplayerButton() {
  const [connecting, setConnecting] = useState(false)

  function handleClick() {
    setConnecting(true);
  }

  return (
    <>
      <button
        className="bg-gray-500 text-white px-6 py-3 rounded shadow-md hover:bg-gray-600 transition-all duration-300"
        onClick={handleClick}
      >
        Multiplayer
      </button>
      {connecting && <MultiplayerConnection />}
    </>
  );
}