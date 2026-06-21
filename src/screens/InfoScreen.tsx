import { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, spacing, radii, shadows } from "../design";
import { AppHeader } from "../components/common/AppHeader";
import { FadeInView } from "../components/common/FadeInView";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { useApodGallery } from "../hooks/useApodGallery";
import type { RootStackParamList } from "../navigation/AppNavigator";
import type { ApodResponse } from "../types/nasa";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  estrellas: ["star", "sun", "solar", "stellar", "galaxy", "galaxies", "constellation", "light year", "supernova", "nebula"],
  planetas: ["planet", "mars", "jupiter", "saturn", "venus", "mercury", "earth", "neptune", "uranus", "asteroid", "comet", "lunar", "moon"],
  nebulosas: ["nebula", "cloud", "dust", "gas", "pillars", "formation", "orion", "eagle", "crab"],
};

const CATEGORIES = [
  { key: "todo", label: "Todo", icon: "apps" as const },
  { key: "estrellas", label: "Estrellas", icon: "star" as const },
  { key: "planetas", label: "Planetas", icon: "planet" as const },
  { key: "nebulosas", label: "Nebulosas", icon: "cloud" as const },
];

const categorize = (item: ApodResponse): string[] => {
  const text = `${item.title} ${item.explanation}`.toLowerCase();
  const matched: string[] = [];
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) matched.push(cat);
  }
  return matched;
};

const InfoScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState("todo");
  const { items, isLoading, error, refetch } = useApodGallery(12);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "todo") return items;
    return items.filter((item) => categorize(item).includes(selectedCategory));
  }, [items, selectedCategory]);

  const handleReadMore = (item: ApodResponse) => {
    navigation.navigate("Detail", {
      item: {
        title: item.title,
        explanation: item.explanation,
        date: item.date,
        url: item.url,
        hdurl: item.hdurl,
      },
    });
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <AppHeader
        title="Información"
        subtitle="cápsulas educativas de la NASA"
      />

      <View style={{ paddingVertical: spacing.md }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 8 }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                onPress={() => setSelectedCategory(cat.key)}
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: spacing.lg + 2,
                  paddingVertical: spacing.md - 2,
                  borderRadius: radii.full,
                  backgroundColor: isSelected
                    ? colors.nasa.blue
                    : colors.background.surface,
                  borderWidth: 1,
                  borderColor: isSelected
                    ? colors.nasa.blue
                    : colors.border.subtle,
                  ...(!isSelected ? shadows.sm : {}),
                }}
              >
                <Ionicons
                  name={cat.icon}
                  size={16}
                  color={isSelected ? colors.text.primary : colors.text.secondary}
                />
                <Text
                  style={{
                    color: isSelected ? colors.text.primary : colors.text.secondary,
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length === 0 && (
          <FadeInView>
            <View style={{ alignItems: "center", marginTop: 80 }}>
              <Ionicons
                name="document-text-outline"
                size={48}
                color={colors.text.muted}
              />
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 16,
                  marginTop: spacing.md,
                }}
              >
                No hay artículos en esta categoría
              </Text>
            </View>
          </FadeInView>
        )}

        {filteredItems.map((item, idx) => (
          <FadeInView key={item.date + idx} delay={idx * 100} distance={20}>
            <View
              style={{
                backgroundColor: colors.background.card,
                borderRadius: radii.xl,
                overflow: "hidden",
                marginBottom: spacing.lg,
                borderWidth: 1,
                borderColor: colors.border.subtle,
                ...shadows.md,
              }}
            >
              {item.media_type === "image" && (
                <View style={{ position: "relative" }}>
                  <Image
                    source={item.url}
                    style={{ width: "100%", height: 200 }}
                    contentFit="cover"
                    transition={400}
                    accessibilityLabel={item.title}
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(10,10,26,0.7)"]}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: spacing.md,
                      left: spacing.md,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      backgroundColor: "rgba(10,10,26,0.7)",
                      paddingHorizontal: spacing.sm + 2,
                      paddingVertical: spacing.xs,
                      borderRadius: radii.full,
                    }}
                  >
                    <Ionicons name="calendar-outline" size={11} color={colors.text.muted} />
                    <Text style={{ color: colors.text.muted, fontSize: 11 }}>
                      {item.date}
                    </Text>
                  </View>
                </View>
              )}

              <View style={{ padding: spacing.xl }}>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 18,
                    fontWeight: "700",
                    lineHeight: 24,
                  }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                    lineHeight: 22,
                    marginTop: spacing.sm,
                  }}
                  numberOfLines={3}
                >
                  {item.explanation}
                </Text>

                <TouchableOpacity
                  onPress={() => handleReadMore(item)}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    backgroundColor: colors.nasa.blue,
                    paddingHorizontal: spacing.xl,
                    paddingVertical: spacing.md - 2,
                    borderRadius: radii.md,
                    alignSelf: "flex-start",
                    marginTop: spacing.lg,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontWeight: "700",
                      fontSize: 13,
                    }}
                  >
                    Leer más
                  </Text>
                  <Ionicons name="arrow-forward" size={14} color={colors.text.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </FadeInView>
        ))}
      </ScrollView>
    </View>
  );
};

export default InfoScreen;
