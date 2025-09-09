export interface Message {
  id: number;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: "text" | "file" | "audio" | "video";
  fileName?: string;
  fileSize?: number;
  fileUrl?: string; // URL del archivo para mostrar/descargar
  file?: File | Blob;
  replyTo?: {
    id: number;
    senderName: string;
    message: string;
  };
}

export interface Chat {
  id: number;
  contactName: string;
  contactAvatar: string;
  platform: "instagram" | "messenger";
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  phone: string;
  email: string;
  location: string;
  joinDate: string;
  totalMessages: number;
  messages: Message[];
  attachments?: string[]; // URLs de archivos adjuntos del chat
}

export interface CurrentUser {
  id: string;
  name: string;
  avatar: string;
}

export interface PlatformInfo {
  name: string;
  color: string;
  icon: React.ReactNode;
}

// Props interfaces
export interface ChatProps {
  selectedChat: Chat | null;
  onToggleInfo: () => void;
}

export interface ListaChatProps {
  selectedChatId: number | null | undefined;
  onSelectChat: (chat: Chat) => void;
}

export interface InfoChatProps {
  selectedChat: Chat | null;
  isVisible: boolean;
  onClose: () => void;
}

// Props para subcomponentes
export interface HeaderProps {
  selectedChat: Chat;
  onToggleInfo: () => void;
}

export interface MessagesProps {
  messages: Message[];
  formatDate: (timestamp: string) => string;
  formatTime: (timestamp: string) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onReply: (message: Message) => void;
}

export interface TextareaProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  placeholder?: string;
}

export interface EmojisProps {
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  handleEmojiPickerReaction: (emojiObject: { emoji: string; [key: string]: any }) => void;
}

export interface FilesProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AudioRecorderProps {
  onSendAudio: (audioBlob: Blob) => void;
  onCancel: () => void;
}

export interface PreviewAnswerProps {
  replyTo: Message;
  setReplyTo: (message: Message | null) => void;
}

export interface PreviewFileProps {
  file: File;
  onCancel: () => void;
  onSend: () => void;
  fileComment: string;
  setFileComment: (comment: string) => void;
}

export interface AudioMessageProps {
  message: Message;
}

export interface ButtonQRProps {
  message: Message;
  onReply: (message: Message) => void;
  handleReaction: (messageId: number, emoji: string) => void;
  messageReactions: Record<number, string>;
  setQuickReplyMessageId: (id: number | null) => void;
  quickReplyMessageId: number | null;
}

export interface QuickReplyProps {
  onClose: () => void;
  message: Message;
  onReaction: (emoji: string) => void;
  currentReaction?: string;
  onReply: (message: Message) => void;
}

export interface SectionEmojinsProps {
  handleQuickReaction: (emoji: string) => void;
  currentReaction?: string;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
}

export interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface InfoTabProps {
  selectedChat: Chat;
}

export interface ActivityTabProps {
  selectedChat: Chat;
  platformInfo: PlatformInfo;
  formatDate: (dateString: string) => string;
}

export interface MessagePreviewAnswerProps {
  message: Message;
}
