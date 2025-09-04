import React, { useState, useRef } from "react";
import Messages from "./Messages";
import AnswerPreview from "./AnswerPreview";
import MentionDropdown from "./MentionDropdown";
import type { Message, User } from "@/lib/types/Messages";
import { initialMessages, availableUsers, currentUser } from "./Data/index";
import {
  detectActiveMention,
  insertMention,
  addMentionSymbol,
  type MentionState,
} from "@/lib/utils/mention";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { createMessage } from "@/lib/utils/message";
import InputMessages from "@/components/UI/InputMessages";

const Activity: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionSearchTerm, setMentionSearchTerm] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([]);
  const [activeMention, setActiveMention] = useState<MentionState | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = createMessage({
      id: messages.length + 1,
      currentUser,
      message: newMessage,
      replyTo,
      mentionedUsers,
    });

    setMessages([...messages, message]);
    setNewMessage("");
    setReplyTo(null);
    setMentionedUsers([]);
    setShowMentionDropdown(false);
    setActiveMention(null);
    setMentionSearchTerm("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart || 0;

    setNewMessage(value);
    setCursorPosition(cursorPos);

    // Usar la utilidad para detectar menciones
    const mentionState = detectActiveMention(value, cursorPos);

    if (mentionState) {
      setActiveMention(mentionState);
      setMentionSearchTerm(mentionState.searchTerm);
      setShowMentionDropdown(true);
    } else {
      setShowMentionDropdown(false);
      setActiveMention(null);
    }
  };

  const handleSelectUser = (user: User) => {
    if (!activeMention) {
      return;
    }

    const input = inputRef.current;
    if (!input) {
      return;
    }

    // Usar la utilidad para insertar la mención
    const { newText, newCursorPosition } = insertMention(
      newMessage,
      activeMention,
      user.name,
      cursorPosition
    );

    // Actualizar el input directamente primero
    input.value = newText;

    // Luego actualizar el estado
    setNewMessage(newText);

    // Limpiar estados de mención
    setShowMentionDropdown(false);
    setMentionSearchTerm("");
    setActiveMention(null);

    // Agregar usuario a la lista de mencionados
    const newMentionedUsers = mentionedUsers.includes(user.id)
      ? mentionedUsers
      : [...mentionedUsers, user.id];
    setMentionedUsers(newMentionedUsers);

    // Enfocar input y posicionar cursor
    setTimeout(() => {
      if (input) {
        input.focus();
        input.setSelectionRange(newCursorPosition, newCursorPosition);
        setCursorPosition(newCursorPosition);
      }
    }, 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMentionClick = () => {
    // Usar la utilidad para agregar el símbolo @
    const { newText, newCursorPosition, mentionState } =
      addMentionSymbol(newMessage);

    setNewMessage(newText);
    setShowMentionDropdown(true);
    setMentionSearchTerm("");
    setActiveMention(mentionState);

    if (inputRef.current) {
      inputRef.current.focus();
      // Posicionar cursor después del @
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(
            newCursorPosition,
            newCursorPosition
          );
        }
      }, 0);
    }
  };

  // Usar el hook para manejar clicks fuera del dropdown
  useClickOutside(
    showMentionDropdown,
    () => {
      setShowMentionDropdown(false);
      setActiveMention(null);
      setMentionSearchTerm("");
    },
    [
      ".absolute.z-50", // dropdown
      'input[type="text"]', // input
    ]
  );

  return (
    <div>
      <h1 className="poppins-26 azul-principal px-8 py-6 flex items-center gap-2">
        Actividad <img src="/svg/detailTasks/actividad.svg" alt="activity" />
      </h1>

      {/* Lista de mensajes */}
      <Messages messages={messages} onReply={setReplyTo} />

      {/* Preview de respuesta */}
      {replyTo && (
        <AnswerPreview replyTo={replyTo} onCancel={() => setReplyTo(null)} />
      )}

      {/* Input para responder */}
      <div className="flex items-center justify-center w-full px-8 py-4 h-full">
        <div className="flex items-center justify-center w-full border-2 border-[#0098D6] rounded-[5px] px-2 py-1 gap-3 relative">
          
          {/* Input para escribir un mensaje */}
          <InputMessages
            inputRef={inputRef}
            newMessage={newMessage}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            placeholder="Escribe un comentario..."
            type="text"
          />
          {/* Botón para taggear a alguien */}
          <button
            className="cursor-pointer hover:opacity-70 transition-opacity w-6"
            onClick={handleMentionClick}
          >
            <img src="/svg/detailTasks/arroba.svg" className="cursor-pointer hover:opacity-70 transition-opacity w-6" />
          </button>


          {/* Botón para enviar un mensaje */}
          <button
            className="bg-azul-principal rounded-[5px] px-4 py-1 hover:opacity-90 transition-opacity poppins-17 blanco !font-medium"
            onClick={handleSendMessage}
          >
            <img src="/svg/detailTasks/send.svg" className="cursor-pointer hover:opacity-70 transition-opacity w-6" />
            Enviar
          </button>

          {/* Select de menciones */}
          {showMentionDropdown && (
            <MentionDropdown
              users={availableUsers}
              searchTerm={mentionSearchTerm}
              onSelectUser={handleSelectUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
