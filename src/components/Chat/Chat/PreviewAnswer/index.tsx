import { motion } from "framer-motion";
import React from "react";
import type { PreviewAnswerProps } from "@/lib/types/Chat";

const PreviewAnswer: React.FC<PreviewAnswerProps> = ({ replyTo, setReplyTo }) => {
  const getFileIcon = (fileType: string): React.ReactElement => {
    if (fileType.startsWith('image/')) {
      return (
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (fileType.startsWith('video/')) {
      return (
        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    } else if (fileType.startsWith('audio/')) {
      return (
        <svg className="w-4 h-4 verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    } else if (fileType === 'application/pdf') {
      return (
        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  const renderFilePreview = (): React.ReactElement => {
    if (replyTo.type === "file" && replyTo.file) {
      if (replyTo.file.type.startsWith('image/')) {
        return (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 flex-1">
              {getFileIcon(replyTo.file.type)}
              {replyTo.message && replyTo.message !== `Archivo: ${replyTo.fileName}` && (
                <span className="textos-peques text-gray-800">{replyTo.message}</span>
              )}
            </div>
            <img
              src={URL.createObjectURL(replyTo.file)}
              alt={replyTo.fileName}
              className="h-12 object-cover rounded"
            />
          </div>
        );
      } else if (replyTo.file.type.startsWith('video/')) {
        return (
          <div className="flex items-center space-x-2">
            {getFileIcon(replyTo.file.type)}
            <span className="textos-peques text-gray-800">{replyTo.fileName}</span>
            {replyTo.message && replyTo.message !== `Archivo: ${replyTo.fileName}` && (
              <span className="textos-peques text-gray-800">• {replyTo.message}</span>
            )}
          </div>
        );
      } else if (replyTo.file.type.startsWith('audio/')) {
        return (
          <div className="flex items-center space-x-2">
            {getFileIcon(replyTo.file.type)}
            <span className="textos-peques text-gray-800">Mensaje de voz</span>
            {replyTo.message && replyTo.message !== `Archivo: ${replyTo.fileName}` && (
              <span className="textos-peques text-gray-800">• {replyTo.message}</span>
            )}
          </div>
        );
      } else {
        return (
          <div className="flex items-center space-x-2">
            {getFileIcon(replyTo.file.type)}
            <span className="textos-peques text-gray-800">{replyTo.fileName}</span>
            {replyTo.message && replyTo.message !== `Archivo: ${replyTo.fileName}` && (
              <span className="textos-peques text-gray-800">• {replyTo.message}</span>
            )}
          </div>
        );
      }
    } else {
      return (
        <p className="textos-peques text-gray-800 line-clamp-1">
          {replyTo.message}
        </p>
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
      <div
        className={`flex items-start backdrop-blur-sm justify-between bg-gray-500/20 rounded-t-[10px] px-2 py-3 border-l-4 ${
          replyTo.senderId === "me" ? "border-[#b60000]" : "border-[#ff9800]"
        }`}
      >
        <div className="flex-1">
          <p
            className={`textos-peques font-medium mb-0.5 ${
              replyTo.senderId === "me" ? "text-[#b60000]" : "text-[#ff9800]"
            }`}
          >
            {replyTo.senderId === "me"
              ? "Tú"
              : replyTo.senderName || "Contacto"}
          </p>
          {renderFilePreview()}
        </div>
        <button
          onClick={() => setReplyTo(null)}
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
    </motion.div>
  );
};

export default PreviewAnswer;
