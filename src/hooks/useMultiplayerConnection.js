import { useEffect, useRef } from 'react';
import useApiCable from '@/hooks/useApiCable';

/**
 * Custom hook for managing multiplayer WebSocket connection
 * - Maintains stable connection across re-renders
 * - Handles keep-alive heartbeat
 * - Implements proper cleanup
 */
export default function useMultiplayerConnection(callbackHandler) {
  // Refs for stable references across re-renders
  const enqueuedRef = useRef(false);
  const subscriptionRef = useRef(null);
  const keepAliveIntervalRef = useRef(null);

  // Validate and parse keep-alive interval
  const KEEP_ALIVE_INTERVAL_MS = parseInt(
    process.env.NEXT_PUBLIC_KEEP_ALIVE_INTERVAL_MS || '30000', 10
  );
  if (isNaN(KEEP_ALIVE_INTERVAL_MS) || KEEP_ALIVE_INTERVAL_MS <= 0) {
    throw new Error('Invalid KEEP_ALIVE_INTERVAL_MS environment variable. Please set it to a positive integer.');
  }

  // Initialize WebSocket connection
  const { sendMessage, unsubscribe } = useApiCable('MatchmakerChannel', (data) => {
    callbackHandler(data);
  });

  useEffect(() => {
    console.log('[useMultiplayerConnection] Setting up connection');
    enqueuedRef.current = true;
    subscriptionRef.current = sendMessage; // Store stable reference

    // Setup heartbeat interval
    keepAliveIntervalRef.current = setInterval(() => {
      if (enqueuedRef.current) {
        console.log('[useMultiplayerConnection] Sending keep-alive');
        subscriptionRef.current({ action: 'keep_alive' });
      }
    }, KEEP_ALIVE_INTERVAL_MS);

    // Cleanup function when component unmounts
    return () => {
      console.log('[useMultiplayerConnection] Cleaning up resources');
      enqueuedRef.current = false;
      
      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current);
      }
    };
  }, []); // Empty dependency array = runs once on mount

  const disconnect = () => {
    enqueuedRef.current = false;
    clearInterval(keepAliveIntervalRef.current);
    unsubscribe?.();
    console.log('[useMultiplayerConnection] Disconnected');
  };

  return { disconnect };
}
