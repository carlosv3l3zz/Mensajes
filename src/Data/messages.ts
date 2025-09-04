import type { Chat, CurrentUser } from '@/lib/types/Chat';

export const chatsData: Chat[] = [
  {
    id: 1,
    contactName: "María González",
    contactAvatar: "/images/avatar-1.png",
    platform: "instagram",
    lastMessage: "Hola, me interesa la propiedad que publicaste",
    lastMessageTime: "10:30 AM",
    unreadCount: 3,
    isOnline: true,
    phone: "+57 300 123 4567",
    email: "maria.gonzalez@email.com",
    location: "Bogotá, Colombia",
    joinDate: "2024-01-15",
    totalMessages: 45,
    messages: [
      {
        id: 1,
        senderId: "contact",
        senderName: "María González",
        message: "Hola, me interesa la propiedad que publicaste",
        timestamp: "2024-01-20T10:30:00Z",
        type: "text"
      },
      {
        id: 2,
        senderId: "me",
        senderName: "Yo",
        message: "¡Hola María! Claro, con gusto te ayudo. ¿Cuál propiedad te interesa?",
        timestamp: "2024-01-20T10:32:00Z",
        type: "text"
      },
      {
        id: 3,
        senderId: "contact",
        senderName: "María González",
        message: "La casa en el norte de la ciudad",
        timestamp: "2024-01-20T10:35:00Z",
        type: "text"
      },
      {
        id: 4,
        senderId: "me",
        senderName: "Yo",
        message: "Perfecto, esa es una excelente opción. Te envío más detalles",
        timestamp: "2024-01-20T10:36:00Z",
        type: "text"
      }
    ]
  },
  {
    id: 2,
    contactName: "Carlos Rodríguez",
    contactAvatar: "/images/avatar-2.png",
    platform: "messenger",
    lastMessage: "¿Podemos agendar una cita para mañana?",
    lastMessageTime: "9:45 AM",
    unreadCount: 1,
    isOnline: false,
    phone: "+57 301 987 6543",
    email: "carlos.rodriguez@email.com",
    location: "Medellín, Colombia",
    joinDate: "2024-01-10",
    totalMessages: 28,
    messages: [
      {
        id: 1,
        senderId: "contact",
        senderName: "Carlos Rodríguez",
        message: "Buenos días, vi su anuncio en redes sociales",
        timestamp: "2024-01-20T09:30:00Z",
        type: "text"
      },
      {
        id: 2,
        senderId: "me",
        senderName: "Yo",
        message: "¡Buenos días Carlos! Gracias por contactarnos",
        timestamp: "2024-01-20T09:32:00Z",
        type: "text"
      },
      {
        id: 3,
        senderId: "contact",
        senderName: "Carlos Rodríguez",
        message: "¿Podemos agendar una cita para mañana?",
        timestamp: "2024-01-20T09:45:00Z",
        type: "text"
      }
    ]
  },
  {
    id: 3,
    contactName: "Ana Martínez",
    contactAvatar: "/images/avatar-3.png",
    platform: "instagram",
    lastMessage: "Gracias por la información",
    lastMessageTime: "Ayer",
    unreadCount: 0,
    isOnline: true,
    phone: "+57 302 456 7890",
    email: "ana.martinez@email.com",
    location: "Cali, Colombia",
    joinDate: "2024-01-08",
    totalMessages: 67,
    messages: [
      {
        id: 1,
        senderId: "contact",
        senderName: "Ana Martínez",
        message: "Hola, necesito información sobre apartamentos",
        timestamp: "2024-01-19T14:20:00Z",
        type: "text"
      },
      {
        id: 2,
        senderId: "me",
        senderName: "Yo",
        message: "¡Hola Ana! Con gusto te ayudo con información sobre apartamentos",
        timestamp: "2024-01-19T14:22:00Z",
        type: "text"
      },
      {
        id: 3,
        senderId: "me",
        senderName: "Yo",
        message: "Te envío algunas opciones que tenemos disponibles",
        timestamp: "2024-01-19T14:23:00Z",
        type: "text"
      },
      {
        id: 4,
        senderId: "contact",
        senderName: "Ana Martínez",
        message: "Gracias por la información",
        timestamp: "2024-01-19T14:30:00Z",
        type: "text"
      }
    ]
  },
  {
    id: 4,
    contactName: "Luis Fernández",
    contactAvatar: "/images/avatar-4.png",
    platform: "messenger",
    lastMessage: "¿Cuál es el precio final?",
    lastMessageTime: "2 días",
    unreadCount: 0,
    isOnline: false,
    phone: "+57 303 789 0123",
    email: "luis.fernandez@email.com",
    location: "Barranquilla, Colombia",
    joinDate: "2024-01-05",
    totalMessages: 23,
    messages: [
      {
        id: 1,
        senderId: "contact",
        senderName: "Luis Fernández",
        message: "Me interesa conocer más sobre sus servicios",
        timestamp: "2024-01-18T16:15:00Z",
        type: "text"
      },
      {
        id: 2,
        senderId: "me",
        senderName: "Yo",
        message: "¡Hola Luis! Te explico todos nuestros servicios",
        timestamp: "2024-01-18T16:17:00Z",
        type: "text"
      },
      {
        id: 3,
        senderId: "contact",
        senderName: "Luis Fernández",
        message: "¿Cuál es el precio final?",
        timestamp: "2024-01-18T16:25:00Z",
        type: "text"
      }
    ]
  },
  {
    id: 5,
    contactName: "Patricia Silva",
    contactAvatar: "/images/avatar-5.png",
    platform: "instagram",
    lastMessage: "Perfecto, nos vemos entonces",
    lastMessageTime: "3 días",
    unreadCount: 0,
    isOnline: true,
    phone: "+57 304 234 5678",
    email: "patricia.silva@email.com",
    location: "Cartagena, Colombia",
    joinDate: "2024-01-03",
    totalMessages: 89,
    messages: [
      {
        id: 1,
        senderId: "contact",
        senderName: "Patricia Silva",
        message: "Hola, vi tu publicación sobre la casa en la playa",
        timestamp: "2024-01-17T11:00:00Z",
        type: "text"
      },
      {
        id: 2,
        senderId: "me",
        senderName: "Yo",
        message: "¡Hola Patricia! Sí, es una propiedad increíble",
        timestamp: "2024-01-17T11:02:00Z",
        type: "text"
      },
      {
        id: 3,
        senderId: "contact",
        senderName: "Patricia Silva",
        message: "¿Podríamos coordinar una visita?",
        timestamp: "2024-01-17T11:05:00Z",
        type: "text"
      },
      {
        id: 4,
        senderId: "me",
        senderName: "Yo",
        message: "Claro, ¿qué día te viene mejor?",
        timestamp: "2024-01-17T11:06:00Z",
        type: "text"
      },
      {
        id: 5,
        senderId: "contact",
        senderName: "Patricia Silva",
        message: "El viernes en la tarde estaría bien",
        timestamp: "2024-01-17T11:10:00Z",
        type: "text"
      },
      {
        id: 6,
        senderId: "me",
        senderName: "Yo",
        message: "Perfecto, viernes a las 3:00 PM entonces",
        timestamp: "2024-01-17T11:12:00Z",
        type: "text"
      },
      {
        id: 7,
        senderId: "contact",
        senderName: "Patricia Silva",
        message: "Perfecto, nos vemos entonces",
        timestamp: "2024-01-17T11:15:00Z",
        type: "text"
      }
    ]
  }
];

export const currentUser: CurrentUser = {
  id: "me",
  name: "Yo",
  avatar: "/images/my-avatar.png"
};
