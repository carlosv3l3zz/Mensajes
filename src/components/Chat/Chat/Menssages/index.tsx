import React, { useState } from "react";
import { ButtonQR } from "./ButtonQR";
import PreviewAnswer from "./PreviewAnswer";
import AudioMessage from "./AudioMessage";
import type { MessagesProps } from "@/lib/types/Chat";

const Menssages: React.FC<MessagesProps> = ({ messages, formatDate, formatTime, messagesEndRef, onReply }) => {
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null);
  const [quickReplyMessageId, setQuickReplyMessageId] = useState<number | null>(null);
  const [messageReactions, setMessageReactions] = useState<Record<number, string>>({});

  const handleReaction = (messageId: number, emoji: string): void => {
    setMessageReactions(prev => {
      // Si ya existe la misma reacción, la quitamos
      if (prev[messageId] === emoji) {
        const newReactions = { ...prev };
        delete newReactions[messageId];
        return newReactions;
      }
      // Si no existe o es diferente, la agregamos/reemplazamos
      return {
        ...prev,
        [messageId]: emoji
      };
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const showDate =
          index === 0 ||
          formatDate(message.timestamp) !==
            formatDate(messages[index - 1].timestamp);

        return (
          <div key={message.id}>
            {showDate && (
              <div className="flex justify-center mb-4">
                <span className="bg-gris blanco poppins-13 py-2 px-4 rounded-full">
                  {formatDate(message.timestamp)}
                </span>
              </div>
            )}

            <div
              className={`flex items-center group ${
                message.senderId === "me" ? "justify-end" : "justify-start"
              }`}
              onMouseEnter={() => setHoveredMessage(message.id)}
              onMouseLeave={() => setHoveredMessage(null)}
            >
              {/* Botón de respuesta rápida si el mensaje es del usuario */}
              {message.senderId === "me" && hoveredMessage === message.id && (
                <ButtonQR message={message} onReply={onReply} handleReaction={handleReaction} messageReactions={messageReactions} setQuickReplyMessageId={setQuickReplyMessageId} quickReplyMessageId={quickReplyMessageId} />
              )}
              
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === "me"
                      ? "bg-gradient-to-r from-[#b6000090] to-[#b6000010] blanco"
                      : "bg-gradient-to-l from-[#f5f5f590] to-[#f5f5f510] blanco"
                  }`}
                >
                  {/* Preview de respuesta dentro del mensaje */}
                   {message.replyTo && (
                    <PreviewAnswer message={message} />
                   )}
                  
                  {message.type === "audio" ? (
                    <div className="space-y-2">
                      <AudioMessage message={message} />
                      {/* Mostrar comentario adicional si existe y no es el texto por defecto */}
                      {message.message && message.message !== "Mensaje de voz" && (
                        <p className="poppins-14 py-1">{message.message}</p>
                      )}
                    </div>
                  ) : message.type === "file" && !message.replyTo ? (
                    <div className="space-y-2">
                      {/* Renderizar archivo según su tipo */}
                      {message.file && message.file.type.startsWith('image/') ? (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(message.file)}
                            alt={message.fileName}
                            className="w-full max-w-xs rounded-lg object-cover"
                          />
                        </div>
                      ) : message.file && message.file.type.startsWith('video/') ? (
                        <div className="relative">
                          <video
                            src={URL.createObjectURL(message.file)}
                            className="w-full max-w-xs rounded-lg"
                            controls
                          />
                        </div>
                      ) : message.file && message.file.type.startsWith('audio/') ? (
                        <AudioMessage message={message} />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                          <div>
                            <p className="poppins-14 py-1 font-medium">{message.fileName}</p>
                            <p className="inter-13 opacity-75">
                              {message.fileSize ? (message.fileSize / 1024).toFixed(1) : 0} KB
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Mostrar comentario si existe */}
                      {message.message && message.message !== `Archivo: ${message.fileName}` && (
                        <p className="poppins-14 py-1">{message.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="poppins-14 py-1">{message.message}</p>
                  )}
                <div className="relative flex items-center justify-between mt-1">
                  {/* Hora del mensaje */}
                  <p
                    className={`poppins-13 py-1 ${
                      message.senderId === "me"
                        ? "text-red-200"
                        : "text-[#f5f5f580]"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                  
                  {/* Reacción del mensaje */}
                  {messageReactions[message.id] && (
                    <div className={`absolute backdrop-blur-sm bottom-0 flex items-center space-x-1 ml-2 px-1 py-0.5 rounded-full bg-gray-300/60 shadow-sm ${message.senderId === "me" ? "left-[-2.9rem]" : "right-[-2.3rem]"}`}>
                      <span className="text-lg">{messageReactions[message.id]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Botón de respuesta rápida si el mensaje no es del usuario */}
              {message.senderId !== "me" && hoveredMessage === message.id && (
                <ButtonQR message={message} onReply={onReply} handleReaction={handleReaction} messageReactions={messageReactions} setQuickReplyMessageId={setQuickReplyMessageId} quickReplyMessageId={quickReplyMessageId} />
              )}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Menssages;
