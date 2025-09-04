// Tipos para el sistema de mensajes de actividad
export interface User {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface Message {
  id: number;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: string;
  type: 'text';
  replyTo?: {
    id: number;
    senderName: string;
    message: string;
  };
  mentions?: string[]; // IDs de usuarios mencionados
}

export interface ActivityData {
  messages: Message[];
  users: User[]; // Usuarios disponibles para tagear
}
