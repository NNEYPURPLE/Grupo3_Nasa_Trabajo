import { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, CommonActions } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, spacing, radii, shadows, typography } from "../design";
import { StarBackground } from "../components/common/StarBackground";
import { useApod } from "../hooks/useApod";
import { useNASASearch } from "../hooks/useNASASearch";
import { useNearEarthAsteroids } from "../hooks/useNearEarthAsteroids";
import { useResponsiveDesign } from "../hooks/useResponsiveDesign";
import type { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OrbitalRing = ({
  size,
  rotation,
  opacity,
}: {
  size: number;
  rotation: string;
  opacity: number;
}) => (
  <View
    style={{
      position: "absolute",
      width: size,
      height: size * 0.3,
      borderRadius: size / 2,
      borderWidth: 1,
      borderColor: `rgba(56,189,248,${opacity})`,
      top: "50%",
      left: "50%",
      transform: [
        { translateX: -size / 2 },
        { translateY: -(size * 0.3) / 2 },
        { rotateX: "68deg" },
        { rotateZ: rotation },
      ],
    }}
  />
);

const DashboardHome = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isMobile, isDesktop } = useResponsiveDesign();
  const { data: apod, isLoading: apodLoading, error: apodError, refetch: refetchApod } = useApod();
  const { results: searchResults, isLoading: searchLoading } = useNASASearch("earth planet nebula");
  const {
    totalCount: asteroidCount,
    hazardousCount,
    isLoading: asteroidsLoading,
  } = useNearEarthAsteroids();

  const galleryItems = useMemo(() => {
    if (searchResults && searchResults.length > 0) {
      return searchResults.slice(0, 10).map((item) => ({
        title: item.data[0]?.title || "",
        image: item.links?.[0]?.href || "",
      }));
    }
    return [];
  }, [searchResults]);

  const handleNavigate = (screen: string) => {
    navigation.dispatch(CommonActions.navigate({ name: "MainTabs" }));
    setTimeout(() => navigation.dispatch(CommonActions.navigate({ name: screen })), 50);
  };

  const pH = isMobile ? spacing.md : spacing.xxl;

  if (apodLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
        <StarBackground count={20} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: "rgba(255,255,255,0.08)",
              borderTopColor: colors.accent.cyan,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      {isDesktop && <StarBackground count={40} />}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing.huge }}
        showsVerticalScrollIndicator={false}
      >
        {apodError ? (
          <View
            style={{
              margin: pH,
              marginTop: spacing.lg,
              padding: spacing.xl,
              backgroundColor: "rgba(239,68,68,0.06)",
              borderRadius: radii.lg,
              borderWidth: 1,
              borderColor: "rgba(239,68,68,0.15)",
              alignItems: "center",
            }}
          >
            <Ionicons name="cloud-offline" size={32} color={colors.status.error} />
            <Text
              style={[
                typography.body,
                { color: colors.text.secondary, marginTop: spacing.sm, textAlign: "center" },
              ]}
            >
              Could not load NASA data
            </Text>
            <Pressable
              onPress={refetchApod}
              style={({ pressed }) => ({
                marginTop: spacing.md,
                paddingHorizontal: spacing.xl,
                paddingVertical: spacing.sm,
                backgroundColor: colors.nasa.blue,
                borderRadius: radii.md,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text style={[typography.body, { color: colors.text.primary, fontWeight: "700" }]}>
                RETRY
              </Text>
            </Pressable>
          </View>
        ) : null}

        {/* ═══════════════════════════════════════════
            HERO: Two-column split
            Left: APOD title + explanation + CTAs
            Right: APOD image + orbital rings
        ═══════════════════════════════════════════ */}
        <View
          style={{
            paddingHorizontal: pH,
            paddingTop: isMobile ? spacing.lg : spacing.xl,
          }}
        >
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              minHeight: isMobile ? undefined : 480,
              gap: isMobile ? 0 : spacing.xl,
            }}
          >
            {/* ─── LEFT: Text Column ─── */}
            <View
              style={{
                flex: isMobile ? undefined : 1,
                justifyContent: "center",
                paddingVertical: isMobile ? spacing.xl : 0,
                zIndex: 2,
              }}
            >
              {apod?.date && (
                <Text
                  style={[
                    typography.overline,
                    {
                      color: colors.text.muted,
                      letterSpacing: 2,
                      marginBottom: spacing.xl,
                    },
                  ]}
                >
                  {apod.date}
                </Text>
              )}

              <Text
                style={[
                  typography.h1,
                  {
                    color: colors.text.primary,
                    fontSize: isMobile ? 34 : 50,
                    lineHeight: isMobile ? 40 : 58,
                    letterSpacing: -1.5,
                  },
                ]}
                numberOfLines={isMobile ? 3 : 4}
              >
                {apod?.title || ""}
              </Text>

              {apod?.explanation ? (
                <Text
                  style={[
                    typography.body,
                    {
                      color: colors.text.secondary,
                      marginTop: spacing.lg,
                      maxWidth: 440,
                      lineHeight: 22,
                    },
                  ]}
                  numberOfLines={isMobile ? 3 : 4}
                >
                  {apod.explanation}
                </Text>
              ) : null}

              {apod && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: spacing.md,
                    marginTop: spacing.xl,
                  }}
                >
                  <Pressable
                    onPress={() => navigation.navigate("Detail", { item: apod })}
                    style={({ pressed }) => ({
                      flexDirection: "row",
                      alignItems: "center",
                      gap: spacing.sm,
                      backgroundColor: "rgba(255,255,255,0.95)",
                      paddingHorizontal: spacing.xl,
                      paddingVertical: spacing.md + 2,
                      borderRadius: radii.md,
                      opacity: pressed ? 0.85 : 1,
                    })}
                  >
                    <Text
                      style={[
                        typography.body,
                        {
                          color: colors.background.primary,
                          fontWeight: "700",
                          fontSize: 13,
                          letterSpacing: 0.3,
                        },
                      ]}
                    >
                      VIEW DETAILS
                    </Text>
                    <Ionicons name="arrow-forward" size={14} color={colors.background.primary} />
                  </Pressable>

                  <Pressable
                    onPress={() => handleNavigate("Explorar")}
                    style={({ pressed }) => ({
                      flexDirection: "row",
                      alignItems: "center",
                      gap: spacing.sm,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      paddingHorizontal: spacing.xl,
                      paddingVertical: spacing.md + 2,
                      borderRadius: radii.md,
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.1)",
                      opacity: pressed ? 0.85 : 1,
                    })}
                  >
                    <Text
                      style={[
                        typography.body,
                        {
                          color: colors.text.primary,
                          fontWeight: "600",
                          fontSize: 13,
                          letterSpacing: 0.3,
                        },
                      ]}
                    >
                      EXPLORE
                    </Text>
                    <Ionicons name="add" size={14} color={colors.text.primary} />
                  </Pressable>
                </View>
              )}
            </View>

            {/* ─── RIGHT: Visual Column ─── */}
            <View
              style={{
                flex: isMobile ? undefined : 1.2,
                position: "relative",
                minHeight: isMobile ? 300 : undefined,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: isMobile ? 280 : 420,
                  borderRadius: radii.xxl,
                  overflow: "hidden",
                  backgroundColor: colors.background.card,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.06)",
                  ...(Platform.OS === "web"
                    ? {
                        boxShadow:
                          "0 20px 80px rgba(0,0,0,0.5), 0 0 100px rgba(56,189,248,0.08)",
                      }
                    : shadows.lg),
                }}
              >
                {apod?.url && apod.media_type === "image" && (
                  <Image
                    source={apod.url}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                    transition={800}
                    accessibilityLabel={apod.title}
                  />
                )}
                <LinearGradient
                  colors={[
                    "rgba(10,10,26,0.05)",
                    "rgba(10,10,26,0.15)",
                    "rgba(10,10,26,0.5)",
                  ]}
                  locations={[0, 0.5, 1]}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </View>

              {isDesktop && (
                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
                  <OrbitalRing size={500} rotation="-12deg" opacity={0.1} />
                  <OrbitalRing size={580} rotation="8deg" opacity={0.06} />
                </View>
              )}

              {apod?.date && (
                <View
                  style={{
                    position: "absolute",
                    top: spacing.lg,
                    right: spacing.lg,
                    backgroundColor: "rgba(10,10,26,0.65)",
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.xs + 2,
                    borderRadius: radii.sm,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.08)",
                    ...(Platform.OS === "web"
                      ? { backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }
                      : {}),
                  }}
                >
                  <Text
                    style={[
                      typography.caption,
                      { color: colors.text.muted, fontSize: 10, letterSpacing: 0.5 },
                    ]}
                  >
                    {apod.date}
                  </Text>
                </View>
              )}

              {isDesktop && (
                <View
                  style={{
                    position: "absolute",
                    right: -80,
                    top: "8%",
                    gap: spacing.xl,
                    alignItems: "center",
                    width: 68,
                  }}
                >
                  {[
                    {
                      value: asteroidsLoading ? "—" : String(asteroidCount),
                      label: "NEAR-EARTH\nASTEROIDS",
                    },
                    {
                      value: searchLoading ? "—" : galleryItems.length > 0 ? String(galleryItems.length) : "—",
                      label: "IMAGES\nFOUND",
                    },
                    {
                      value: hazardousCount > 0 ? String(hazardousCount) : "0",
                      label: "HAZARDOUS",
                    },
                  ].map((stat, i) => (
                    <View key={i} style={{ alignItems: "center", width: 68 }}>
                      <Text
                        style={[
                          typography.number,
                          {
                            color: colors.text.primary,
                            fontSize: 18,
                            lineHeight: 22,
                          },
                        ]}
                      >
                        {stat.value}
                      </Text>
                      <Text
                        style={[
                          typography.overline,
                          {
                            color: colors.text.muted,
                            fontSize: 7,
                            letterSpacing: 0.5,
                            textAlign: "center",
                            lineHeight: 10,
                            marginTop: 3,
                          },
                        ]}
                      >
                        {stat.label}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* ═══════════════════════════════════════════
            BOTTOM: Info Cards
            Only cards with real API data
        ═══════════════════════════════════════════ */}
        <View
          style={{
            paddingHorizontal: pH,
            marginTop: isMobile ? spacing.xl : spacing.xxl,
          }}
        >
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: spacing.md,
            }}
          >
            {/* Card: Asteroids - real NEO data */}
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.03)",
                borderRadius: radii.xl,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.06)",
                padding: spacing.lg,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: spacing.md,
                }}
              >
                <Text
                  style={[
                    typography.overline,
                    { color: colors.text.muted, letterSpacing: 1.5 },
                  ]}
                >
                  NEO FEED
                </Text>
                <Text
                  style={[
                    typography.number,
                    { color: colors.text.primary, fontSize: 20 },
                  ]}
                >
                  {asteroidsLoading ? "—" : String(asteroidCount)}
                </Text>
              </View>

              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  borderWidth: 1.5,
                  borderColor: "rgba(252,61,33,0.3)",
                  backgroundColor: "rgba(252,61,33,0.06)",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: spacing.md,
                }}
              >
                <Ionicons name="warning" size={22} color={colors.accent.orange} />
              </View>

              <Text
                style={[
                  typography.caption,
                  { color: colors.text.muted },
                ]}
              >
                {hazardousCount > 0
                  ? `${hazardousCount} potentially hazardous`
                  : "No hazardous today"}
              </Text>
            </View>

            {/* Card: Image Library - real search data */}
            {galleryItems.length > 0 && (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: radii.xl,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: spacing.lg,
                    paddingBottom: spacing.sm,
                  }}
                >
                  <Text
                    style={[
                      typography.overline,
                      { color: colors.text.muted, letterSpacing: 1.5 },
                    ]}
                  >
                    IMAGE LIBRARY
                  </Text>
                  <Text
                    style={[
                      typography.overline,
                      { color: colors.accent.cyan, letterSpacing: 0.5 },
                    ]}
                  >
                    {String(galleryItems.length)}
                  </Text>
                </View>

                <View style={{ flex: 1, position: "relative", minHeight: 100 }}>
                  {galleryItems[0]?.image && (
                    <Image
                      source={galleryItems[0].image}
                      style={{ width: "100%", height: "100%" }}
                      contentFit="cover"
                      transition={400}
                    />
                  )}
                  <LinearGradient
                    colors={["rgba(10,10,26,0.2)", "rgba(10,10,26,0.85)"]}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: spacing.lg,
                      paddingTop: spacing.xl,
                    }}
                  >
                    <Text
                      style={[
                        typography.h4,
                        { color: colors.text.primary, fontSize: 13 },
                      ]}
                      numberOfLines={1}
                    >
                      {galleryItems[0]?.title || ""}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Card: APOD - real data */}
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.03)",
                borderRadius: radii.xl,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.06)",
                padding: spacing.lg,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: spacing.md,
                }}
              >
                <Text
                  style={[
                    typography.overline,
                    { color: colors.text.muted, letterSpacing: 1.5 },
                  ]}
                >
                  APOD
                </Text>
                <Text
                  style={[
                    typography.overline,
                    { color: apod ? colors.status.success : colors.status.error, fontSize: 8 },
                  ]}
                >
                  {apod ? apod.date : "—"}
                </Text>
              </View>

              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  borderWidth: 1.5,
                  borderColor: "rgba(59,130,246,0.3)",
                  backgroundColor: "rgba(59,130,246,0.06)",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: spacing.md,
                }}
              >
                <Ionicons name="camera" size={22} color={colors.primary[400]} />
              </View>

              <Text
                style={[
                  typography.body,
                  { color: colors.text.primary, fontWeight: "700", fontSize: 13 },
                ]}
                numberOfLines={2}
              >
                {apod?.title || "—"}
              </Text>
            </View>
          </View>
        </View>

        {/* ═══════════════════════════════════════════
            GALLERY: NASA images from search API
            Hidden if no results (no fallback)
        ═══════════════════════════════════════════ */}
        {galleryItems.length > 0 && (
          <View style={{ paddingHorizontal: pH, marginTop: spacing.xxl }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: spacing.lg,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <View
                  style={{
                    width: 3,
                    height: 16,
                    borderRadius: 2,
                    backgroundColor: colors.accent.cyan,
                  }}
                />
                <Text style={[typography.h4, { color: colors.text.primary }]}>
                  {`NASA Image Library (${galleryItems.length})`}
                </Text>
              </View>
              <Pressable onPress={() => handleNavigate("Biblioteca")}>
                <Text
                  style={[
                    typography.caption,
                    { color: colors.accent.cyan, fontWeight: "600" },
                  ]}
                >
                  VIEW ALL
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: spacing.xl }}
            >
              {galleryItems.map((item, i) => (
                <Pressable
                  key={i}
                  onPress={() => handleNavigate("Biblioteca")}
                  style={({ pressed }) => ({
                    width: isMobile ? 150 : 200,
                    marginRight: spacing.md,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <View
                    style={{
                      borderRadius: radii.lg,
                      overflow: "hidden",
                      backgroundColor: colors.background.card,
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.06)",
                      ...(Platform.OS === "web"
                        ? { boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }
                        : shadows.sm),
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{ width: "100%", height: 120 }}
                      contentFit="cover"
                      transition={400}
                      accessibilityLabel={item.title}
                    />
                    <LinearGradient
                      colors={["transparent", "rgba(10,10,26,0.85)"]}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "60%",
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: spacing.sm,
                      }}
                    >
                      <Text
                        style={[
                          typography.caption,
                          {
                            color: colors.text.primary,
                            fontWeight: "600",
                            fontSize: 11,
                          },
                        ]}
                        numberOfLines={2}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        <View
          style={{
            alignItems: "center",
            marginTop: spacing.huge,
            paddingHorizontal: spacing.xl,
          }}
        >
          <View
            style={{
              width: 40,
              height: 1,
              backgroundColor: "rgba(255,255,255,0.08)",
              marginBottom: spacing.md,
            }}
          />
          <Text
            style={[
              typography.overline,
              { color: colors.text.muted, letterSpacing: 2, fontSize: 8 },
            ]}
          >
            POWERED BY NASA OPEN APIs
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardHome;
