import React from "react";
import type { FilesProps } from "@/lib/types/Chat";

const Files: React.FC<FilesProps> = ({ fileInputRef, handleFileUpload }) => {
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
      />

      {/* Botón de archivo */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-2 hover:bg-[#b60000] rounded-full transition-colors"
      >
        <img
          src="/svg/mensajes/adjunto.svg"
          alt="Adjuntar archivo"
          className="w-5"
        />
      </button>
    </>
  );
};

export default Files;
