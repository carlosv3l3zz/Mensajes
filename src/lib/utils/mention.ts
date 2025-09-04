export interface MentionState {
  startIndex: number;
  endIndex: number;
  searchTerm: string;
}

/**
 * Detecta si el cursor está dentro de una mención activa
 * @param text - Texto completo del input
 * @param cursorPosition - Posición actual del cursor
 * @returns Estado de la mención o null si no hay mención activa
 */
export const detectActiveMention = (
  text: string,
  cursorPosition: number
): MentionState | null => {
  // Buscar el último @ antes del cursor
  const textBeforeCursor = text.slice(0, cursorPosition);
  const lastAtIndex = textBeforeCursor.lastIndexOf("@");

  if (lastAtIndex !== -1) {
    // Obtener el texto después del @
    const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1);

    // Permitir menciones con espacios - solo terminar cuando hay doble espacio o fin de línea
    const shouldShowDropdown =
      textAfterAt.length === 0 || !textAfterAt.endsWith("  ");

    if (shouldShowDropdown) {
      return {
        startIndex: lastAtIndex,
        endIndex: cursorPosition,
        searchTerm: textAfterAt,
      };
    }
  }

  return null;
};

/**
 * Inserta una mención en el texto reemplazando la mención activa
 * @param text - Texto actual
 * @param mention - Estado de la mención activa
 * @param userName - Nombre del usuario a mencionar
 * @param cursorPosition - Posición actual del cursor
 * @returns Objeto con el nuevo texto y la nueva posición del cursor
 */
export const insertMention = (
  text: string,
  mention: MentionState,
  userName: string,
  cursorPosition: number
): { newText: string; newCursorPosition: number } => {
  const beforeMention = text.slice(0, mention.startIndex);
  const afterCursor = text.slice(cursorPosition);
  const mentionText = `@${userName} `;
  const newText = beforeMention + mentionText + afterCursor;
  const newCursorPosition = mention.startIndex + mentionText.length;

  return { newText, newCursorPosition };
};

/**
 * Añade una mención (@) al final del texto
 * @param text - Texto actual
 * @returns Objeto con el nuevo texto, nueva posición del cursor y estado de mención
 */
export const addMentionSymbol = (text: string): {
  newText: string;
  newCursorPosition: number;
  mentionState: MentionState;
} => {
  const newText = text + "@";
  const newCursorPosition = newText.length;
  const mentionState: MentionState = {
    startIndex: text.length,
    endIndex: newText.length,
    searchTerm: "",
  };

  return { newText, newCursorPosition, mentionState };
};
