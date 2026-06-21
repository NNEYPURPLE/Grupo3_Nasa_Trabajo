import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useResponsiveDesign } from "../../hooks/useResponsiveDesign";
import { colors } from "../../design";

interface ResponsiveHeaderProps {
  title: string;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
}

export const ResponsiveHeader = ({
  title,
  onMenuPress,
  onSearchPress,
}: ResponsiveHeaderProps) => {
  const { isMobile, isTablet, isDesktop, select } = useResponsiveDesign();
  const paddingHorizontal = select({ mobile: 16, tablet: 24, desktop: 32 });
  const height = select({ mobile: 56, tablet: 64, desktop: 72 });

  return (
    <View
      style={[
        {
          height,
          paddingHorizontal,
          backgroundColor: colors.background.secondary,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: colors.background.surface,
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {isMobile && onMenuPress && (
          <TouchableOpacity onPress={onMenuPress}>
            <Ionicons name="menu" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: colors.text.primary,
            fontSize: isMobile ? 18 : isTablet ? 20 : 22,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
      </View>
      {onSearchPress && (
        <TouchableOpacity onPress={onSearchPress}>
          <Ionicons name="search" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};
