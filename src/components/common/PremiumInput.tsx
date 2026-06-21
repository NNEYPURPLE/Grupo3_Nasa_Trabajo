import { useRef, useState } from "react";
import { View, TextInput, Animated, Platform, ViewStyle, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, typography, spacing, glassStyles, shadows } from "../../design";

interface PremiumInputProps extends TextInputProps {
  icon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  variant?: "default" | "search" | "glass";
  size?: "sm" | "md" | "lg";
  containerStyle?: ViewStyle;
}

const sizeConfig = {
  sm: { height: 40, fontSize: 13, paddingHorizontal: 12, iconSize: 16 },
  md: { height: 48, fontSize: 15, paddingHorizontal: 16, iconSize: 18 },
  lg: { height: 56, fontSize: 16, paddingHorizontal: 20, iconSize: 20 },
} as const;

export const PremiumInput = ({
  icon,
  rightIcon,
  onRightIconPress,
  variant = "default",
  size = "md",
  containerStyle,
  ...props
}: PremiumInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;
  const config = sizeConfig[size];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
    props.onFocus?.({} as any);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderAnim, { toValue: 0, duration: 250, useNativeDriver: false }).start();
    props.onBlur?.({} as any);
  };

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      height: config.height,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: radii.lg,
      borderWidth: 1,
    };

    switch (variant) {
      case "search":
        return {
          ...base,
          ...glassStyles.light,
          backgroundColor: colors.glass.light,
        };
      case "glass":
        return {
          ...base,
          ...glassStyles.medium,
          backgroundColor: colors.glass.medium,
        };
      default:
        return {
          ...base,
          backgroundColor: colors.background.card,
          borderColor: colors.border.subtle,
        };
    }
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border.subtle, colors.primary[400]],
  });

  return (
    <Animated.View
      style={[
        getContainerStyle(),
        {
          borderColor,
          paddingHorizontal: config.paddingHorizontal,
        },
        isFocused && shadows.glowPrimary,
        containerStyle,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon as any}
          size={config.iconSize}
          color={isFocused ? colors.text.accent : colors.text.muted}
          style={{ marginRight: spacing.sm }}
        />
      )}
      <TextInput
        {...props}
        placeholderTextColor={colors.text.muted}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          {
            flex: 1,
            color: colors.text.primary,
            fontSize: config.fontSize,
            fontFamily: Platform.OS === "web" ? "'Inter', sans-serif" : undefined,
            paddingVertical: 0,
          },
          props.style,
        ]}
      />
      {rightIcon && (
        <Ionicons
          name={rightIcon as any}
          size={config.iconSize}
          color={colors.text.muted}
          onPress={onRightIconPress}
          style={{ marginLeft: spacing.sm }}
        />
      )}
    </Animated.View>
  );
};