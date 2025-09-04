import React, { useState } from "react";
import Tabs from "./Tabs";
import Info from "./Tabs/Info";
import type { InfoChatProps, PlatformInfo, Chat } from "@/lib/types/Chat";
//import Activity from "./Tabs/Activity";

const InfoChat: React.FC<InfoChatProps> = ({ selectedChat, isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("info");

  if (!selectedChat || !isVisible) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const getPlatformInfo = (platform: Chat["platform"]): PlatformInfo => {
    if (platform === "instagram") {
      return {
        name: "Instagram",
        color: "bg-gradient-to-r from-purple-500 to-pink-500",
        icon: <img src="/svg/mensajes/instagram.svg" alt="Instagram" className="w-3" />
      };
    } else if (platform === "messenger") {
      return {
        name: "Facebook",
        color: "bg-blue-500",
        icon: <img src="/svg/mensajes/facebook.svg" alt="Facebook" className="w-3.5" />
      };
    }
    return { name: "Desconocido", color: "bg-gray-500", icon: "?" };
  };

  const platformInfo = getPlatformInfo(selectedChat.platform);

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Información del contacto</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> </svg>
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-gray-600 font-medium text-xl">
                {selectedChat.contactName.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            {selectedChat.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {selectedChat.contactName}
          </h2>
          
          <div className="flex items-center space-x-2 mb-2">
            <span className={`inline-block w-2 h-2 rounded-full ${selectedChat.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            <span className="text-sm text-gray-500">
              {selectedChat.isOnline ? 'En línea' : 'Desconectado'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className={`w-5 h-5 ${platformInfo.color} rounded-full flex items-center justify-center`}>
              <span className="text-white text-xs font-bold">{platformInfo.icon}</span>
            </div>
            <span className="text-sm text-gray-600">{platformInfo.name}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "info" && (
          <Info selectedChat={selectedChat} platformInfo={platformInfo} formatDate={formatDate}/>
        )}
        {activeTab === "activity" && (
          <div>{/* <Activity selectedChat={selectedChat} platformInfo={platformInfo} formatDate={formatDate}/> */}</div>
        )}
      </div>
    </div>
  );
};

export default InfoChat;
