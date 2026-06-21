import { useMemo } from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radii, shadows } from "../../design";
import { useAnimationPress } from "../../hooks/useAnimationPress";

interface CosmicButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityHint?: string;
}

export const CosmicButton = ({
  title,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
  accessibilityHint,
}: CosmicButtonProps) => {
  const { scaleAnim, handlePressIn, handlePressOut } = useAnimationPress({
    scaleValue: 0.96,
  });

  const bgColor = useMemo(
    () =>
      variant === "primary"
        ? colors.nasa.blue
        : variant === "secondary"
        ? colors.background.surface
        : "transparent",
    [variant]
  );

  const borderColor = useMemo(
    () => (variant === "ghost" ? colors.border.subtle : "transparent"),
    [variant]
  );

  const textColor = useMemo(
    () =>
      variant === "ghost" ? colors.text.secondary : colors.text.primary,
    [variant]
  );

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.85}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityHint={accessibilityHint || "Presiona para continuar"}
        accessibilityState={{ disabled: disabled || loading }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing.sm,
          backgroundColor: disabled ? colors.background.surface : bgColor,
          borderWidth: variant === "ghost" ? 1 : 0,
          borderColor,
          paddingHorizontal: spacing.xl + 4,
          paddingVertical: spacing.md + 2,
          borderRadius: radii.lg,
          opacity: disabled ? 0.5 : 1,
          ...(variant === "primary" ? shadows.md : {}),
          ...style,
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.text.primary} />
        ) : (
          <>
            {icon && (
              <Ionicons
                name={icon}
                size={18}
                color={textColor}
              />
            )}
            <Text
              style={{
                color: textColor,
                fontSize: 15,
                fontWeight: "700",
                ...textStyle,
              }}
              allowFontScaling={true}
              maxFontSizeMultiplier={1.3}
            >
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
