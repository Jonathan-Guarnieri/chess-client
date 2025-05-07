'use client'

import MultiplayerButton from '@/components/MultiplayerButton';

export default function Menu() {

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <button className="bg-gray-500 text-white px-6 py-3 rounded shadow-md hover:bg-gray-600 transition-all duration-300 mb-4">
          Singleplayer
        </button>
        <MultiplayerButton />
      </div>
    </main>
  )
}
