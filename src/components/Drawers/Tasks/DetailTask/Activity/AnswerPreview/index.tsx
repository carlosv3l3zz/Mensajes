import React from "react";
import type { Message } from "@/lib/types/Messages";

interface AnswerPreviewProps {
  replyTo: Message;
  onCancel: () => void;
}

const AnswerPreview: React.FC<AnswerPreviewProps> = ({ replyTo, onCancel }) => {
  return (
    <div
      className={`bg-gray-50 border-l-4 p-3 mx-8 rounded-r-lg absolute bottom-[11%] w-[25.5%] ${
        replyTo.senderName === "Yo"
          ? "border-[#0098D6]"
          : "border-[#5B66AD]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="poppins-12 text-gray-600 !font-medium mb-1">
            Respondiendo a {replyTo.senderName}
          </p>
          <p className="poppins-12 text-gray-800 line-clamp-2">
            {replyTo.message}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <img src="/svg/detailTasks/x.svg" className="cursor-pointer hover:opacity-70 transition-opacity w-6" />
          x
        </button>
      </div>
    </div>
  );
};

export default AnswerPreview;
