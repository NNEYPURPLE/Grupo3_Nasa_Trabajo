import { useCallback, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Share, Animated } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { colors, spacing, radii, shadows } from "../design";
import { FadeInView } from "../components/common/FadeInView";
import type { RootStackParamList } from "../navigation/AppNavigator";

type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const getTitle = (item: any): string =>
  item?.title || item?.name || item?.data?.[0]?.title || "";

const getImage = (item: any): string =>
  item?.url || item?.imageUrl || item?.img_src || item?.links?.[0]?.href || item?.image || "";

const getDescription = (item: any): string =>
  item?.explanation || item?.content || item?.description || item?.data?.[0]?.description || "";

const getDate = (item: any): string =>
  item?.date || item?.earth_date || item?.data?.[0]?.date_created || "";

const getFacts = (item: any): string[] | undefined => item?.facts;

const getMission = (item: any): string | undefined => item?.mission;
const getSource = (item: any): string | undefined => item?.source;

const DetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const insets = useSafeAreaInsets();
  const { item } = route.params as { item: any };
  const [isFavorite, setIsFavorite] = useState(false);

  const title = getTitle(item);
  const imageUrl = getImage(item);
  const description = getDescription(item);
  const date = getDate(item);
  const facts = getFacts(item);
  const mission = getMission(item);
  const source = getSource(item);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `${title}\n\n${description}`,
        url: imageUrl,
      });
    } catch {
      Alert.alert("Error", "No se pudo compartir");
    }
  }, [title, description, imageUrl]);

  const handleFavoriteToggle = useCallback(() => {
    setIsFavorite((prev) => !prev);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: spacing.lg,
          paddingTop: insets.top + spacing.sm,
          paddingBottom: spacing.md,
          backgroundColor: colors.background.secondary,
          borderBottomWidth: 1,
          borderBottomColor: colors.border.subtle,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: colors.background.surface,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: spacing.md - 2 }}>
          <TouchableOpacity
            onPress={handleFavoriteToggle}
            activeOpacity={0.7}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: colors.background.surface,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? colors.nasa.red : colors.text.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            activeOpacity={0.7}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: colors.background.surface,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="share-outline"
              size={20}
              color={colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing.huge }}
        showsVerticalScrollIndicator={false}
      >
        {imageUrl ? (
          <FadeInView direction="none" duration={500}>
            <View style={{ position: "relative" }}>
              <Image
                source={imageUrl}
                style={{ width: "100%", height: 300 }}
                contentFit="cover"
                transition={400}
                accessibilityLabel={title}
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
            </View>
          </FadeInView>
        ) : null}

        <View style={{ padding: spacing.xl }}>
          <FadeInView delay={200} distance={16}>
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 24,
                fontWeight: "700",
                lineHeight: 32,
              }}
            >
              {title}
            </Text>
          </FadeInView>

          {date ? (
            <FadeInView delay={280} distance={12}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginTop: spacing.md,
                  backgroundColor: colors.background.surface,
                  alignSelf: "flex-start",
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.xs,
                  borderRadius: radii.full,
                }}
              >
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color={colors.text.muted}
                />
                <Text style={{ color: colors.text.muted, fontSize: 13 }}>
                  {date}
                </Text>
              </View>
            </FadeInView>
          ) : null}

          {(mission || source) && (
            <FadeInView delay={320} distance={12}>
              <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md, flexWrap: "wrap" }}>
                {mission && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      backgroundColor: colors.background.surface,
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.xs + 1,
                      borderRadius: radii.full,
                    }}
                  >
                    <Ionicons name="rocket-outline" size={12} color={colors.text.muted} />
                    <Text style={{ color: colors.text.muted, fontSize: 12 }}>
                      {mission}
                    </Text>
                  </View>
                )}
                {source && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      backgroundColor: colors.background.surface,
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.xs + 1,
                      borderRadius: radii.full,
                    }}
                  >
                    <Ionicons name="radio-outline" size={12} color={colors.text.muted} />
                    <Text style={{ color: colors.text.muted, fontSize: 12 }}>
                      {source}
                    </Text>
                  </View>
                )}
              </View>
            </FadeInView>
          )}

          {facts && facts.length > 0 && (
            <FadeInView delay={360} distance={16}>
              <View
                style={{
                  backgroundColor: colors.background.surface,
                  borderRadius: radii.lg,
                  padding: spacing.xl,
                  marginTop: spacing.xxl,
                  borderWidth: 1,
                  borderColor: colors.border.subtle,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: spacing.sm,
                    marginBottom: spacing.lg,
                  }}
                >
                  <Ionicons
                    name="bulb-outline"
                    size={18}
                    color={colors.status.warning}
                  />
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    Datos curiosos
                  </Text>
                </View>
                {facts.map((fact: string, i: number) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 10,
                      marginBottom: i < facts.length - 1 ? spacing.md : 0,
                    }}
                  >
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: colors.nasa.blue,
                        marginTop: 8,
                      }}
                    />
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 14,
                        flex: 1,
                        lineHeight: 21,
                      }}
                    >
                      {fact}
                    </Text>
                  </View>
                ))}
              </View>
            </FadeInView>
          )}

          {description ? (
            <FadeInView delay={440} distance={16}>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 15,
                  lineHeight: 26,
                  marginTop: facts ? spacing.xxl : spacing.xl,
                }}
              >
                {description}
              </Text>
            </FadeInView>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
