import { useEffect, useRef } from 'react';
import { createConsumer } from "@rails/actioncable";

/**
 * Hook que conecta ao ActionCable e permite enviar movimentos de xadrez.
 * @param {Function} onMoveResult - Callback chamado com `true` ou `false` após resposta do backend.
 */
export default function useApiCable(onMoveResult) {
  const cableRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    // Conecta ao ActionCable no endpoint padrão Rails
    cableRef.current = createConsumer('ws://localhost:3000/cable');

    // Cria a subscription ao canal "ChessChannel"
    subscriptionRef.current = cableRef.current.subscriptions.create(
      { channel: 'GameChannel' },
      {
        received: (data) => {
          alert(`📩 Mensagem recebida: ${JSON.stringify(data)}`);
          if (data.action === 'move_validator_result') {
            onMoveResult(data.valid);
          }
        },
        connected() {
          alert('♟️ Conectado ao canal de xadrez');
        },
        disconnected() {
          alert('🔌 Desconectado do canal de xadrez');
        }
      }
    );

    // Limpa a conexão ao desmontar o componente
    return () => {
      subscriptionRef.current?.unsubscribe();
      cableRef.current?.disconnect();
    };
  }, []);

  const sendMove = (from, to) => {
    subscriptionRef.current?.send({
      action: 'move',
      from,
      to
    });
  };

  return { sendMove };
}