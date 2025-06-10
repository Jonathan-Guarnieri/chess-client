'use client'

import { useRouter } from 'next/navigation';
import useApiCable from '@/hooks/useApiCable';

export default function MultiplayerConnection() {
  const router = useRouter();

  useApiCable('MatchmakerChannel', callbackHandler);

  function callbackHandler(data) {
    if (data.action === 'match_found') {
      router.push('/game');
    }
  }

  return null;
}