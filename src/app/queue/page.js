"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import useMultiplayerConnection from "@/hooks/useMultiplayerConnection";

export default function OnQueue() {
  const [seconds, setSeconds] = useState(0);
  const router = useRouter();
  const enqueuedRef = useRef(true);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleCancel = () => {
    enqueuedRef.current = false;
    router.push("/");
  };

  const handleGameStart = () => {
    enqueuedRef.current = false;
    router.push('/game');
    disconnect?.();
  }

  function callbackHandler(data) {
    console.log('Received message from MatchmakerChannel:', data);
    if (data.action === "match_found") {
      handleGameStart();
    } else if (data.action === "not_subscribed") {
      handleCancel();
    }
  };

  const { disconnect } = useMultiplayerConnection(callbackHandler);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
      <div className="w-[400px] bg-gray-800 rounded-xl p-8 flex flex-col items-center gap-6 shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <h1 className="text-white text-xl font-bold">Searching for opponent...</h1>
        </div>

        <div className="flex items-center gap-2 text-gray-300 text-lg font-mono">
          ⏱ {formatTime(seconds)}
        </div>

        <button
          onClick={handleCancel}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg"
        >
          Cancel and Return to Menu
        </button>
      </div>
    </div>
  );
}
