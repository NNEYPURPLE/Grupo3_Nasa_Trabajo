import { useEffect, useRef } from "react";
import { Animated, type ViewStyle } from "react-native";
import { useNativeDriver } from "../../utils/animations";

interface CosmicParticleProps {
  delay?: number;
  duration?: number;
  style?: ViewStyle;
}

export const CosmicParticle = ({
  delay = 0,
  duration = 3000,
  style,
}: CosmicParticleProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: duration * 0.4, useNativeDriver: useNativeDriver }),
        Animated.timing(opacity, { toValue: 0.2, duration: duration * 0.3, useNativeDriver: useNativeDriver }),
        Animated.timing(opacity, { toValue: 0, duration: duration * 0.3, useNativeDriver: useNativeDriver }),
      ])
    );
    const timeout = setTimeout(() => anim.start(), delay);
    return () => { clearTimeout(timeout); anim.stop(); };
  }, []);

  return <Animated.View style={[{ opacity }, style]} />;
};
