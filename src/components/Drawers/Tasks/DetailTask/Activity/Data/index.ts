import type { User, Message } from "@/lib/types/Messages";

// Usuarios disponibles para el tageo
export const availableUsers: User[] = [
  {
    id: "user1",
    name: "Valentina Mesa",
    avatar: "/images/avatar-1.png",
    role: "Desarrollador"
  },
  {
    id: "user2", 
    name: "Carlos Rodríguez",
    avatar: "/images/avatar-2.png",
    role: "Diseñador"
  },
  {
    id: "user3",
    name: "Ana Martínez", 
    avatar: "/images/avatar-3.png",
    role: "Project Manager"
  },
  {
    id: "me",
    name: "Yo",
    avatar: "/images/my-avatar.png",
    role: "Usuario actual"
  }
];

// Mensajes de ejemplo
export const initialMessages: Message[] = [
  {
    id: 1,
    senderId: "user1",
    senderName: "Valentina Mesa",
    senderAvatar: "/images/avatar-1.png",
    message: "Hola equipo, he completado la primera parte del desarrollo. ¿Pueden revisar los cambios?",
    timestamp: "2024-01-20T10:30:00Z",
    type: "text"
  },
  {
    id: 2,
    senderId: "me",
    senderName: "Yo",
    message: "Perfecto Valentina, revisaré los cambios esta tarde y te doy feedback",
    timestamp: "2024-01-20T10:35:00Z",
    type: "text",
    replyTo: {
      id: 1,
      senderName: "Valentina Mesa",
      message: "Hola equipo, he completado la primera parte del desarrollo. ¿Pueden revisar los cambios?"
    }
  },
  {
    id: 3,
    senderId: "user2",
    senderName: "Carlos Rodríguez",
    message: "¡Excelente trabajo! @Valentina Mesa el diseño quedó muy bien implementado",
    timestamp: "2024-01-20T11:00:00Z",
    type: "text",
    mentions: ["user1"]
  }
];

export const currentUser: User = {
  id: "me",
  name: "Yo",
  avatar: "/images/my-avatar.png"
};
