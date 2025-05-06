import { useRef } from 'react';
import useApiCable from '@/hooks/useApiCable';

export default function useMakeMove(gameId, setPieces) {
  const pieceRef = useRef({ from: null, to: null, pieceCode: null });
  const opts = { gameId }
  const { sendMessage } = useApiCable('GameChannel', callbackHandler, opts);

  function callbackHandler(data) {
    const { from, to, pieceCode } = pieceRef.current;

    if (data.valid) {
      setPieces((prev) => {
        const newBoard = { ...prev };
        delete newBoard[from];
        newBoard[to] = pieceCode;
        return newBoard;
      });
    };
  }

  function makeMove(from, to, pieceCode) {
    pieceRef.current = { from, to, pieceCode };
    sendMessage({ action: 'move', from, to, pieceCode });
  }

  return { makeMove };
}