import React from "react";
import { View, Text, useWindowDimensions, Platform } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, spacing, shadows } from "../../design";
import { useResponsiveDesign } from "../../hooks/useResponsiveDesign";

interface HeroVisualProps {
  imageUrl?: string | null;
  alt?: string;
}

// HeroVisual: a large right-aligned visual with layered gradients,
// circular crop and atmospheric glow. Uses provided imageUrl or an elegant placeholder.
export const HeroVisual = ({ imageUrl, alt }: HeroVisualProps) => {
  const { width } = useWindowDimensions();
  const { isMobile, isDesktop } = useResponsiveDesign();
  const size = isMobile ? Math.min(260, width * 0.45) : Math.min(520, width * 0.45);

  return (
    <View
      style={{
        position: "absolute",
        right: isMobile ? 16 : 40,
        top: isMobile ? 120 : 80,
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "visible",
        zIndex: 0,
      }}
      pointerEvents="none"
    >
      {/* soft ambient glow */}
      <View
        style={{
          position: "absolute",
          left: -size * 0.25,
          top: -size * 0.25,
          width: size * 1.5,
          height: size * 1.5,
          borderRadius: (size * 1.5) / 2,
          backgroundColor: colors.nebula.blue,
          opacity: 0.18,
          ...shadows.glowSoft,
          transform: [{ scale: 1 }],
        }}
      />

      {/* layered dark vignette to create depth */}
      <LinearGradient
        colors={["transparent", "rgba(3,0,20,0.6)"]}
        style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, borderRadius: size / 2 }}
      />

      {/* main circular image or placeholder */}
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.glass.border,
          backgroundColor: colors.background.surface,
          ...shadows.lg,
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={600}
            accessibilityLabel={alt || "Hero visual"}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: spacing.md }}>
            <LinearGradient
              colors={["rgba(255,255,255,0.03)", "transparent"]}
              style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}
            />
            <Text style={{ color: colors.text.muted, textAlign: "center" }}>No visual available</Text>
          </View>
        )}

        {/* subtle rim light */}
        <LinearGradient
          colors={["rgba(255,255,255,0.06)", "transparent"]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={{ position: "absolute", left: 0, top: 0, right: 0, height: "40%" }}
        />

        {/* additional atmospheric overlay */}
        <View style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: "35%", backgroundColor: "rgba(3,0,20,0.25)" }} />
      </View>

      {/* foreground particle / ring hint to add depth */}
      <View
        style={{
          position: "absolute",
          left: -size * 0.08,
          top: size * 0.45,
          width: size * 1.16,
          height: size * 0.08,
          borderRadius: 40,
          backgroundColor: "rgba(255,255,255,0.02)",
          transform: [{ rotate: "-12deg" }],
        }}
      />
    </View>
  );
};
