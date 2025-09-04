import type { Message, User } from "@/lib/types/Messages";

/**
 * Crea un nuevo mensaje con todos los campos necesarios
 * @param params - Parámetros para crear el mensaje
 * @returns Nuevo objeto Message
 */
export const createMessage = (params: {
  id: number;
  currentUser: User;
  message: string;
  replyTo?: Message | null;
  mentionedUsers?: string[];
}): Message => {
  const { id, currentUser, message, replyTo, mentionedUsers = [] } = params;

  return {
    id,
    senderId: currentUser.id,
    senderName: currentUser.name,
    senderAvatar: currentUser.avatar,
    message,
    timestamp: new Date().toISOString(),
    type: "text",
    replyTo: replyTo
      ? {
          id: replyTo.id,
          senderName: replyTo.senderName,
          message: replyTo.message,
        }
      : undefined,
    mentions: mentionedUsers.length > 0 ? mentionedUsers : undefined,
  };
};
