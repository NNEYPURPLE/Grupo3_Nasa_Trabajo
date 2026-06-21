import { useRef } from "react";
import { View, Text, Pressable, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, typography, spacing, shadows } from "../../design";

interface ActionCardProps {
  title: string;
  icon: string;
  gradient: readonly [string, string, ...string[]];
  onPress?: () => void;
  size?: "sm" | "md" | "lg";
}

const useNativeDriver = Platform.OS !== "web";

const sizeConfig = {
  sm: { height: 100, iconSize: 20, iconContainer: 36, fontSize: 13 },
  md: { height: 120, iconSize: 24, iconContainer: 44, fontSize: 14 },
  lg: { height: 140, iconSize: 28, iconContainer: 52, fontSize: 15 },
} as const;

export const ActionCard = ({
  title,
  icon,
  gradient,
  onPress,
  size = "md",
}: ActionCardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const config = sizeConfig[size];

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 0.94, friction: 6, tension: 200, useNativeDriver }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 200, useNativeDriver }),
    ]).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ flex: 1 }}>
      <Animated.View
        style={{
          height: config.height,
          borderRadius: radii.xl,
          overflow: "hidden",
          transform: [{ scale: scaleAnim }],
          ...shadows.md,
        }}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, padding: spacing.md, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: config.iconContainer,
              height: config.iconContainer,
              borderRadius: config.iconContainer / 2,
              backgroundColor: "rgba(255,255,255,0.2)",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: spacing.sm,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.25)",
            }}
          >
            <Ionicons name={icon as any} size={config.iconSize} color={colors.text.primary} />
          </View>
          <Text
            style={[
              typography.body,
              {
                color: colors.text.primary,
                fontWeight: "700",
                fontSize: config.fontSize,
                textAlign: "center",
              },
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};