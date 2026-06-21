import { useEffect, useRef, useState, type ReactNode } from "react";
import { Animated, Platform } from "react-native";

interface FadeInViewProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  style?: any;
}

const useNativeDriver = Platform.OS !== "web";

export const FadeInView = ({
  children,
  duration = 400,
  delay = 0,
  direction = "up",
  distance = 20,
  style,
}: FadeInViewProps) => {
  const [canRender, setCanRender] = useState(delay === 0);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(
    new Animated.Value(direction === "left" ? distance : direction === "right" ? -distance : 0)
  ).current;
  const translateY = useRef(
    new Animated.Value(direction === "up" ? distance : direction === "down" ? -distance : 0)
  ).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanRender(true);
      const animations: Animated.CompositeAnimation[] = [];
      animations.push(
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: useNativeDriver,
        })
      );
      if (direction !== "none") {
        animations.push(
          Animated.timing(translateX, {
            toValue: 0,
            duration,
            useNativeDriver: useNativeDriver,
          })
        );
        animations.push(
          Animated.timing(translateY, {
            toValue: 0,
            duration,
            useNativeDriver: useNativeDriver,
          })
        );
      }
      Animated.parallel(animations).start();
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  if (!canRender) return null;

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform:
            direction === "none"
              ? undefined
              : [{ translateX }, { translateY }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};
