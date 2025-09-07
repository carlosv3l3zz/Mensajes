import React from "react";
import { motion } from "framer-motion";
import QuickReply from "./QuickReply";
import type { ButtonQRProps } from "@/lib/types/Chat";

export const ButtonQR: React.FC<ButtonQRProps> = ({
  message,
  onReply,
  handleReaction,
  messageReactions,
  setQuickReplyMessageId,
  quickReplyMessageId,
}) => {
  const animationProps =
    message.senderId === "me"
      ? {
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -10 },
          transition: { duration: 0.4 },
        }
      : {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 10 },
          transition: { duration: 0.4 },
        };

  return (
    <motion.div {...animationProps} className="relative">
      <button
        onClick={() =>
          setQuickReplyMessageId(
            quickReplyMessageId === message.id ? null : message.id
          )
        }
        className={`gap-2 p-1.5 mx-2 flex items-center justify-center rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 border border-[#292929] ${
          message.senderId === "me"
            ? "bg-gradient-to-l from-[#b60000] to-[#000000]"
            : "bg-gradient-to-r from-[#f5f5f5] to-[#000000]"
        }`}
      >
        {message.senderId === "me" ? (
          <>
            <img src="/svg/mensajes/emonji.svg" alt="emoji" className="w-4" />
            <img src="/svg/mensajes/arrow.svg" alt="arrow" className="w-4" />
          </>
        ) : (
          <>
            <img src="/svg/mensajes/arrow.svg" alt="arrow" className="w-4" />
            <img src="/svg/mensajes/emonji.svg" alt="emoji" className="w-4" />
          </>
        )}
      </button>

      {/* Menú de respuesta rápida */}
      {quickReplyMessageId === message.id && (
        <QuickReply
          onClose={() => setQuickReplyMessageId(null)}
          message={message}
          onReaction={(emoji) => handleReaction(message.id, emoji)}
          currentReaction={messageReactions[message.id]}
          onReply={(msg) => {
            if (onReply) onReply(msg);
          }}
        />
      )}
    </motion.div>
  );
};
