import { useEffect, useRef } from 'react';
import { createConsumer } from "@rails/actioncable";

export default function useApiCable(channel, onMessageReceived, opts=null) {
  const cableRef = useRef(null);
  const subscriptionRef = useRef(null);
  const callbackRef = useRef(onMessageReceived);

  useEffect(() => {
    callbackRef.current = onMessageReceived;
  }, [onMessageReceived]);

  useEffect(() => {
    cableRef.current = createConsumer(`${process.env.NEXT_PUBLIC_SOCKET_URL}/cable`);

    subscriptionRef.current = cableRef.current.subscriptions.create(
      {
        channel: channel,
        opts: opts
      },
      {
        connected() {
          console.log(`Connected to the channel: ${channel} with opts: ${JSON.stringify(opts, null, 2)}`);
        },
        disconnected() {
          console.log(`Disconnected from the channel: ${channel}`);
        },
        received(data) {
          onMessageReceived(data);
        }
      }
    );

    return () => {
      subscriptionRef.current?.unsubscribe();
      cableRef.current?.disconnect();
    };
  }, [channel, opts]);

  const sendMessage = (message) => {
    if (subscriptionRef.current) {
      subscriptionRef.current.send(message);
    } else {
      console.error('Subscription is not ready yet.');
    }
  };

  return { sendMessage };
}