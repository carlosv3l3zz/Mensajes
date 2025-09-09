import { motion } from "framer-motion";
import React from "react";
import { getFileIconByType } from "@/lib/constants/FileIcons";
import type { PreviewAnswerProps } from "@/lib/types/Chat";

const PreviewAnswer: React.FC<PreviewAnswerProps> = ({ replyTo, setReplyTo }) => {

  const renderFilePreview = (): React.ReactElement => {
    if (replyTo.type === "file" && replyTo.file) {
      if (replyTo.file.type.startsWith('image/')) {
        return (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 flex-1">
              {getFileIconByType(replyTo.file.type, "w-4 h-4")}
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
            {getFileIconByType(replyTo.file.type, "w-4 h-4")}
            <span className="textos-peques text-gray-800">{replyTo.fileName}</span>
            {replyTo.message && replyTo.message !== `Archivo: ${replyTo.fileName}` && (
              <span className="textos-peques text-gray-800">• {replyTo.message}</span>
            )}
          </div>
        );
      } else if (replyTo.file.type.startsWith('audio/')) {
        return (
          <div className="flex items-center space-x-2">
            {getFileIconByType(replyTo.file.type, "w-4 h-4")}
            <span className="textos-peques text-gray-800">Mensaje de voz</span>
            {replyTo.message && replyTo.message !== `Archivo: ${replyTo.fileName}` && (
              <span className="textos-peques text-gray-800">• {replyTo.message}</span>
            )}
          </div>
        );
      } else {
        return (
          <div className="flex items-center space-x-2">
            {getFileIconByType(replyTo.file.type, "w-4 h-4")}
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
