import React from "react";
import type { HeaderProps, Chat } from "@/lib/types/Chat";

const Header: React.FC<HeaderProps> = ({ selectedChat, onToggleInfo }) => {
  const getPlatformColor = (platform: Chat["platform"]): string => {
    return platform === "instagram" 
      ? "bg-gradient-to-r from-purple-500 to-pink-500" 
      : "bg-blue-500";
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-gray-600 font-medium text-sm">
              {selectedChat.contactName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {selectedChat.contactName}
          </h3>
          <div className="flex items-center space-x-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                selectedChat.isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
            <span className="text-sm text-gray-500">
              {selectedChat.isOnline ? "En línea" : "Desconectado"}
            </span>
            <div
              className={`w-4 h-4 ${getPlatformColor(
                selectedChat.platform
              )} rounded-full flex items-center justify-center ml-2`}
            >
              <span className="text-white text-xs font-bold">
                {selectedChat.platform === "instagram" ? (
                  <img
                    src="/svg/mensajes/instagram.svg"
                    alt="Instagram"
                    className="w-3"
                  />
                ) : (
                  <img
                    src="/svg/mensajes/facebook.svg"
                    alt="Facebook"
                    className="w-3.5"
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleInfo}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />{" "}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
