import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import SectionEmojins from "./SectionEmojins";
import type { QuickReplyProps } from "@/lib/types/Chat";

const QuickReply: React.FC<QuickReplyProps> = ({ onClose, message, onReaction, currentReaction, onReply }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showCopiedAnimation, setShowCopiedAnimation] = useState<boolean>(false);

  const handleAction = (action: string): void => {
    if (action === "responder") {
      if (onReply) {
        onReply(message);
      }
      onClose();
      return;
    }
    
    if (action === "copiar") {
      // Obtener el texto del mensaje
      const textToCopy = message.type === "file" ? message.fileName || "" : message.message;
      
      // Copiar al portapapeles usando la API moderna
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            console.log("Mensaje copiado al portapapeles:", textToCopy);
            showCopiedSuccessAnimation();
          })
          .catch((err) => {
            console.error("Error al copiar al portapapeles:", err);
            // Fallback para navegadores más antiguos
            fallbackCopyTextToClipboard(textToCopy);
          });
      } else {
        // Fallback para navegadores que no soportan clipboard API
        fallbackCopyTextToClipboard(textToCopy);
      }
      return;
    }
    
    onClose();
  };

  // Función para mostrar la animación de copiado exitoso
  const showCopiedSuccessAnimation = (): void => {
    setShowCopiedAnimation(true);
    setTimeout(() => {
      setShowCopiedAnimation(false);
      onClose();
    }, 1500); // Mostrar por 1.5 segundos
  };

  // Función fallback para copiar texto al portapapeles
  const fallbackCopyTextToClipboard = (text: string): void => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        console.log("Mensaje copiado al portapapeles (fallback):", text);
        showCopiedSuccessAnimation();
      } else {
        console.error("No se pudo copiar el texto");
        onClose();
      }
    } catch (err) {
      console.error("Error en fallback copy:", err);
      onClose();
    }
    
    document.body.removeChild(textArea);
  };

  const handleQuickReaction = (emoji: string): void => {
    console.log(`Reacción rápida ${emoji} para mensaje:`, message);
    onReaction(emoji);
    onClose();
  };

  const handleEmojiPickerReaction = (emojiObject: { emoji: string; [key: string]: any }): void => {
    console.log(`Reacción ${emojiObject.emoji} para mensaje:`, message);
    onReaction(emojiObject.emoji);
    setShowEmojiPicker(false);
    onClose();
  };

  // Animación de copiado exitoso
  if (showCopiedAnimation) {
    return (
      <div className="absolute top-0 left-0 z-50">
        <div className="fixed inset-0 z-40" onClick={onClose} />
        <div className="relative z-50 bg-verde1 blanco px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium">¡Copiado!</span>
          </div>
        </div>
      </div>
    );
  }

  // Emoji Picker completo
  if (showEmojiPicker)
    return (
      <div className="mt-2 absolute top-0 left-0 z-50 flex justify-center">
        <EmojiPicker
          onEmojiClick={handleEmojiPickerReaction}
          theme="dark"
          searchPlaceholder="Buscar emoji..."
          width={350}
          height={300}
          lazyLoadEmojis={true}
          previewConfig={{
            showPreview: false,
          }}
        />
      </div>
    );

  return (
    <div className="absolute top-0 left-0 z-50">
      {/* Overlay para cerrar al hacer click fuera */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menú de respuesta rápida */}
      <div className="relative z-50 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700/50 min-w-[280px]">
        {/* Sección de acciones */}
        <div className="p-2">
          <div className="space-y-1">
            {/* Responder */}
            <button
              onClick={() => handleAction("responder")}
              className="w-full flex items-center space-x-3 px-3 py-2 blanco hover:bg-gray-700 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
              <span className="text-sm">Responder</span>
            </button>

            {/* Copiar */}
            <button
              onClick={() => handleAction("copiar")}
              className="w-full flex items-center space-x-3 px-3 py-2 blanco hover:bg-gray-700 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <span className="text-sm">Copiar</span>
            </button>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-600 mx-2"/>

        {/* Sección de emojis */}
        <SectionEmojins
          handleQuickReaction={handleQuickReaction}
          currentReaction={currentReaction}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
        />
      </div>
    </div>
  );
};

export default QuickReply;
