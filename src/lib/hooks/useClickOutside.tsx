import { useEffect } from "react";

/**
 * Hook para manejar clicks fuera de elementos específicos
 * @param isActive - Si el hook debe estar activo
 * @param onClickOutside - Función a ejecutar cuando se hace click fuera
 * @param excludeSelectors - Selectores CSS de elementos a excluir del click outside
 */
export const useClickOutside = (
  isActive: boolean,
  onClickOutside: () => void,
  excludeSelectors: string[] = []
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isActive) {
        const target = event.target as Element;

        // Verificar si el click fue en algún elemento excluido
        const clickedInExcludedElement = excludeSelectors.some(selector => {
          const element = target.closest(selector);
          return element !== null;
        });

        // Solo ejecutar onClickOutside si no fue click en elemento excluido
        if (!clickedInExcludedElement) {
          onClickOutside();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isActive, onClickOutside, excludeSelectors]);
};
