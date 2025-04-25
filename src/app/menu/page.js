'use client'

import { useRouter } from 'next/navigation';

export default function Menu() {
  const router = useRouter();

  function startMultiplayerGame () {
    // Join on matchmaking
    alert('Searching for an oponent...');
    // TODO: implement matchmaking logic

    // Redirect to game page when ready to play
    alert('Oponent found! Click OK to start the game');
    router.push('/');
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <button className="bg-gray-500 text-white px-6 py-3 rounded shadow-md hover:bg-gray-600 transition-all duration-300 mb-4">
          Singleplayer
        </button>
        <button
          className="bg-gray-500 text-white px-6 py-3 rounded shadow-md hover:bg-gray-600 transition-all duration-300"
          onClick={startMultiplayerGame}
        >
          Multiplayer
        </button>
      </div>
    </main>
  )
}
