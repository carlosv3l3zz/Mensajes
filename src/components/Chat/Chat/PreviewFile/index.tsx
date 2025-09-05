import { motion } from "framer-motion";
import React from "react";
import Textarea from "../Inputs/Textarea";
import type { PreviewFileProps } from "@/lib/types/Chat";

const PreviewFile: React.FC<PreviewFileProps> = ({ file, onCancel, onSend, fileComment, setFileComment }) => {
  const getFileIcon = (fileType: string): React.ReactElement => {
    if (fileType.startsWith("image/")) {
      return (
        <svg
          className="w-8 h-8 rojo"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (fileType.startsWith("video/")) {
      return (
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (fileType === "application/pdf") {
      return (
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    } else if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
      return (
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      );
    } else if (
      fileType.includes("powerpoint") ||
      fileType.includes("presentation")
    ) {
      return (
        <svg
          className="w-8 h-8 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      );
    } else if (fileType.includes("audio/")) {
      return (
        <svg
          className="w-8 h-8 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-8 h-8 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    }
  };

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
          {getFileIcon(file.type)}
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
