import { useRef, useEffect, useState } from "react";
import { View, Text, Pressable, Animated, Platform, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography, spacing, radii, shadows } from "../../design";
import { useResponsiveDesign } from "../../hooks/useResponsiveDesign";

interface Tab {
  key: string;
  label: string;
  icon: string;
}

interface PremiumHeaderProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  logo?: string;
}

const useNativeDriver = Platform.OS !== "web";

export const PremiumHeader = ({ tabs, activeTab, onTabChange, logo }: PremiumHeaderProps) => {
  const { isMobile } = useResponsiveDesign();
  const { width: screenWidth } = useWindowDimensions();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingTop: Platform.OS === "ios" ? 50 : 36,
      }}
    >
      <View
        style={{
          marginHorizontal: isMobile ? spacing.md : spacing.xxl,
          marginBottom: spacing.md,
          backgroundColor: colors.glass.medium,
          borderRadius: radii.xl,
          borderWidth: 1,
          borderColor: colors.glass.border,
          overflow: "hidden",
          ...shadows.md,
        }}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.04)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%" }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: isMobile ? spacing.md : spacing.xl,
            paddingVertical: isMobile ? spacing.sm : spacing.md,
          }}
        >
          {/* Logo - Left */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: radii.sm,
                backgroundColor: colors.primary[500],
                justifyContent: "center",
                alignItems: "center",
                ...shadows.glowPrimary,
              }}
            >
              <Ionicons name="compass" size={18} color={colors.text.primary} />
            </View>
            {!isMobile && (
              <Text style={[typography.h4, { color: colors.text.primary, letterSpacing: -0.3 }]}>
                {logo || "NASA"}
              </Text>
            )}
          </View>

          {/* Tabs - Center (Nova style glassmorphism pill) */}
          {!isMobile && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.glass.ultraLight,
                  borderRadius: radii.md,
                  borderWidth: 1,
                  borderColor: colors.glass.border,
                  padding: 3,
                }}
              >
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;
                  const isHovered = hoveredTab === tab.key;
                  return (
                    <Pressable
                      key={tab.key}
                      onPress={() => onTabChange(tab.key)}
                      onHoverIn={() => setHoveredTab(tab.key)}
                      onHoverOut={() => setHoveredTab(null)}
                      style={{
                        paddingHorizontal: spacing.lg,
                        height: 36,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 6,
                        borderRadius: radii.sm - 1,
                        backgroundColor: isActive
                          ? colors.glass.medium
                          : isHovered
                          ? colors.glass.light
                          : "transparent",
                        borderWidth: isActive ? 1 : 0,
                        borderColor: isActive ? colors.glass.borderMedium : "transparent",
                      }}
                    >
                      <Ionicons
                        name={tab.icon as any}
                        size={14}
                        color={isActive ? colors.text.primary : colors.text.muted}
                      />
                      <Text
                        style={[
                          typography.caption,
                          {
                            color: isActive ? colors.text.primary : colors.text.muted,
                            fontWeight: isActive ? "700" : "500",
                            letterSpacing: 0.3,
                          },
                        ]}
                      >
                        {tab.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* Actions - Right */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Pressable
              style={{
                width: 36,
                height: 36,
                borderRadius: radii.sm,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="search" size={18} color={colors.text.secondary} />
            </Pressable>
            <Pressable
              style={{
                width: 36,
                height: 36,
                borderRadius: radii.sm,
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Ionicons name="notifications-outline" size={18} color={colors.text.secondary} />
              <View
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colors.status.error,
                  borderWidth: 2,
                  borderColor: colors.background.primary,
                }}
              />
            </Pressable>
            <Pressable
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: colors.glass.light,
                borderWidth: 2,
                borderColor: colors.primary[400],
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Ionicons name="person" size={16} color={colors.text.primary} />
            </Pressable>
          </View>
        </View>

        {/* Mobile bottom tabs */}
        {isMobile && (
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 1,
              borderTopColor: colors.glass.border,
              paddingVertical: spacing.xs,
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <Pressable
                  key={tab.key}
                  onPress={() => onTabChange(tab.key)}
                  style={{
                    flex: 1,
                    paddingVertical: spacing.sm,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <Ionicons name={tab.icon as any} size={20} color={isActive ? colors.primary[400] : colors.text.muted} />
                  <Text
                    style={[
                      typography.overline,
                      { color: isActive ? colors.primary[400] : colors.text.muted, fontWeight: isActive ? "700" : "500" },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};