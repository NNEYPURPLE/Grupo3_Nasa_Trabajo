/**
 * Utilidades para Accesibilidad (A11y)
 * Ayudantes para mejorar la experiencia de usuarios con discapacidades
 */

/**
 * Crear etiqueta de accesibilidad descriptiva para imágenes
 */
export const getImageAccessibilityLabel = (
  title: string,
  description?: string,
  date?: string
): string => {
  const parts = [title];
  if (description) parts.push(description);
  if (date) parts.push(`capturado el ${date}`);
  return parts.join(", ");
};

/**
 * Crear hint de accesibilidad para botones interactivos
 */
export const getButtonA11yHint = (
  buttonType: "navigation" | "action" | "toggle"
): string => {
  const hints = {
    navigation: "Toca para navegar",
    action: "Toca para ejecutar esta acción",
    toggle: "Toca para cambiar el estado",
  };
  return hints[buttonType];
};

/**
 * Obtener etiqueta para componentes de tarjeta
 */
export const getCardAccessibilityLabel = (title: string): string => {
  return `Tarjeta: ${title}. Toca para más información.`;
};

/**
 * Obtener etiqueta para opciones de trivia
 */
export const getTriviaOptionLabel = (option: string, label: string): string => {
  return `Opción ${label}: ${option}`;
};
