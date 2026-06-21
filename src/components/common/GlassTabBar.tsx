import { useState } from "react";
import { View, Pressable, Text, Animated, Platform, ViewStyle } from "react-native";
import { colors, radii, typography, spacing, glassStyles } from "../../design";

interface GlassTabBarProps {
  tabs: { key: string; label: string; icon: string }[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export const GlassTabBar = ({ tabs, activeTab, onTabChange }: GlassTabBarProps) => {
  return (
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
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            style={{
              flex: 1,
              height: 36,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: radii.sm - 1,
              backgroundColor: isActive ? colors.glass.medium : "transparent",
              borderWidth: isActive ? 1 : 0,
              borderColor: isActive ? colors.glass.borderMedium : "transparent",
            }}
          >
            <Text
              style={[
                typography.caption,
                {
                  color: isActive ? colors.text.primary : colors.text.muted,
                  fontWeight: isActive ? "700" : "500",
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};