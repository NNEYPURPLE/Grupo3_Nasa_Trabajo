import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing, typography } from "../../design";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export const AppHeader = ({ title, subtitle }: AppHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + spacing.md,
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.lg,
        backgroundColor: colors.background.secondary,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.subtle,
      }}
    >
      <Text
        style={[typography.h2, { color: colors.text.primary }]}
        allowFontScaling={true}
        maxFontSizeMultiplier={1.2}
        accessibilityRole="header"
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            color: colors.text.secondary,
            fontSize: 13,
            marginTop: 2,
            lineHeight: 18,
          }}
          allowFontScaling={true}
          maxFontSizeMultiplier={1.2}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};
