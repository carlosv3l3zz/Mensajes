import React, { useRef, useEffect } from "react";
import type { Message } from "@/lib/types/Messages";
import { availableUsers } from "../Data/index";

interface MessagesProps {
  messages: Message[];
  onReply: (message: Message) => void;
}

const Messages: React.FC<MessagesProps> = ({ messages, onReply }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " - " +
      date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const renderMessageContent = (message: Message) => {
    let content = message.message;

    // Renderizar menciones usando la lista de usuarios disponibles
    if (message.mentions && message.mentions.length > 0) {
      // Crear un mapa de IDs a nombres para las menciones
      const mentionedUserNames: string[] = [];
      message.mentions.forEach(userId => {
        const user = availableUsers.find(u => u.id === userId);
        if (user) {
          mentionedUserNames.push(user.name);
        }
      });
      
      // Reemplazar cada nombre mencionado
      mentionedUserNames.forEach((userName) => {
        const escapedName = userName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const mentionRegex = new RegExp(`@${escapedName}(?=\\s|$)`, 'g');
        content = content.replace(
          mentionRegex,
          `<span class="text-blue-600 font-medium bg-blue-50 px-1 rounded">@${userName}</span>`
        );
      });
    }

    return content;
  };

  return (
    <div className="flex flex-col gap-4 min-h-[calc(100vh-18rem)] overflow-y-auto max-h-[calc(100vh-400px)] ">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col gap-2 px-8 py-4">
          {/* Cabecera del mensaje */}
          <div className="flex items-center px-4">
            <div className="flex items-center gap-2">
              <p
                className={`poppins-14 !font-medium flex items-center gap-2 ${
                  message.senderName === "Yo" ? "azul-principal" : "morado"
                }`}
              >
                {message.senderName}
                <span className="poppins-14 negro !font-medium">
                  {formatTime(message.timestamp)}
                </span>
              </p>
            </div>
          </div>

          {/* Contenido del mensaje */}
          <div className="flex flex-col justify-center bg-gris-claro rounded-[5px] w-full">
            {/* Respuesta a mensaje anterior */}
            {message.replyTo && (
              <div className="flex items-start px-4 mt-2 w-full">
                <div
                  className={`bg-gray-200/50 rounded-lg p-3 border-l-4  w-full ${
                    message.replyTo.senderName === "Yo"
                      ? "border-[#0098D6]"
                      : "border-[#5B66AD]"
                  }`}
                >
                  <p className="poppins-13 text-gray-600 !font-semibold pb-1">
                    Respondiendo a {message.replyTo.senderName}
                  </p>
                  <p className="poppins-10 !font-medium text-gray-800 truncate">
                    {message.replyTo.message}
                  </p>
                </div>
              </div>
            )}
            <div
              className="poppins-14 gris-oscuro-3 !font-medium px-4 pt-4 pb-6 border-b border-[#9E9E9E] w-full"
              dangerouslySetInnerHTML={{
                __html: renderMessageContent(message),
              }}
            />
            {/* botón para responder a un mensaje */}
            <button
              onClick={() => onReply(message)}
              className="bg-gris-claro rounded-[5px] px-4 py-1.5 justify-end hover:bg-gray-200 transition-colors poppins-10 negro !font-medium"
            >
              <img src="/svg/detailTasks/response.svg" className="cursor-pointer hover:opacity-70 transition-opacity w-6" />
              Responder
            </button>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
