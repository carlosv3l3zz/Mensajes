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
        className="p-2 hover:bg-[#b60000] rounded-full transition-colors"
      >
        <img
          src="/svg/mensajes/emonji.svg"
          alt="Emojis"
          className="w-5"
        />
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
