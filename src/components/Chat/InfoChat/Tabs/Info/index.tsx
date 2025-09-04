import React, { useState } from "react";
import type { InfoTabProps } from "@/lib/types/Chat";

const Info: React.FC<InfoTabProps> = ({ selectedChat, platformInfo, formatDate }) => {
  const [selectAgent, setSelectAgent] = useState<boolean>(false);

  return (
    <div className="p-4 space-y-6">
      {/* Contact Information */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Información de contacto
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> </svg>
            </div>
            <div>
              <p className="text-sm text-gray-900">{selectedChat.phone}</p>
              <p className="text-xs text-gray-500">Teléfono</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> </svg>
            </div>
            <div>
              <p className="text-sm text-gray-900">{selectedChat.email}</p>
              <p className="text-xs text-gray-500">Email</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> </svg>
            </div>
            <div>
              <p className="text-sm text-gray-900">{selectedChat.location}</p>
              <p className="text-xs text-gray-500">Ubicación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Information */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Plataforma</h4>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${platformInfo.color} rounded-full flex items-center justify-center`}
            >
              {React.isValidElement(platformInfo.icon) && (
                <img
                  src={(platformInfo.icon.props as any).src}
                  alt={(platformInfo.icon.props as any).alt}
                  className="w-6"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {platformInfo.name}
              </p>
              <p className="text-xs text-gray-500">
                Conectado desde {formatDate(selectedChat.joinDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Acciones rápidas
        </h4>
        <div className="space-y-2">
          {/* Asignar Agente a la conversación */}
          <button onClick={() => setSelectAgent(!selectAgent)} className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /> </svg>
            </div>
            <span className="text-sm text-gray-700">Asignar Agente</span>
          </button>
          {/* select para asignar agente */}
          {selectAgent && 
            <div className="flex justify-center items-center w-full">
              <div className="w-[90%] p-2 rounded-lg border border-gray-300 space-y-2 max-h-[6rem] overflow-y-auto shadow-md">
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 1</p>
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 2</p>
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 3</p>
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 4</p>
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 5</p>
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 6</p>
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 7</p>
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 8</p>
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 9</p>
                <p className="inter-13 gris hover:bg-[#0556bf] hover:text-white transition-all duration-300 px-2 py-1 rounded-[10px] cursor-pointer">Agente 10</p>
              </div>
            </div>
          }

          {/* Crear tarea */}
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-.5 9a2 2 0 002 2h3a2 2 0 002-2L16 7m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1" /> </svg>
            </div>
            <span className="text-sm text-gray-700">Crear tarea</span>
          </button>

          {/* Ver perfil completo del cliente */}
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> </svg>
            </div>
            <span className="text-sm text-gray-700">Ver perfil completo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
