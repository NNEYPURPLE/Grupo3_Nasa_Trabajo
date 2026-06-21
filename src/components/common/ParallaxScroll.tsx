import { createContext, useContext, useRef, type ReactNode } from "react";
import { Animated, Platform, type ScrollViewProps } from "react-native";

const useNativeDriver = Platform.OS !== "web";

interface ParallaxScrollProps extends ScrollViewProps {
  children: ReactNode;
}

const ParallaxContext = createContext<Animated.Value>(new Animated.Value(0));

export const ParallaxScroll = ({
  children,
  ...scrollProps
}: ParallaxScrollProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <ParallaxContext.Provider value={scrollY}>
      <Animated.ScrollView
        {...scrollProps}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver }
        )}
      >
        {children}
      </Animated.ScrollView>
    </ParallaxContext.Provider>
  );
};

export const useParallax = (factor: number = 0.3) => {
  const scrollY = useContext(ParallaxContext);
  const translateY = scrollY.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [-300 * factor, 0, 300 * factor],
    extrapolate: "clamp",
  });
  return { transform: [{ translateY }] };
};
