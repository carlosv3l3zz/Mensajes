import React, { useState } from "react";
import Tabs from "./Tabs";
import Info from "./Tabs/Info";
import type { InfoChatProps } from "@/lib/types/Chat";
//import Activity from "./Tabs/Activity";

const InfoChat: React.FC<InfoChatProps> = ({ selectedChat, isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("info");

  if (!selectedChat || !isVisible) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-negro border-l border-[#29292950]">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h3 className="poppins-17 font-semibold blanco">Información del contacto</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#b60000] rounded-full transition-colors"
        >
          <img
            src="/svg/mensajes/close.svg"
            alt="Cerrar"
            className="w-5"
          />
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-negro border-2 border-[#b60000] rounded-full flex items-center justify-center overflow-hidden">
              <span className="rojo !font-semibold poppins-26">
                {selectedChat.contactName.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            {/* Online indicator */}
            {selectedChat.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-verde border-4 border-white rounded-full"/>
            )}
          </div>
          
          <h2 className="poppins-17 blanco mb-1">
            {selectedChat.contactName}
          </h2>
          
          <div className="flex items-center space-x-2 py-2">
            <span className={`inline-block w-2 h-2 rounded-full ${selectedChat.isOnline ? 'bg-verde' : 'bg-gris-suave'}`}></span>
            <span className={`poppins-14 ${selectedChat.isOnline ? 'verde' : 'gris-suave'}`}>
              {selectedChat.isOnline ? 'En línea' : 'Desconectado'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "info" && (
          <Info selectedChat={selectedChat} />
        )}
        {activeTab === "activity" && (
          <div>{/* <Activity selectedChat={selectedChat} platformInfo={platformInfo} formatDate={formatDate}/> */}</div>
        )}
      </div>
    </div>
  );
};

export default InfoChat;
