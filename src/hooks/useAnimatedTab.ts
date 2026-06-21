import { useRef, useEffect } from "react";
import { Animated, Platform } from "react-native";

const useNativeDriver = Platform.OS !== "web";

export const useAnimatedTab = (activeIndex: number, totalTabs: number) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: activeIndex,
        friction: 8,
        tension: 60,
        useNativeDriver,
      }),
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.7, duration: 100, useNativeDriver }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver }),
      ]),
    ]).start();
  }, [activeIndex]);

  const getTabStyle = (index: number) => {
    const isActive = index === activeIndex;
    return {
      opacity: fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, isActive ? 1 : 0.6],
      }),
    };
  };

  return { slideAnim, getTabStyle };
};