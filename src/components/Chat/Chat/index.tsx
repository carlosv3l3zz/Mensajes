import React, { useState, useRef, useEffect, type RefObject } from "react";
import Menssages from "./Menssages";
import Header from "./Header";
import Emojis from "./Inputs/Emonjis";
import Files from "./Inputs/Files";
import Textarea from "./Inputs/Textarea";
import PreviewAnswer from "./PreviewAnswer";
import PreviewFile from "./PreviewFile";
import AudioRecorder from "./Inputs/AudioRecorder";
import { motion } from "framer-motion";
import type { ChatProps, Message } from "@/lib/types/Chat";

interface EmojiObject {
  emoji: string;
  [key: string]: any;
}

const Chat: React.FC<ChatProps> = ({ selectedChat, onToggleInfo }) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [fileComment, setFileComment] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(
    selectedChat?.messages || []
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [fileToSend, setFileToSend] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Si estamos respondiendo a un archivo, crear un mensaje que incluya el archivo
    if (replyTo && replyTo.type === "file" && replyTo.file) {
      const message: Message = {
        id: messages.length + 1,
        senderId: "me",
        senderName: "Yo",
        message: newMessage,
        timestamp: new Date().toISOString(),
        type: "file",
        fileName: replyTo.fileName,
        fileSize: replyTo.fileSize,
        file: replyTo.file,
        replyTo: {
          id: replyTo.id,
          senderName:
            replyTo.senderName ||
            (replyTo.senderId === "me"
              ? "Tú"
              : replyTo.senderName || "Contacto"),
          message: replyTo.message,
        },
      };

      setMessages([...messages, message]);
      setNewMessage("");
      setReplyTo(null);
    } else {
      // Mensaje de texto normal
      const message: Message = {
        id: messages.length + 1,
        senderId: "me",
        senderName: "Yo",
        message: newMessage,
        timestamp: new Date().toISOString(),
        type: "text",
        replyTo: replyTo
          ? {
              id: replyTo.id,
              senderName:
                replyTo.senderName ||
                (replyTo.senderId === "me"
                  ? "Tú"
                  : replyTo.senderName || "Contacto"),
              message: replyTo.message,
            }
          : undefined,
      };

      setMessages([...messages, message]);
      setNewMessage("");
      setReplyTo(null);
    }
  };

  const handleEmojiPickerReaction = (emojiObject: EmojiObject): void => {
    console.log(`Reacción ${emojiObject.emoji} para mensaje:`, newMessage);
    setNewMessage(newMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFileToSend(file);
    }
    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    e.target.value = "";
  };

  const handleSendFile = (): void => {
    if (fileToSend) {
      const message: Message = {
        id: messages.length + 1,
        senderId: "me",
        senderName: "Yo",
        message: fileComment.trim() || `Archivo: ${fileToSend.name}`,
        timestamp: new Date().toISOString(),
        type: "file",
        fileName: fileToSend.name,
        fileSize: fileToSend.size,
        file: fileToSend,
      };

      setMessages([...messages, message]);
      setFileToSend(null);
      setFileComment("");
    }
  };

  const handleCancelFile = (): void => {
    setFileToSend(null);
    setFileComment("");
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer";
    } else {
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      });
    }
  };

  const handleStartRecording = (): void => {
    setIsRecording(true);
  };

  const handleSendAudio = (audioBlob: Blob): void => {
    console.log("Chat: Received audio blob for message creation:", audioBlob);

    // Obtener la duración del blob si está disponible
    const audioDuration = (audioBlob as any).duration || 0;
    console.log("Chat: Audio duration from blob:", audioDuration);

    const message: Message = {
      id: messages.length + 1,
      senderId: "me",
      senderName: "Yo",
      message: "Mensaje de voz",
      timestamp: new Date().toISOString(),
      type: "audio",
      fileName: `audio_${Date.now()}.webm`,
      fileSize: audioBlob.size,
      file: audioBlob,
      replyTo: replyTo
        ? {
            id: replyTo.id,
            senderName:
              replyTo.senderName ||
              (replyTo.senderId === "me"
                ? "Tú"
                : replyTo.senderName || "Contacto"),
            message: replyTo.message,
          }
        : undefined,
    };

    // Agregar la duración como propiedad personalizada del mensaje
    if (audioDuration > 0) {
      (message as any).audioDuration = audioDuration;
    }

    console.log("Chat: Created audio message:", message);
    setMessages([...messages, message]);
    setIsRecording(false);
    setReplyTo(null);
  };

  const handleCancelRecording = (): void => {
    setIsRecording(false);
  };

  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-negro w-full">
        <div className="text-center justify-center flex flex-col items-center">
          <div className="w-24 h-24 bg-negro border-3 border-[#b60000] rounded-full flex items-center justify-center">
            <img
              src="/svg/mensajes/menssage.svg"
              alt="Mensaje"
              className="w-12 h-12"
            />
          </div>
          <h3 className="poppins-17 font-medium rojo pt-6 pb-2">
            Selecciona una conversación
          </h3>
          <p className="gris-suave poppins-14">
            Elige un chat de la lista para comenzar a conversar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-negro">
      {/* Header */}
      <Header selectedChat={selectedChat} onToggleInfo={onToggleInfo} />

      {/* Mensajes */}
      <Menssages
        messages={messages}
        formatDate={formatDate}
        formatTime={formatTime}
        messagesEndRef={messagesEndRef as RefObject<HTMLDivElement>}
        onReply={setReplyTo}
      />

      {/* overlay para cerrar el emoji picker */}
      {showEmojiPicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowEmojiPicker(false)}
        />
      )}

      {/* Preview de respuesta */}
      {replyTo && <PreviewAnswer replyTo={replyTo} setReplyTo={setReplyTo} />}

      {/* Preview de archivo */}
      {fileToSend && (
        <PreviewFile
          file={fileToSend}
          onCancel={handleCancelFile}
          onSend={handleSendFile}
          fileComment={fileComment}
          setFileComment={setFileComment}
        />
      )}

      {/* Inputs y botones */}
      <div className="p-4 border-t border-[#29292950] bg-negro">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2 relative"
        >
          {isRecording ? (
            <div className="flex items-center w-full justify-end">
              <AudioRecorder
                onSendAudio={handleSendAudio}
                onCancel={handleCancelRecording}
              />
            </div>
          ) : (
            <>
              {/* Botón de emojis */}
              <Emojis
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                handleEmojiPickerReaction={handleEmojiPickerReaction}
              />

              {/* Input de archivo */}
              <Files
                fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
                handleFileUpload={handleFileUpload}
              />

              {/* Input de mensaje */}
              <Textarea
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
              />
            </>
          )}

          {/* Botón de enviar */}
          {newMessage.trim() ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              type="submit"
              className="p-2 bg-rojo text-white rounded-full hover:bg-[#880808] transition-colors"
            >
              <motion.svg
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />{" "}
              </motion.svg>
            </motion.button>
          ) : (
            !isRecording && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="p-2 bg-rojo text-white rounded-full hover:bg-[#880808] transition-colors"
                onClick={handleStartRecording}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />{" "}
                </svg>
              </motion.button>
            )
          )}
        </form>
      </div>
    </div>
  );
};

export { Chat };
export default Chat;
