import React from "react";
import type { MessagePreviewAnswerProps } from "@/lib/types/Chat";

const PreviewAnswer: React.FC<MessagePreviewAnswerProps> = ({ message }) => {
  return (
    <div
      className={`mb-2 px-2 py-2.5 border-l-4 rounded-lg bg-gray-500/20 cursor-pointer ${
        message.replyTo?.senderName === "Yo"
          ? "border-green-400"
          : "border-blue-300"
      } pl-2`}
    >
      {/* Nombre del usuario que respondió */}
      <p
        className={`inter-13 font-medium  ${
          message.replyTo?.senderName === "Yo"
            ? "text-green-400"
            : "text-blue-200"
        }`}
      >
        {message.replyTo?.senderName}
      </p>
      {/* Mensaje de la respuesta */}
      <p className={`inter-13 line-clamp-1 blanco text-center`}>
        {message.replyTo?.message}
      </p>
      {message.type === "file" ? (
        <div className="space-y-2">
          {/* Renderizar archivo según su tipo */}
          {message.file && message.file.type.startsWith("image/") ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(message.file)}
                alt={message.fileName}
                className="h-[3rem] py-2 max-w-xs rounded-lg object-cover"
              />
            </div>
          ) : message.file && message.file.type.startsWith("video/") ? (
            <div className="relative">
              <video
                src={URL.createObjectURL(message.file)}
                className="h-[3rem] py-2 max-w-xs rounded-lg"
                controls
              />
            </div>
          ) : message.file && message.file.type.startsWith("audio/") ? (
            <div className="relative">
              <audio
                src={URL.createObjectURL(message.file)}
                className="h-[3rem] py-2 max-w-xs"
                controls
              />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <div>
                <p className="text-sm font-medium">{message.fileName}</p>
                <p className="inter-13 opacity-75">
                  {message.fileSize ? (message.fileSize / 1024).toFixed(1) : 0} KB
                </p>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PreviewAnswer;
