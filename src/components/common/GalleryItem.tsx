import { useRef } from "react";
import { View, Text, Pressable, Animated, Platform } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, typography, spacing, shadows } from "../../design";

interface GalleryItemProps {
  title: string;
  imageUrl: string;
  category?: string;
  onPress?: () => void;
  width: number;
}

const useNativeDriver = Platform.OS !== "web";

export const GalleryItem = ({ title, imageUrl, category, onPress, width }: GalleryItemProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const imageHeight = width * 0.75;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, friction: 6, tension: 200, useNativeDriver }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 200, useNativeDriver }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ width, marginRight: spacing.md }}
    >
      <Animated.View
        style={{
          borderRadius: radii.lg,
          overflow: "hidden",
          backgroundColor: colors.background.card,
          borderWidth: 1,
          borderColor: colors.glass.border,
          ...shadows.sm,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <View style={{ position: "relative", height: imageHeight }}>
          <Image source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} contentFit="cover" transition={400} accessibilityLabel={title} />
          <LinearGradient colors={["transparent", "rgba(3, 0, 20, 0.85)"]} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%" }} />
          {category && (
            <View
              style={{
                position: "absolute",
                top: spacing.sm,
                right: spacing.sm,
                backgroundColor: colors.glass.medium,
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xxs,
                borderRadius: radii.sm,
                borderWidth: 1,
                borderColor: colors.glass.border,
              }}
            >
              <Text style={[typography.overline, { color: colors.text.primary, letterSpacing: 0.5 }]}>{category.toUpperCase()}</Text>
            </View>
          )}
        </View>
        <View style={{ padding: spacing.md }}>
          <Text style={[typography.bodySmall, { color: colors.text.primary, fontWeight: "600" }]} numberOfLines={2}>{title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs, marginTop: spacing.xs }}>
            <Ionicons name="eye-outline" size={12} color={colors.text.muted} />
            <Text style={[typography.overline, { color: colors.text.muted, letterSpacing: 0.3 }]}>Ver detalle</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};