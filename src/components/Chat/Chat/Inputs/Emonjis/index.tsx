import React from "react";
import EmojiPicker from "emoji-picker-react";
import type { EmojisProps } from "@/lib/types/Chat";

const Emojis: React.FC<EmojisProps> = ({
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiPickerReaction,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {" "}
          <circle cx="12" cy="12" r="10" strokeWidth={2} />{" "}
          <circle cx="8" cy="10" r="1" fill="currentColor" />{" "}
          <circle cx="16" cy="10" r="1" fill="currentColor" />{" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16s1.5 2 4 2 4-2 4-2"
          />{" "}
        </svg>
      </button>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-[4rem] left-0 z-50 flex justify-center">
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
      )}
    </>
  );
};

export default Emojis;
