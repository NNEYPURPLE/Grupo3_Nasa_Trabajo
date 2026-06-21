import { useState, useCallback, useEffect } from "react";
import { View, Animated, StyleSheet, Platform } from "react-native";
import { colors } from "../../design";

const useNativeDriver = Platform.OS !== "web";

interface Particle {
  id: number;
  x: number;
  y: number;
  anim: Animated.Value;
  dx: number;
  dy: number;
  size: number;
  hue: string;
}

const PARTICLE_COLORS = [
  colors.accent.cyan,
  colors.accent.orange,
  colors.accent.teal,
  colors.accent.gold,
  colors.nasa.blueLight,
  colors.text.primary,
  colors.accent.purple,
  colors.accent.coral,
  colors.accent.lime,
  colors.accent.pink,
];

let nextId = 0;

const Particle = ({ p, onDone }: { p: Particle; onDone: (id: number) => void }) => {
  const opacity = p.anim.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 1, 0],
  });
  const scale = p.anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });
  const tx = p.anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, p.dx],
  });
  const ty = p.anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, p.dy],
  });

  useEffect(() => {
    Animated.timing(p.anim, {
      toValue: 1,
      duration: 500 + Math.random() * 400,
      useNativeDriver,
    }).start(() => onDone(p.id));
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: p.x - p.size / 2,
        top: p.y - p.size / 2,
        width: p.size,
        height: p.size,
        borderRadius: p.size / 2,
        backgroundColor: p.hue,
        opacity,
        transform: [{ scale }, { translateX: tx }, { translateY: ty }],
      }}
    />
  );
};

export const useParticleBurst = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const burstAt = useCallback((x: number, y: number) => {
    const count = 6 + Math.floor(Math.random() * 6);
    const newP: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const speed = 30 + Math.random() * 70;
      newP.push({
        id: nextId++,
        x, y,
        anim: new Animated.Value(0),
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4,
        hue: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      });
    }
    setParticles((prev) => [...prev.slice(-20), ...newP]);
  }, []);

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const renderParticles = particles.length > 0 ? (
    <View style={[StyleSheet.absoluteFill, { pointerEvents: "none" }]}>
      {particles.map((p) => (
        <Particle key={p.id} p={p} onDone={removeParticle} />
      ))}
    </View>
  ) : null;

  return { burstAt, renderParticles };
};
