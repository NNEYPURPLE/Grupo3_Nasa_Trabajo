import { useRef } from "react";
import { View, Text, Animated, Platform, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, typography, spacing, shadows } from "../../design";

interface PremiumStatCardProps {
  label: string;
  value?: string;
  icon: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "primary" | "cyan" | "teal" | "amber" | "rose";
  onPress?: () => void;
  compact?: boolean;
}

const useNativeDriver = Platform.OS !== "web";

const colorMap = {
  primary: { main: colors.primary[400], gradient: [colors.primary[600], colors.primary[800]] },
  cyan: { main: colors.accent.cyan, gradient: ["#0891B2", "#164E63"] },
  teal: { main: colors.accent.teal, gradient: ["#059669", "#064E3B"] },
  amber: { main: colors.accent.amber, gradient: ["#D97706", "#78350F"] },
  rose: { main: colors.accent.rose, gradient: ["#E11D48", "#881337"] },
} as const;

export const PremiumStatCard = ({
  label,
  value,
  icon,
  trend,
  trendValue,
  color = "primary",
  onPress,
  compact = false,
}: PremiumStatCardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const config = colorMap[color];

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, { toValue: 0.96, friction: 6, tension: 200, useNativeDriver }).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 200, useNativeDriver }).start();
  };

  const content = (
    <Animated.View
      style={{
        flex: 1,
        borderRadius: compact ? radii.lg : radii.xl,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.glass.border,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <LinearGradient
        colors={[`${config.main}15`, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          backgroundColor: colors.background.card,
          padding: compact ? spacing.md : spacing.lg,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: compact ? 36 : 44,
            height: compact ? 36 : 44,
            borderRadius: compact ? 10 : 12,
            backgroundColor: `${config.main}20`,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: `${config.main}30`,
          }}
        >
          <Ionicons name={icon as any} size={compact ? 18 : 22} color={config.main} />
        </View>

        <View style={{ marginTop: compact ? spacing.sm : spacing.md }}>
          {value ? (
            <Text style={[compact ? typography.numberSmall : typography.number, { color: colors.text.primary }]}>{value}</Text>
          ) : (
            <View style={{ width: 120, height: compact ? 18 : 28, borderRadius: 6, backgroundColor: colors.glass.medium }} />
          )}
          <Text style={[typography.caption, { color: colors.text.muted, marginTop: spacing.xxs }]}>{label}</Text>
        </View>

        {trend && trendValue && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: compact ? spacing.xs : spacing.sm }}>
            <Ionicons
              name={trend === "up" ? "trending-up" : trend === "down" ? "trending-down" : "remove"}
              size={12}
              color={trend === "up" ? colors.status.success : trend === "down" ? colors.status.error : colors.text.muted}
            />
            <Text
              style={[
                typography.overline,
                { color: trend === "up" ? colors.status.success : trend === "down" ? colors.status.error : colors.text.muted },
              ]}
            >
              {trendValue}
            </Text>
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ flex: 1 }}>
        {content}
      </Pressable>
    );
  }

  return content;
};