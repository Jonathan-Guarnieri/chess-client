'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useApiCable from '@/hooks/useApiCable';

export default function MultiplayerConnection() {
  const KEEP_ALIVE_INTERVAL_MS = parseInt(process.env.NEXT_PUBLIC_KEEP_ALIVE_INTERVAL_MS, 10); 
  if (isNaN(KEEP_ALIVE_INTERVAL_MS) || KEEP_ALIVE_INTERVAL_MS <= 0) {
    console.error('Invalid KEEP_ALIVE_INTERVAL_MS:', process.env.NEXT_PUBLIC_KEEP_ALIVE_INTERVAL_MS);
    throw new Error('Invalid KEEP_ALIVE_INTERVAL_MS environment variable. Please set it to a positive integer.');
  }

  const router = useRouter();
  const { sendMessage } = useApiCable('MatchmakerChannel', callbackHandler);

  useEffect(() => {
    console.log('MultiplayerConnection mounted');
    const interval = setInterval(() => {
      console.log('Sending keep_alive');
      sendMessage({ action: 'keep_alive' });
    }, KEEP_ALIVE_INTERVAL_MS);

    return () => {
      console.log('MultiplayerConnection unmounted, clearing interval');
      clearInterval(interval);
    };
  }, [sendMessage]);

  function callbackHandler(data) {
    console.log('Received message from MatchmakerChannel:', data);
    if (data.action === 'match_found') {
      console.log('Match found! Redirecting to /game');
      router.push('/game');
    }
  }

  return null;
}
