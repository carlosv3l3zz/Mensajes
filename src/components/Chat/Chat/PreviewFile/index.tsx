import { motion } from "framer-motion";
import React from "react";
import Textarea from "../Inputs/Textarea";
import { getFileIconByType } from "@/lib/constants/FileIcons";
import type { PreviewFileProps } from "@/lib/types/Chat";

const PreviewFile: React.FC<PreviewFileProps> = ({ file, onCancel, onSend, fileComment, setFileComment }) => {

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderPreview = (): React.ReactElement => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="relative">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="h-[15rem] object-cover rounded-lg"
          />
        </div>
      );
    } else if (file.type.startsWith("video/")) {
      return (
        <div className="relative">
          <video
            src={URL.createObjectURL(file)}
            className="h-[15rem] object-cover rounded-lg"
            controls
          />
        </div>
      );
    } else if (file.type.startsWith("audio/")) {
      return (
        <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
          <audio
            src={URL.createObjectURL(file)}
            controls
            className="w-full max-w-xs"
          />
        </div>
      );
    } else {
      return (
        <div className="w-fit flex items-center justify-center h-fit bg-gray-100 rounded-lg">
          {getFileIconByType(file.type, "w-8 h-8")}
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="px-4 pt-3"
    >
      <div className="bg-gray-50 rounded-t-[10px] p-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Archivo a enviar
            </h4>
            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
          </div>
          <button
            onClick={onCancel}
            className="ml-3 p-1 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Preview del archivo */}
        {renderPreview()}

        {/* Información del archivo */}
        <div className="mt-3">
          <p className="text-sm text-gray-700 font-medium truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">{file.type}</p>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center space-x-2 mt-3">
          {/* textarea de comentario */}
          <div className="flex-1">
            <Textarea 
              newMessage={fileComment} 
              setNewMessage={setFileComment} 
              handleSendMessage={() => {}} // Función vacía para evitar envío accidental
              placeholder="Agregar un comentario..."
            />
          </div>

          {/* Botón de enviar */}
          <button
            onClick={onSend}
            disabled={!file}
            className="p-2 bg-rojo text-white rounded-full hover:bg-[#880808] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewFile;
