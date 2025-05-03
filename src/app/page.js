'use client';

import Board from "@/components/Board";
import Player from "@/components/Player";
import { useAuth } from "@/components/AuthWrapper";

export default function Home() {
  const { user } = useAuth();
  if (!user?.data?.attributes) return null;

  const playerBottom = user.data.attributes;
  const playerTop = {
    id: 2,
    email: 'opponent@email.com',
    nickname: 'opponent',
  };

  return (
    <main>
      <Player player={playerTop} />
      <Board />
      <Player player={playerBottom} />
    </main>
  );
}
