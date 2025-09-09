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
    attachments: [
      "/files/chat1/plano_casa_norte.pdf",
      "/files/chat1/fotos_interior.zip",
      "/files/chat1/contrato_ejemplo.docx"
    ],
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
      },
      {
        id: 5,
        senderId: "me",
        senderName: "Yo",
        message: "Te envío el plano de la casa",
        timestamp: "2024-01-20T10:37:00Z",
        type: "file",
        fileName: "plano_casa_norte.pdf",
        fileSize: 2048576,
        fileUrl: "/files/chat1/plano_casa_norte.pdf"
      },
      {
        id: 6,
        senderId: "me",
        senderName: "Yo",
        message: "Y aquí tienes las fotos del interior",
        timestamp: "2024-01-20T10:38:00Z",
        type: "file",
        fileName: "fotos_interior.zip",
        fileSize: 15728640,
        fileUrl: "/files/chat1/fotos_interior.zip"
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
    attachments: [
      "/files/chat2/catalogo_propiedades.pdf",
      "/files/chat2/ubicacion_oficina.JPG"
    ],
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
      },
      {
        id: 4,
        senderId: "contact",
        senderName: "Yo",
        message: "Te envío nuestro catálogo completo",
        timestamp: "2024-01-20T09:46:00Z",
        type: "file",
        fileName: "catalogo_propiedades.pdf",
        fileSize: 8388608,
        fileUrl: "/files/chat2/catalogo_propiedades.pdf"
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
    attachments: [
      "/files/chat3/apartamentos_disponibles.xlsx",
      "/files/chat3/precios_2024.pdf",
      "/files/chat3/tour_virtual.mp4"
    ],
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
      },
      {
        id: 5,
        senderId: "me",
        senderName: "Yo",
        message: "Aquí tienes la lista completa de apartamentos",
        timestamp: "2024-01-19T14:31:00Z",
        type: "file",
        fileName: "apartamentos_disponibles.xlsx",
        fileSize: 1048576,
        fileUrl: "/files/chat3/apartamentos_disponibles.xlsx"
      },
      {
        id: 6,
        senderId: "contact",
        senderName: "Ana Martínez",
        message: "¿Podrías enviarme un tour virtual?",
        timestamp: "2024-01-19T14:35:00Z",
        type: "text"
      },
      {
        id: 7,
        senderId: "me",
        senderName: "Yo",
        message: "¡Por supuesto! Aquí tienes el tour virtual",
        timestamp: "2024-01-19T14:36:00Z",
        type: "video",
        fileName: "tour_virtual.mp4",
        fileSize: 52428800,
        fileUrl: "/files/chat3/tour_virtual.mp4"
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
    attachments: [
      "/files/chat4/cotizacion_servicios.pdf",
      "/files/chat4/terminos_condiciones.docx"
    ],
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
      },
      {
        id: 4,
        senderId: "me",
        senderName: "Yo",
        message: "Te envío la cotización detallada",
        timestamp: "2024-01-18T16:26:00Z",
        type: "file",
        fileName: "cotizacion_servicios.pdf",
        fileSize: 512000,
        fileUrl: "/files/chat4/cotizacion_servicios.pdf"
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
    attachments: [
      "/files/chat5/casa_playa_fotos.zip",
      "/files/chat5/ubicacion_mapa.PNG",
      "/files/chat5/contrato_alquiler.pdf",
      "/files/chat5/audio_descripcion.mp3"
    ],
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
      },
      {
        id: 8,
        senderId: "me",
        senderName: "Yo",
        message: "Te envío las fotos de la casa",
        timestamp: "2024-01-17T11:16:00Z",
        type: "file",
        fileName: "casa_playa_fotos.zip",
        fileSize: 25165824,
        fileUrl: "/files/chat5/casa_playa_fotos.zip"
      },
      {
        id: 9,
        senderId: "me",
        senderName: "Yo",
        message: "Y la ubicación exacta en el mapa",
        timestamp: "2024-01-17T11:17:00Z",
        type: "file",
        fileName: "ubicacion_mapa.PNG",
        fileSize: 2097152,
        fileUrl: "/files/chat5/ubicacion_mapa.PNG"
      },
      {
        id: 10,
        senderId: "me",
        senderName: "Yo",
        message: "Te dejo una descripción en audio",
        timestamp: "2024-01-17T11:18:00Z",
        type: "audio",
        fileName: "audio_descripcion.mp3",
        fileSize: 3145728,
        fileUrl: "/files/chat5/audio_descripcion.mp3"
      }
    ]
  }
];

export const currentUser: CurrentUser = {
  id: "me",
  name: "Yo",
  avatar: "/images/my-avatar.png"
};
