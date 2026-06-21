import { useRef } from "react";
import { View, Text, Pressable, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, typography, spacing, shadows, glassStyles } from "../../design";

interface MissionCardProps {
  name: string;
  date: string;
  description: string;
  icon: string;
  status?: "active" | "completed" | "planned";
  onPress?: () => void;
}

const useNativeDriver = Platform.OS !== "web";

const statusConfig = {
  active: { color: colors.status.success, label: "Activa", icon: "pulse" },
  completed: { color: colors.accent.blue, label: "Completada", icon: "checkmark-circle" },
  planned: { color: colors.accent.amber, label: "Planificada", icon: "time" },
} as const;

export const MissionCard = ({
  name,
  date,
  description,
  icon,
  status = "active",
  onPress,
}: MissionCardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const config = statusConfig[status];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, friction: 6, tension: 200, useNativeDriver }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 200, useNativeDriver }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ flex: 1 }}>
      <Animated.View
        style={{
          ...glassStyles.card,
          ...shadows.sm,
          borderRadius: radii.xl,
          padding: spacing.lg,
          overflow: "hidden",
          transform: [{ scale: scaleAnim }],
        }}
      >
        <LinearGradient colors={[`${config.color}10`, "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
        <View style={{ position: "relative" }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: `${config.color}20`,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: spacing.md,
              borderWidth: 1,
              borderColor: `${config.color}30`,
            }}
          >
            <Ionicons name={icon as any} size={24} color={config.color} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs, marginBottom: spacing.xs }}>
            <Ionicons name={config.icon as any} size={10} color={config.color} />
            <Text style={[typography.overline, { color: config.color, letterSpacing: 1.5 }]}>{config.label}</Text>
          </View>
          <Text style={[typography.h4, { color: colors.text.primary, marginBottom: spacing.xs }]}>{name}</Text>
          <Text style={[typography.caption, { color: colors.text.muted, marginBottom: spacing.sm }]}>{date}</Text>
          <Text style={[typography.bodySmall, { color: colors.text.secondary, lineHeight: 20 }]} numberOfLines={2}>{description}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};