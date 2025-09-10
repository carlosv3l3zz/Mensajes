import React from "react";
import type { HeaderProps } from "@/lib/types/Chat";

const Header: React.FC<HeaderProps> = ({ selectedChat, onToggleInfo }) => {

  return (
    <div className="flex items-center justify-between p-4 border-b border-[#29292950] bg-negro">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 bg-negro border border-[#b60000] rounded-full flex items-center justify-center overflow-hidden">
            <span className="rojo2 poppins-14 !font-semibold">
              {selectedChat.contactName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        </div>
        <div>
          <h3 className="poppins-17 !font-semibold blanco">
            {selectedChat.contactName}
          </h3>
          {/* Estado online */}
          <div className="flex items-center space-x-2 pt-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                selectedChat.isOnline ? "bg-verde" : "bg-gris-suave"
              }`}
            ></span>
            <span className={`gris-suave poppins-14 ${selectedChat.isOnline ? 'verde' : 'gris-suave'}`}>
              {selectedChat.isOnline ? "En línea" : "Desconectado"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleInfo}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-[#b60000] rounded-full transition-colors duration-500 group"
        >
          <img
            src="/svg/mensajes/info.svg"
            alt="Información"
            className="w-5 transition-all duration-500 group-hover:scale-110"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
