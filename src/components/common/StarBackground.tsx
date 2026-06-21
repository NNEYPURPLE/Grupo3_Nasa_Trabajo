import { useEffect, useRef, useMemo } from "react";
import { View, Animated, Dimensions, Platform } from "react-native";

const useNativeDriver = Platform.OS !== "web";

interface StarBackgroundProps {
  count?: number;
}

export const StarBackground = ({ count = 25 }: StarBackgroundProps) => {
  const dims = Dimensions.get("window");
  const anims = useRef<Animated.Value[]>([]);

  const stars = useMemo(() => {
    const arr: { x: number; y: number; size: number; dur: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * dims.width,
        y: Math.random() * dims.height,
        size: 1 + Math.random() * 2,
        dur: 2000 + Math.random() * 3000,
      });
      anims.current[i] = new Animated.Value(0.2 + Math.random() * 0.3);
    }
    return arr;
  }, []);

  useEffect(() => {
    const anims_list = stars.map((s, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anims.current[i], { toValue: 0.9, duration: s.dur * 0.5, useNativeDriver }),
          Animated.timing(anims.current[i], { toValue: 0.2, duration: s.dur * 0.5, useNativeDriver }),
        ])
      )
    );
    const composite = Animated.stagger(120, anims_list);
    composite.start();
    return () => composite.stop();
  }, []);

  return (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
      {stars.map((s, i) => (
        <Animated.View
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: s.size / 2,
            backgroundColor: "rgba(255,255,255,0.9)",
            opacity: anims.current[i],
          }}
        />
      ))}
    </View>
  );
};
