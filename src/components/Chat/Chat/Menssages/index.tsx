import React, { useState } from "react";
import { ButtonQR } from "./ButtonQR";
import PreviewAnswer from "./PreviewAnswer";
import AudioMessage from "./AudioMessage";
import { getFileIcon } from "@/lib/constants/FileIcons";
import type { MessagesProps } from "@/lib/types/Chat";

const Menssages: React.FC<MessagesProps> = ({
  messages,
  formatDate,
  formatTime,
  messagesEndRef,
  onReply,
}) => {
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null);
  const [quickReplyMessageId, setQuickReplyMessageId] = useState<number | null>(
    null
  );
  const [messageReactions, setMessageReactions] = useState<
    Record<number, string>
  >({});

  const handleReaction = (messageId: number, emoji: string): void => {
    setMessageReactions((prev) => {
      // Si ya existe la misma reacción, la quitamos
      if (prev[messageId] === emoji) {
        const newReactions = { ...prev };
        delete newReactions[messageId];
        return newReactions;
      }
      // Si no existe o es diferente, la agregamos/reemplazamos
      return {
        ...prev,
        [messageId]: emoji,
      };
    });
  };

  const downloadFile = (fileSrc: string, fileName: string): void => {
    const link = document.createElement("a");
    link.href = fileSrc;
    link.download = fileName;
    link.click();
  };

  const renderFileContent = (message: any): React.ReactElement => {
    const fileName = message.fileName || "";
    const extension = fileName.toLowerCase().split(".").pop() || "";
    const fileSrc = message.file
      ? URL.createObjectURL(message.file)
      : message.fileUrl;

    // Renderizar imagen
    if (
      ["jpg", "jpeg", "png", "gif", "webp"].includes(extension) ||
      (message.file && message.file.type.startsWith("image/"))
    ) {
      return (
        <div className="relative">
          <img
            src={fileSrc}
            alt={fileName}
            className="w-full max-w-xs rounded-lg object-cover cursor-pointer hover:opacity-80 transition-all duration-400 hover:scale-105 hover:shadow-lg hover:shadow-black hover:translate-y-[-1rem] hover:translate-x-[-1rem]"
            onClick={() => window.open(fileSrc, "_blank")}
          />
        </div>
      );
    }

    // Renderizar video
    if (
      ["mp4", "webm", "ogg", "avi"].includes(extension) ||
      (message.file && message.file.type.startsWith("video/")) ||
      message.type === "video"
    ) {
      return (
        <div className="relative">
          <video
            src={fileSrc}
            className="w-full max-w-xs rounded-lg"
            controls
            preload="metadata"
          />
        </div>
      );
    }

    // Renderizar audio
    if (
      ["mp3", "wav", "ogg"].includes(extension) ||
      (message.file && message.file.type.startsWith("audio/")) ||
      message.type === "audio"
    ) {
      return <AudioMessage message={message} />;
    }

    // Renderizar otros archivos
    return (
      <div className="flex justify-between items-center hover:bg-white/5 transition-colors duration-400 rounded-[5px] p-2 gap-4">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => window.open(fileSrc, "_blank")}
        >
          {getFileIcon(fileName)}
          <div>
            <p className="poppins-14 py-1 font-medium">{fileName}</p>
            <p className="inter-13 opacity-75">
              {message.fileSize
                ? (message.fileSize / 1024 / 1024).toFixed(2)
                : 0}{" "}
              MB
            </p>
          </div>
        </div>
        <button
          onClick={() => downloadFile(fileSrc, fileName)}
          className={`p-2 rounded-full transition-colors duration-400 ${
            message.senderId === "me" ? "bg-[#880808] hover:bg-[#88080890]" : "bg-[#131313] hover:bg-[#13131390]"
          }`}
        >
          <img src="/svg/mensajes/download.svg" className="w-5" />
        </button>
      </div>
    );
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
                <ButtonQR
                  message={message}
                  onReply={onReply}
                  handleReaction={handleReaction}
                  messageReactions={messageReactions}
                  setQuickReplyMessageId={setQuickReplyMessageId}
                  quickReplyMessageId={quickReplyMessageId}
                />
              )}

              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === "me"
                    ? "bg-gradient-to-r from-[#b6000090] to-[#b6000020] blanco"
                    : "bg-gradient-to-l from-[#f5f5f590] to-[#f5f5f520] blanco"
                }`}
              >
                {/* Preview de respuesta dentro del mensaje */}
                {message.replyTo && <PreviewAnswer message={message} />}

                {message.type === "audio" ? (
                  <div className="space-y-2">
                    <AudioMessage message={message} />
                    {/* Mostrar comentario adicional si existe y no es el texto por defecto */}
                    {message.message &&
                      message.message !== "Mensaje de voz" && (
                        <p className="poppins-14 py-1">{message.message}</p>
                      )}
                  </div>
                ) : (message.type === "file" || message.type === "video") &&
                  !message.replyTo ? (
                  <div className="space-y-2">
                    {/* Renderizar archivo según su tipo */}
                    {renderFileContent(message)}

                    {/* Mostrar comentario si existe */}
                    {message.message &&
                      message.message !== `Archivo: ${message.fileName}` && (
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
                    <div
                      className={`absolute backdrop-blur-sm bottom-0 flex items-center space-x-1 ml-2 px-1 py-0.5 rounded-full bg-gray-300/60 shadow-sm ${
                        message.senderId === "me"
                          ? "left-[-2.9rem]"
                          : "right-[-2.3rem]"
                      }`}
                    >
                      <span className="text-lg">
                        {messageReactions[message.id]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Botón de respuesta rápida si el mensaje no es del usuario */}
              {message.senderId !== "me" && hoveredMessage === message.id && (
                <ButtonQR
                  message={message}
                  onReply={onReply}
                  handleReaction={handleReaction}
                  messageReactions={messageReactions}
                  setQuickReplyMessageId={setQuickReplyMessageId}
                  quickReplyMessageId={quickReplyMessageId}
                />
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
