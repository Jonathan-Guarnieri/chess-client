'use client'

import { useRouter } from 'next/navigation';

export default function MultiplayerButton() {
  const router = useRouter();

  function handleClick() {
    router.push('/queue');
  }

  return (
    <>
      <button
        className="bg-gray-500 text-white px-6 py-3 rounded shadow-md hover:bg-gray-600 transition-all duration-300"
        onClick={handleClick}
      >
        Multiplayer
      </button>
    </>
  );
}