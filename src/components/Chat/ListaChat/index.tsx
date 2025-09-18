import React, { useState, useMemo } from "react";
import { chatsData } from "@/Data/messages";
import type { ListaChatProps } from "@/lib/types/Chat";
import AudioMessage from "../Chat/Menssages/AudioMessage"
import { motion } from "framer-motion"

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
    <div className="flex flex-col h-full border-r border-[#29292950] relative">
      {/* Header */}
      <div className="p-4">
        <h2 className="inter-20 font-semibold blanco">Mensajes</h2>
        <p className="text-sm blanco-suave mt-1">
          {filteredChats.length}{" "}
          {filteredChats.length === 1 ? "conversación" : "conversaciones"}
          {searchTerm && ` de ${chatsData.length} total`}
        </p>
      </div>

      {/* Search */}
      <div className="p-4">
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
            className="w-full blanco pl-10 pr-4 py-2 rounded-lg outline-none ring-2 ring-[#b60000] border-transparent placeholder:text-[#f5f5f5]"
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
              className={`p-4 cursor-pointer group hover:bg-red-50 transition-colors duration-500 ${
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
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-verde rounded-full" />
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
      {/* Audio Message solo cuando se estaba escuchando un audio y se cierra el chat*/}
      {selectedChatId !== chatsData[4].id && chatsData[4].messages[9] &&
        <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.9 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        exit={{ opacity: 0, y: 10, scale: 0.9 }} 
        transition={{ duration: 0.4 }} 
        className="p-4 rounded-lg absolute border-2 border-[#880808] bottom-[6%] left-4 right-4 z-10">
          <div className="flex items-center justify-between pb-3">
            <p className="poppins-14 blanco">{chatsData[4].messages[9].senderName}</p>
            <p className="poppins-14 blanco hover:!text-[#000] cursor-pointer rounded-full hover:bg-[#880808] px-1 py-0.5 transition-all duration-400">x</p>
          </div>
          <AudioMessage message={chatsData[4].messages[9]} />
          <div className="bg-[#88080815] border-[2px] border-[#880808] blur-xs p-4 rounded-lg absolute bottom-[6%] left-1 right-1 top-1 -z-1"/>
        </motion.div>
      }

      {/* Footer */}
      <div className="p-4 border-t border-[#29292950]">
        <div className="flex items-center justify-between poppins-14 gris-suave">
          <span>
            {searchTerm
              ? `${filteredChats.length} de ${chatsData.length} chats`
              : `Total: ${chatsData.length} chats`}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-verde rounded-full"></div>
            <span className="verde">Estas en línea</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaChat;
