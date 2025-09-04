import { useEffect, useRef } from "react";
import { getSocket } from "@/settings/socket";

type MessageHandler = (data: object) => void;

const useSocket = (onMessage: MessageHandler): void => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [onMessage]);
};

export default useSocket;
