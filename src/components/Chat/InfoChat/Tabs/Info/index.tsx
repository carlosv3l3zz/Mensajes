import React from "react";
import type { InfoTabProps } from "@/lib/types/Chat";

const Info: React.FC<InfoTabProps> = ({ selectedChat }) => {

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
      {/* Quick Actions */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Archivos
        </h4>
        <div className="space-y-2">
          {/* Ver archivos adjuntos en el chat */}
          <button className="cursor-pointer w-full flex items-center space-x-3 px-3 py-2 bg-gray-200 text-gray-900 hover:text-gray-200 hover:bg-gray-700 rounded-md transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span className="text-sm">Ver archivos adjuntos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
