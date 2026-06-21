import { useState } from "react";
import { View, Text, TextInput, Pressable, Platform, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, spacing, radii, typography } from "../../design";
import { useResponsiveDesign } from "../../hooks/useResponsiveDesign";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import SearchOverlay from "./SearchOverlay";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LEFT_SECTIONS = [
  { key: "inicio", label: "Inicio", icon: "home", screen: "Inicio" as const },
  { key: "informacion", label: "Informacion", icon: "newspaper", screen: "Información" as const },
  { key: "biblioteca", label: "Biblioteca", icon: "images", screen: "Biblioteca" as const },
  { key: "juego", label: "Juego", icon: "game-controller", screen: "Juego" as const },
];

const TopNav = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isMobile } = useResponsiveDesign();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const goTo = (screen: string, params?: any) => {
    setMenuOpen(false);
    navigation.navigate(screen as any, params);
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: isMobile ? spacing.md : spacing.xxl,
          paddingVertical: isMobile ? spacing.md : 14,
          backgroundColor: "#0A0A1A",
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255,255,255,0.06)",
          ...(Platform.OS === "web"
            ? { backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }
            : {}),
        }}
      >
        {!isMobile && (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "rgba(255,255,255,0.04)",
              borderRadius: radii.full,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.06)",
              padding: 3,
            }}
          >
            {LEFT_SECTIONS.map((s) => (
              <Pressable
                key={s.key}
                onPress={() => goTo(s.screen)}
                style={({ hovered }: any) => ({
                  paddingHorizontal: spacing.lg,
                  height: 34,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: radii.full,
                  backgroundColor: hovered ? "rgba(255,255,255,0.08)" : "transparent",
                })}
              >
                <Text
                  style={[
                    typography.caption,
                    {
                      color: colors.text.muted,
                      fontWeight: "500",
                      letterSpacing: 0.3,
                      fontSize: 12,
                    },
                  ]}
                >
                  {s.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {isMobile && (
          <Pressable
            onPress={() => setMenuOpen(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: radii.sm,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.04)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <Ionicons name="menu" size={22} color={colors.text.primary} />
          </Pressable>
        )}

        <Pressable
          onPress={() => goTo("Inicio")}
          style={{ position: "absolute", left: "50%", transform: [{ translateX: -50 }], flexDirection: "row", alignItems: "center", gap: spacing.sm }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: radii.sm,
              backgroundColor: "rgba(255,255,255,0.08)",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <Ionicons name="compass" size={16} color={colors.text.primary} />
          </View>
          <Text
            style={[
              typography.h4,
              { color: colors.text.primary, letterSpacing: 3, fontWeight: "800" },
            ]}
          >
            NOVA
          </Text>
        </Pressable>

        {!isMobile && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: radii.sm,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.08)",
              paddingHorizontal: spacing.sm,
              height: 34,
              width: 220,
            }}
          >
            <Ionicons name="search" size={14} color={colors.text.muted} style={{ marginRight: spacing.xs }} />
            <TextInput
              placeholder="Explorar"
              placeholderTextColor={colors.text.muted}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => goTo("Explorar", { query: searchText })}
              returnKeyType="search"
              style={{
                flex: 1,
                fontSize: 13,
                color: colors.text.primary,
                outlineStyle: "none" as any,
              }}
            />
          </View>
        )}

        {isMobile && (
          <Pressable
            onPress={() => setSearchOverlayOpen(true)}
            style={{
              width: 44,
              height: 44,
              borderRadius: radii.sm,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.04)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <Ionicons name="search" size={24} color={colors.text.primary} />
          </Pressable>
        )}
      </View>

      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-start", paddingTop: Platform.OS === "ios" ? 60 : 48 }}
          onPress={() => setMenuOpen(false)}
        >
          <View
            style={{
              marginHorizontal: spacing.md,
              backgroundColor: "rgba(14,14,30,0.97)",
              borderRadius: radii.xl,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.08)",
              overflow: "hidden",
              ...(Platform.OS === "web"
                ? { boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }
                : { shadowColor: "#000", shadowOpacity: 0.5, shadowRadius: 20, elevation: 20 }),
            }}
          >
            {LEFT_SECTIONS.map((item, i, arr) => (
              <Pressable
                key={item.key}
                onPress={() => goTo(item.screen)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.md,
                  paddingHorizontal: spacing.xl,
                  paddingVertical: spacing.lg,
                  backgroundColor: pressed ? "rgba(255,255,255,0.06)" : "transparent",
                  borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                  borderBottomColor: "rgba(255,255,255,0.06)",
                })}
              >
                <Ionicons name={item.icon as any} size={18} color={colors.text.muted} />
                <Text style={[typography.body, { color: colors.text.secondary, fontWeight: "500" }]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <SearchOverlay visible={searchOverlayOpen} onClose={() => setSearchOverlayOpen(false)} />
    </>
  );
};

export default TopNav;
