import React from "react";
import type { SectionEmojinsProps } from "@/lib/types/Chat";

const SectionEmojins: React.FC<SectionEmojinsProps> = ({
  handleQuickReaction,
  currentReaction,
  showEmojiPicker,
  setShowEmojiPicker,
}) => {

  return (
    <div className="p-2 !w-full">
      <div className="flex items-center space-x-2">
        {/* Reacciones rápidas */}
        <button
          onClick={() => handleQuickReaction("👍")}
          className={`!text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-700/50 ${
            currentReaction === "👍" ? "bg-gray-700/50 scale-110" : ""
          }`}
        >
          👍
        </button>
        <button
          onClick={() => handleQuickReaction("❤️")}
          className={`!text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-700/50 ${
            currentReaction === "❤️" ? "bg-gray-700/50 scale-110" : ""
          }`}
        >
          ❤️
        </button>
        <button
          onClick={() => handleQuickReaction("😀")}
          className={`!text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-700/50 ${
            currentReaction === "😀" ? "bg-gray-700/50 scale-110" : ""
          }`}
        >
          😀
        </button>
        <button
          onClick={() => handleQuickReaction("😢")}
          className={`!text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-700/50 ${
            currentReaction === "😢" ? "bg-gray-700/50 scale-110" : ""
          }`}
        >
          😢
        </button>
        <button
          onClick={() => handleQuickReaction("🙏")}
          className={`!text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-700/50 ${
            currentReaction === "🙏" ? "bg-gray-700/50 scale-110" : ""
          }`}
        >
          🙏
        </button>

        {/* Botón más o emoji seleccionado del picker */}
        {currentReaction &&
        !["👍", "❤️", "😀", "😢", "🙏"].includes(currentReaction) ? (
          <button
            onClick={() => handleQuickReaction(currentReaction)}
            className={`!text-2xl hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-700/50 bg-gray-700/50 scale-110`}
          >
            {currentReaction}
          </button>
        ) : (
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 flex items-center justify-center blanco hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg
              className="w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionEmojins;
