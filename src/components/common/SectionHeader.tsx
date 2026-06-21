import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography, spacing } from "../../design";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
  color?: string;
}

export const SectionHeader = ({
  title,
  subtitle,
  icon,
  actionLabel,
  onAction,
  color = colors.primary[400],
}: SectionHeaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.lg,
        marginTop: spacing.xxl,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        <View style={{ width: 3, height: 20, borderRadius: 2, backgroundColor: color }} />
        {icon && <Ionicons name={icon as any} size={16} color={color} />}
        <View>
          <Text style={[typography.h4, { color: colors.text.primary, letterSpacing: -0.2 }]}>{title}</Text>
          {subtitle && <Text style={[typography.caption, { color: colors.text.muted, marginTop: 2 }]}>{subtitle}</Text>}
        </View>
      </View>

      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.xs,
            borderRadius: 20,
          }}
        >
          <Text style={[typography.caption, { color: colors.text.accent, fontWeight: "600" }]}>{actionLabel}</Text>
          <Ionicons name="arrow-forward" size={12} color={colors.text.accent} />
        </Pressable>
      )}
    </View>
  );
};