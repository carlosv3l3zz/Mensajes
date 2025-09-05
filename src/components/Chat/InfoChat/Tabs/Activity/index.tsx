import React from "react";
import type { ActivityTabProps } from "@/lib/types/Chat";

const Activity: React.FC<ActivityTabProps> = ({ selectedChat, platformInfo, formatDate }) => {

  return (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Estadísticas de conversación
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">
              {selectedChat.totalMessages}
            </p>
            <p className="text-xs text-gray-500">Mensajes totales</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">
              {selectedChat.messages?.length || 0}
            </p>
            <p className="text-xs text-gray-500">Mensajes hoy</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Actividad reciente
        </h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-verde rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">Último mensaje enviado</p>
              <p className="text-xs text-gray-500">
                {selectedChat.lastMessageTime}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-rojo rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">Se unió a la conversación</p>
              <p className="text-xs text-gray-500">
                {formatDate(selectedChat.joinDate)}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">
                Plataforma: {platformInfo.name}
              </p>
              <p className="text-xs text-gray-500">
                Conectado desde {platformInfo.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Estado de la conversación
        </h4>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Estado</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedChat.isOnline
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {selectedChat.isOnline ? "Activo" : "Inactivo"}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-700">Mensajes no leídos</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {selectedChat.unreadCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
