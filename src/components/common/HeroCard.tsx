import { useRef } from "react";
import { View, Text, Pressable, Animated, Platform, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, typography, spacing, shadows } from "../../design";
import { useResponsiveDesign } from "../../hooks/useResponsiveDesign";

interface HeroCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  badge?: string;
  onPress?: () => void;
  aspectRatio?: number;
}

const useNativeDriver = Platform.OS !== "web";

export const HeroCard = ({
  title,
  description,
  imageUrl,
  badge,
  onPress,
  aspectRatio = 16 / 9,
}: HeroCardProps) => {
  const { isMobile } = useResponsiveDesign();
  const { width } = useWindowDimensions();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 0.98, friction: 8, tension: 200, useNativeDriver }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, tension: 200, useNativeDriver }),
    ]).start();
  };

  const imageHeight = isMobile ? 200 : 320;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          borderRadius: radii.xl,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.glass.border,
          ...shadows.lg,
        }}
      >
        <View style={{ position: "relative", height: imageHeight }}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={500}
            accessibilityLabel={title}
          />
          <LinearGradient
            colors={["transparent", "rgba(3, 0, 20, 0.4)", "rgba(3, 0, 20, 0.8)", "rgba(3, 0, 20, 0.95)"]}
            locations={[0, 0.3, 0.7, 1]}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "70%" }}
          />

          {badge && (
            <View
              style={{
                position: "absolute",
                top: spacing.md,
                left: spacing.md,
                backgroundColor: colors.primary[500],
                paddingHorizontal: spacing.sm,
                paddingVertical: spacing.xs,
                borderRadius: radii.sm,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                ...shadows.glowPrimary,
              }}
            >
              <Ionicons name="star" size={10} color={colors.text.primary} />
              <Text style={[typography.overline, { color: colors.text.primary, letterSpacing: 1 }]}>
                {badge}
              </Text>
            </View>
          )}

          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: spacing.xl }}>
            <Text
              style={[isMobile ? typography.h3 : typography.h2, { color: colors.text.primary, letterSpacing: -0.5 }]}
              numberOfLines={2}
            >
              {title}
            </Text>
            {description && (
              <Text
                style={[typography.body, { color: colors.text.secondary, marginTop: spacing.sm, lineHeight: 22 }]}
                numberOfLines={isMobile ? 2 : 3}
              >
                {description}
              </Text>
            )}
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.md }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.xs,
                  backgroundColor: colors.glass.medium,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.xs,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: colors.glass.border,
                }}
              >
                <Ionicons name="arrow-forward" size={14} color={colors.text.primary} />
                <Text style={[typography.caption, { color: colors.text.primary, fontWeight: "600" }]}>
                  Explorar
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs }}>
                <Ionicons name="heart-outline" size={16} color={colors.text.secondary} />
                <Ionicons name="share-outline" size={16} color={colors.text.secondary} />
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};