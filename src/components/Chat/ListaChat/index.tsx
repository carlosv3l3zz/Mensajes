import React, { useState, useMemo } from "react";
import { chatsData } from "@/Data/messages";
import type { ListaChatProps } from "@/lib/types/Chat";

const ListaChat: React.FC<ListaChatProps> = ({ selectedChatId, onSelectChat }) => {
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
    
    return chatsData.filter(chat =>
      chat.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);


  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="inter-20 font-semibold text-gray-800">Mensajes</h2>
        <p className="text-sm text-gray-500 mt-1">
          {filteredChats.length} {filteredChats.length === 1 ? 'conversación' : 'conversaciones'}
          {searchTerm && ` de ${chatsData.length} total`}
        </p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar conversaciones..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b60000] focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron conversaciones</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `No hay conversaciones que coincidan con "${searchTerm}"`
                : "No tienes conversaciones aún"
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 rojo hover:text-[#880808] text-sm font-medium"
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
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChatId === chat.id ? "bg-red-50 border-l-4 border-l-[#b60000]" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-gray-600 font-medium text-sm">
                    {chat.contactName.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                {/* Online indicator */}
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-verde border-2 border-white rounded-full"/>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {chat.contactName}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatTime(chat.lastMessageTime)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 bg-rojo blanco text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
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
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {searchTerm 
              ? `${filteredChats.length} de ${chatsData.length} chats`
              : `Total: ${chatsData.length} chats`
            }
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
