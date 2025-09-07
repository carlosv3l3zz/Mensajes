import React, { useState, useMemo } from "react";
import { chatsData } from "@/Data/messages";
import type { ListaChatProps } from "@/lib/types/Chat";

const ListaChat: React.FC<ListaChatProps> = ({
  selectedChatId,
  onSelectChat,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const formatTime = (timeString: string): string => {
    if (timeString.includes("AM") || timeString.includes("PM")) {
      return timeString;
    }
    return timeString;
  };

  // Filtrar chats basado en el término de búsqueda
  const filteredChats = useMemo(() => {
    if (!searchTerm.trim()) {
      return chatsData;
    }

    return chatsData.filter((chat) =>
      chat.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-full bg-negro border-r border-white">
      {/* Header */}
      <div className="p-4 border-b border-white">
        <h2 className="inter-20 font-semibold blanco">Mensajes</h2>
        <p className="text-sm blanco-suave mt-1">
          {filteredChats.length}{" "}
          {filteredChats.length === 1 ? "conversación" : "conversaciones"}
          {searchTerm && ` de ${chatsData.length} total`}
        </p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-white">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img
              src="/svg/mensajes/search.svg"
              alt="Buscar"
              className="w-5"
            />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar conversaciones..."
            className="w-full blanco pl-10 pr-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b60000] focus:border-transparent placeholder:text-[#f5f5f5]"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <img
              src="/svg/mensajes/search.svg"
              alt="Buscar"
              className="w-15"
            />
            <h3 className="poppins-17 font-medium blanco">
              No se encontraron conversaciones
            </h3>
            <p className="gris-suave poppins-14 pb-8 pt-4">
              {searchTerm
                ? `No hay conversaciones que coincidan con "${searchTerm}"`
                : "No tienes conversaciones aún"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="cursor-pointer rojo hover:text-[#880808] hover:underline poppins-14"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`p-4 border-b border-white cursor-pointer group hover:bg-red-50 transition-colors duration-500 ${
                selectedChatId === chat.id
                  ? "bg-gradient-to-r from-[#000000] to-[#b6000070] border-l-4 border-l-[#b60000]"
                  : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-negro rounded-full border border-[#b60000] flex items-center justify-center overflow-hidden">
                    <span className="rojo2 poppins-14 !font-semibold">
                      {chat.contactName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  {/* Online indicator */}
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-verde border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`poppins-14 font-semibold blanco truncate group-hover:!text-[#000] `}>
                      {chat.contactName}
                    </h3>
                    <span className="rojo2 poppins-13 flex-shrink-0">
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <p className="gris-suave poppins-14 truncate flex-1">
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="ml-2 bg-rojo blanco poppins-13 rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white bg-negro">
        <div className="flex items-center justify-between poppins-14 gris-suave">
          <span>
            {searchTerm
              ? `${filteredChats.length} de ${chatsData.length} chats`
              : `Total: ${chatsData.length} chats`}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-verde rounded-full"></div>
            <span>En línea</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaChat;
