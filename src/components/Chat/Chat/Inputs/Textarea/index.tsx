import React from "react";
import type { TextareaProps } from "@/lib/types/Chat";

const Textarea: React.FC<TextareaProps> = ({ 
  newMessage, 
  setNewMessage, 
  handleSendMessage, 
  placeholder = "Escribe un mensaje..." 
}) => {
  return (
    <div className="flex-1 relative">
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b60000] focus:border-transparent resize-none blanco placeholder:text-[#f5f5f5]"
        rows={1}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey && handleSendMessage) {
            e.preventDefault();
            handleSendMessage(e);
          }
        }}
      />
    </div>
  );
};

export default Textarea;
