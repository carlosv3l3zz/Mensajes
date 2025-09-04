import React from "react";

interface InputMessagesProps {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  newMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  placeholder: string;
  type: string;
}

const InputMessages: React.FC<InputMessagesProps> = ({
  inputRef,
  newMessage,
  handleInputChange,
  handleKeyPress,
  placeholder,
  type,
}) => {
  return (
    <input
    ref={inputRef}
    type={type}
    placeholder={placeholder}
    value={newMessage}
    onChange={handleInputChange}
    onKeyPress={handleKeyPress}
    className="poppins-16 !font-normal bg-transparent w-full rounded-[5px] outline-none"
  />
  );
};

export default InputMessages;
