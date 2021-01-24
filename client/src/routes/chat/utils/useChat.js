import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_ADDR = "http://localhost:4000";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_ADDR, {
      query: {
        roomId
      }
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id
      };
      setMessages((oldMessages) => [...oldMessages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
      setMessages([]);
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id
    });
  };
  return { messages, sendMessage };
};

export default useChat;
