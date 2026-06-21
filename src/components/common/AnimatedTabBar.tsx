import { useRef, useEffect, memo } from "react";
import { View, Text, TouchableOpacity, Animated, useWindowDimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../../design";

const useNativeDriver = Platform.OS !== "web";

const TABS = [
  { key: "Inicio", icon: "home-outline", iconActive: "home" },
  { key: "Información", icon: "newspaper-outline", iconActive: "newspaper" },
  { key: "Explorar", icon: "rocket-outline", iconActive: "rocket" },
  { key: "Biblioteca", icon: "images-outline", iconActive: "images" },
  { key: "Juego", icon: "game-controller-outline", iconActive: "game-controller" },
];

const TabButton = memo(function TabButton({
  route,
  tab,
  isFocused,
  onPress,
  onLayout,
}: {
  route: any;
  tab: typeof TABS[number];
  isFocused: boolean;
  onPress: () => void;
  onLayout: (e: any) => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const labelOpacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    if (isFocused) {
      scale.setValue(0.85);
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 180,
        useNativeDriver,
      }).start();
    }
  }, [isFocused]);

  useEffect(() => {
    Animated.timing(labelOpacity, {
      toValue: isFocused ? 1 : 0.4,
      duration: 200,
      useNativeDriver,
    }).start();
  }, [isFocused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 6,
      }}
      onLayout={onLayout}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons
          name={(isFocused ? tab.iconActive : tab.icon) as any}
          size={22}
          color={isFocused ? colors.text.primary : colors.text.muted}
        />
      </Animated.View>
      <Animated.Text
        style={{
          fontSize: 10,
          fontWeight: isFocused ? "700" : "500",
          color: isFocused ? colors.text.primary : colors.text.muted,
          marginTop: 4,
          opacity: labelOpacity,
        }}
      >
        {route.name}
      </Animated.Text>
    </TouchableOpacity>
  );
});

export const AnimatedTabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const { width: screenW } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const tabW = screenW / state.routes.length;

  const indicatorPos = useRef(new Animated.Value(0)).current;
  const orbPos = useRef(new Animated.Value(0)).current;
  const orbScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const target = state.index * tabW + tabW / 2 - 22;
    const indicatorTarget = state.index * tabW + (tabW - 40) / 2;
    Animated.spring(orbPos, {
      toValue: target,
      friction: 6,
      tension: 100,
      useNativeDriver,
    }).start();
    Animated.spring(indicatorPos, {
      toValue: indicatorTarget,
      friction: 8,
      tension: 120,
      useNativeDriver,
    }).start();
    orbScale.setValue(0.7);
    Animated.spring(orbScale, {
      toValue: 1,
      friction: 3,
      tension: 200,
      useNativeDriver,
    }).start();
  }, [state.index, tabW]);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Platform.select({
          web: "rgba(10,8,30,0.85)",
          default: "rgba(10,8,30,0.95)",
        }),
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
        paddingBottom: Math.max(insets.bottom, 4),
        paddingTop: 0,
        height: 56 + Math.max(insets.bottom, 4),
        position: "relative",
        ...(Platform.OS === "web"
          ? { backdropFilter: "blur(20px)" as any }
          : {}),
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 8,
          left: 0,
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: "rgba(56,189,248,0.08)",
          transform: [{ translateX: orbPos }, { scale: orbScale }],
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          bottom: Math.max(insets.bottom, 4) + 20,
          left: 0,
          width: 40,
          height: 3,
          borderRadius: 2,
          backgroundColor: colors.accent.cyan,
          transform: [{ translateX: indicatorPos }],
          ...(Platform.OS === "web"
            ? {
                boxShadow: "0 0 10px rgba(56,189,248,0.6), 0 0 20px rgba(56,189,248,0.3)",
              }
            : { elevation: 6 }),
        }}
      />
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const tab = TABS[index] || TABS[0];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton
            key={route.key}
            route={route}
            tab={tab}
            isFocused={isFocused}
            onPress={onPress}
            onLayout={() => {}}
          />
        );
      })}
    </View>
  );
};
