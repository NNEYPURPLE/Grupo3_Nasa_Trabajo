import { type ReactNode } from "react";
import {
  TouchableOpacity,
  Animated,
  ViewStyle,
} from "react-native";
import { colors, radii, shadows } from "../../design";
import { useAnimationPress } from "../../hooks/useAnimationPress";

interface CosmicCardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  noPadding?: boolean;
  accessibilityLabel?: string;
}

export const CosmicCard = ({
  children,
  onPress,
  style,
  noPadding,
  accessibilityLabel,
}: CosmicCardProps) => {
  const { scaleAnim, handlePressIn, handlePressOut } = useAnimationPress({
    scaleValue: 0.97,
  });

  const containerStyle: ViewStyle = {
    backgroundColor: colors.background.card,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    overflow: "hidden",
    ...(onPress ? shadows.md : shadows.sm),
  };

  if (onPress) {
    return (
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint="Presiona para más información"
          style={[containerStyle, style]}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[containerStyle, style]}>
      {children}
    </Animated.View>
  );
};
