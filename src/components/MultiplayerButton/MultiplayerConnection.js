'use client'

import { useRouter } from 'next/navigation';
import useApiCable from '@/hooks/useApiCable';

export default function MultiplayerConnection() {
  alert('descobrir pq isso aqui ta carregando 2x')

  const router = useRouter();

  useApiCable('MatchmakerChannel', callbackHandler);

  function callbackHandler(data) {
    alert('passou aqui? pq deu match found no back....') // CONTINUAR DAQUI
    if (data.action === 'match_found') {
      router.push('/game');
    }
  }

  return null;
}