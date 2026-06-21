import { Platform, type ViewStyle } from "react-native";
import type { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { colors, radii, shadows } from "../../design";

interface GlassCardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  intensity?: "light" | "medium" | "heavy";
  glowColor?: string;
}

const getBg = (intensity: string) => {
  const alphas = { light: "0.03", medium: "0.06", heavy: "0.1" };
  return `rgba(255, 255, 255, ${alphas[intensity as keyof typeof alphas] || alphas.medium})`;
};

const isWeb = Platform.OS === "web";

export const GlassCard = ({
  children,
  onPress,
  style,
  intensity = "medium",
  glowColor,
}: GlassCardProps) => {
  const cardStyle: ViewStyle = {
    backgroundColor: getBg(intensity),
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    ...(isWeb ? ({ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" } as any) : {}),
    ...(glowColor
      ? isWeb
        ? { boxShadow: `0 0 20px ${glowColor}40, 0 4px 12px rgba(0,0,0,0.2)` }
        : { elevation: 10 }
      : shadows.md),
    ...style,
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={cardStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <TouchableOpacity activeOpacity={1} style={cardStyle}>{children}</TouchableOpacity>;
};
