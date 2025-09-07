import React, { useState } from "react";
import { motion } from "framer-motion";
import ListaChat from "@/components/Chat/ListaChat";
import InfoChat from "@/components/Chat/InfoChat";
import { Chat as ChatComponent } from "@/components/Chat/Chat";
import type { Chat as ChatType } from "@/lib/types/Chat";

export const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const handleSelectChat = (chat: ChatType): void => {
    setSelectedChat(chat);
  };

  const handleToggleInfo = (): void => {
    setShowInfo(!showInfo);
  };

  const handleCloseInfo = (): void => {
    setShowInfo(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col w-full gap-4"
    >
      <div className="flex w-full h-full overflow-hidden">
        {/* zona de lista de chats */}
        <div className="flex flex-col h-full w-[20%]">
          <ListaChat
            selectedChatId={selectedChat?.id}
            onSelectChat={handleSelectChat}
          />
        </div>

        {/* zona de chat */}
        <div
          className={`flex flex-col h-full transition-all duration-300 ${
            showInfo ? "w-[54%]" : "w-[80%]"
          }`}
        >
          <ChatComponent selectedChat={selectedChat} onToggleInfo={handleToggleInfo} />
        </div>

        {/* zona de información del chat */}
        {showInfo && (
          <div className="flex flex-col h-full w-[26%] bg-negro">
            <InfoChat
              selectedChat={selectedChat}
              isVisible={showInfo}
              onClose={handleCloseInfo}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Chat;
