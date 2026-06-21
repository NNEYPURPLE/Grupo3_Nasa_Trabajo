import { useRef } from "react";
import { Animated } from "react-native";
import { useNativeDriver } from "../utils/animations";

interface UseAnimationPressOptions {
  scaleValue?: number;
  speed?: number;
  bounciness?: number;
}

/**
 * Hook que proporciona animaciones de presión reutilizables.
 * Evita duplicación de código en múltiples componentes.
 * 
 * @param {UseAnimationPressOptions} options - Opciones de configuración
 * @returns {Object} Objeto con scaleAnim y handlers
 */
export const useAnimationPress = ({
  scaleValue = 0.96,
  speed = 50,
  bounciness = 4,
}: UseAnimationPressOptions = {}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: scaleValue,
      useNativeDriver: useNativeDriver,
      speed,
      bounciness,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: useNativeDriver,
      speed,
      bounciness,
    }).start();
  };

  return { scaleAnim, handlePressIn, handlePressOut };
};
