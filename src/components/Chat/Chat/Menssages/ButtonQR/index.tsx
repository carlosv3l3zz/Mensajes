import React from 'react';
import { motion } from 'framer-motion';
import QuickReply from './QuickReply';
import type { ButtonQRProps } from "@/lib/types/Chat";

export const ButtonQR: React.FC<ButtonQRProps> = ({
  message, 
  onReply, 
  handleReaction, 
  messageReactions, 
  setQuickReplyMessageId, 
  quickReplyMessageId
}) => {
    
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <button 
        onClick={() => setQuickReplyMessageId(quickReplyMessageId === message.id ? null : message.id)}
        className="gap-2 p-1.5 mx-2 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 border border-gray-200 bg-[#f5f5f5]"
      >
        <img src="/svg/mensajes/arrow.svg" alt="arrow" className="w-4 h-4" />
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <circle cx="12" cy="12" r="10" strokeWidth={2} /> <circle cx="8" cy="10" r="1" fill="currentColor" /> <circle cx="16" cy="10" r="1" fill="currentColor" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16s1.5 2 4 2 4-2 4-2" /> </svg>
      </button>
      
       {/* Menú de respuesta rápida */}
       {quickReplyMessageId === message.id && (
         <QuickReply 
           onClose={() => setQuickReplyMessageId(null)}
           message={message}
           onReaction={(emoji) => handleReaction(message.id, emoji)}
           currentReaction={messageReactions[message.id]}
          onReply={(msg) => { if(onReply) onReply(msg); }}
         />
       )}
    </motion.div>
  );
};
