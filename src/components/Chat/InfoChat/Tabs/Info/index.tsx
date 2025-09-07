import React from "react";
import type { InfoTabProps } from "@/lib/types/Chat";

const Info: React.FC<InfoTabProps> = ({ selectedChat }) => {

  return (
    <div className="p-4 space-y-6">
      {/* Contact Information */}
      <div>
        <h4 className="poppins-14 font-semibold blanco mb-3">
          Información de contacto
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-rojo2 rounded-full flex items-center justify-center">
              <img
                src="/svg/mensajes/tel.svg"
                alt="Teléfono"
                className="w-4"
              />
            </div>
            <div>
              <p className="poppins-14 blanco">{selectedChat.phone}</p>
              <p className="poppins-13 gris-suave pt-2">Teléfono</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-rojo2 rounded-full flex items-center justify-center">
              <img
                src="/svg/mensajes/email.svg"
                alt="Email"
                className="w-4"
              />
            </div>
            <div>
              <p className="poppins-14 blanco">{selectedChat.email}</p>
              <p className="poppins-13 gris-suave pt-2">Email</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-rojo2 rounded-full flex items-center justify-center">
              <img
                src="/svg/mensajes/ubication.svg"
                alt="Ubicación"
                className="w-4"
              />
            </div>
            <div>
              <p className="poppins-14 blanco">{selectedChat.location}</p>
              <p className="poppins-13 gris-suave pt-2">Ubicación</p>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div>
        <h4 className="poppins-14 font-semibold blanco mb-3">
          Archivos
        </h4>
        <div className="space-y-2">
          {/* Ver archivos adjuntos en el chat */}
          <button className="w-full flex items-center space-x-3 px-3 py-2 bg-[#880808] blanco rounded-[5px] transition-all duration-500 hover:bg-[#b60000]">
            <img
              src="/svg/mensajes/plus.svg"
              alt="Plus"
              className="w-5"
            />
            <span className="poppins-14">Ver archivos adjuntos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
