import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, spacing, radii, shadows } from "../design";
import { AppHeader } from "../components/common/AppHeader";
import { FadeInView } from "../components/common/FadeInView";
import { useNASASearch } from "../hooks/useNASASearch";
import { useMarsPhotos } from "../hooks/useMarsPhotos";
import { useApodGallery } from "../hooks/useApodGallery";
import type { RootStackParamList } from "../navigation/AppNavigator";
import type { NASASearchItem, MarsPhoto, ApodResponse } from "../types/nasa";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<any>();
  const query = route.params?.query || "";

  const { results: searchResults, isLoading: searchLoading, loadMore, error: searchError } = useNASASearch(query || "earth nebula galaxy");
  const { photos: marsPhotos, isLoading: marsLoading, error: marsError } = useMarsPhotos({ sol: 1000 });
  const { items: apodItems, isLoading: apodLoading, error: apodError } = useApodGallery(6);

  const handleSearchItem = (item: NASASearchItem) => {
    const data = item.data?.[0];
    navigation.navigate("Detail", {
      item: {
        title: data?.title || "NASA Image",
        explanation: data?.description || "",
        date: data?.date_created || "",
        imageUrl: item.links?.[0]?.href || "",
        mission: data?.center || undefined,
        source: "NASA Image Library",
      },
    });
  };

  const handleMarsPhoto = (photo: MarsPhoto) => {
    navigation.navigate("Detail", {
      item: {
        title: `${photo.camera.full_name} — Sol ${photo.sol}`,
        description: `Foto del rover ${photo.rover.name} en el sol ${photo.sol} usando la cámara ${photo.camera.name}.`,
        date: photo.earth_date,
        imageUrl: photo.img_src,
        mission: photo.rover.name,
        source: "NASA Mars Photos API",
      },
    });
  };

  const handleApodItem = (item: ApodResponse) => {
    navigation.navigate("Detail", {
      item: {
        title: item.title,
        explanation: item.explanation,
        date: item.date,
        url: item.url,
        hdurl: item.hdurl,
        source: "APOD — Astronomy Picture of the Day",
      },
    });
  };

  const isLoading = searchLoading || marsLoading || apodLoading;
  const error = searchError || marsError || apodError;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <AppHeader
        title="Explorar"
        subtitle="Busca y descubre recursos de la NASA"
      />

      {query ? (
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
          <Text style={{ color: colors.text.primary, fontSize: 22, fontWeight: "700" }}>
            Resultados de búsqueda para: {query}
          </Text>
          <Text style={{ color: colors.text.secondary, fontSize: 15, marginTop: 4, fontWeight: "600" }}>
            {searchResults.length} resultados encontrados
          </Text>
        </View>
      ) : null}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && (
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Ionicons name="planet" size={48} color={colors.nasa.blue} />
            <Text style={{ color: colors.text.muted, marginTop: spacing.md }}>
              Cargando recursos NASA...
            </Text>
          </View>
        )}

        {error && !isLoading && (
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Ionicons name="cloud-offline-outline" size={48} color={colors.text.muted} />
            <Text style={{ color: colors.text.secondary, marginTop: spacing.md, fontSize: 15 }}>
              {error}
            </Text>
          </View>
        )}

        {!isLoading && !error && (
          <>
            {marsPhotos.length > 0 && (
              <FadeInView delay={100}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md }}>
                  <Ionicons name="planet" size={18} color={colors.nasa.red} />
                  <Text style={{ color: colors.text.primary, fontSize: 16, fontWeight: "700" }}>
                    Fotos de Marte — Rover Curiosity
                  </Text>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.lg }}
                >
                  {marsPhotos.slice(0, 10).map((photo) => (
                    <TouchableOpacity
                      key={photo.id}
                      onPress={() => handleMarsPhoto(photo)}
                      activeOpacity={0.85}
                      style={{
                        width: 200,
                        backgroundColor: colors.background.card,
                        borderRadius: radii.xl,
                        overflow: "hidden",
                        borderWidth: 1,
                        borderColor: colors.border.subtle,
                        ...shadows.sm,
                      }}
                    >
                      <Image
                        source={photo.img_src}
                        style={{ width: "100%", height: 140 }}
                        contentFit="cover"
                        transition={300}
                      />
                      <View style={{ padding: spacing.md }}>
                        <Text
                          style={{ color: colors.text.primary, fontSize: 13, fontWeight: "600" }}
                          numberOfLines={1}
                        >
                          {photo.camera.name}
                        </Text>
                        <Text style={{ color: colors.text.muted, fontSize: 11, marginTop: 2 }}>
                          Sol {photo.sol} · {photo.earth_date}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </FadeInView>
            )}

            {apodItems.length > 0 && (
              <FadeInView delay={150}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md, marginTop: marsPhotos.length > 0 ? spacing.lg : 0 }}>
                  <Ionicons name="star" size={18} color={colors.accent.gold} />
                  <Text style={{ color: colors.text.primary, fontSize: 16, fontWeight: "700" }}>
                    Astronomy Picture of the Day
                  </Text>
                </View>

                {apodItems.map((item, idx) => (
                  <FadeInView key={item.date + idx} delay={200 + idx * 80} distance={16}>
                    <TouchableOpacity
                      onPress={() => handleApodItem(item)}
                      activeOpacity={0.85}
                      style={{
                        flexDirection: "row",
                        backgroundColor: colors.background.card,
                        borderRadius: radii.xl,
                        overflow: "hidden",
                        marginBottom: spacing.md,
                        borderWidth: 1,
                        borderColor: colors.border.subtle,
                        ...shadows.sm,
                      }}
                    >
                      {item.media_type === "image" ? (
                        <Image
                          source={item.url}
                          style={{ width: 100, height: 100 }}
                          contentFit="cover"
                          transition={300}
                        />
                      ) : (
                        <View style={{ width: 100, height: 100, backgroundColor: colors.background.surface, justifyContent: "center", alignItems: "center" }}>
                          <Ionicons name="videocam-outline" size={28} color={colors.text.muted} />
                        </View>
                      )}
                      <View style={{ flex: 1, padding: spacing.md, justifyContent: "center" }}>
                        <Text style={{ color: colors.text.muted, fontSize: 10, marginBottom: 2 }}>{item.date}</Text>
                        <Text style={{ color: colors.text.primary, fontSize: 14, fontWeight: "600", lineHeight: 19 }} numberOfLines={2}>
                          {item.title}
                        </Text>
                        <Text style={{ color: colors.text.secondary, fontSize: 12, lineHeight: 17, marginTop: 4 }} numberOfLines={2}>
                          {item.explanation}
                        </Text>
                      </View>
                      <View style={{ justifyContent: "center", paddingRight: spacing.md }}>
                        <Ionicons name="chevron-forward" size={18} color={colors.text.muted} />
                      </View>
                    </TouchableOpacity>
                  </FadeInView>
                ))}
              </FadeInView>
            )}

            {searchResults.length > 0 && (
              <FadeInView delay={200}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md, marginTop: spacing.lg }}>
                  <Ionicons name="images" size={18} color={colors.nasa.blue} />
                  <Text style={{ color: colors.text.primary, fontSize: 16, fontWeight: "700" }}>
                    Resultados de búsqueda
                  </Text>
                  <View style={{ backgroundColor: colors.nasa.blue + "30", paddingHorizontal: 8, paddingVertical: 2, borderRadius: radii.full }}>
                    <Text style={{ color: colors.nasa.blue, fontSize: 11, fontWeight: "700" }}>
                      {searchResults.length}
                    </Text>
                  </View>
                </View>

                {searchResults.map((item, idx) => {
                  const data = item.data?.[0];
                  const imageUrl = item.links?.[0]?.href || "";
                  const title = data?.title || "NASA Image";
                  const date = data?.date_created || "";
                  const mediaType = data?.media_type || "image";
                  const keywords = data?.keywords?.slice(0, 2) || [];

                  return (
                    <FadeInView key={item.data?.[0]?.nasa_id || idx} delay={250 + idx * 60} distance={16}>
                      <TouchableOpacity
                        onPress={() => handleSearchItem(item)}
                        activeOpacity={0.85}
                        style={{
                          flexDirection: "row",
                          backgroundColor: colors.background.card,
                          borderRadius: radii.xl,
                          overflow: "hidden",
                          marginBottom: spacing.md,
                          borderWidth: 1,
                          borderColor: colors.border.subtle,
                          ...shadows.sm,
                        }}
                      >
                        {imageUrl ? (
                          <Image
                            source={imageUrl}
                            style={{ width: 110, height: 110 }}
                            contentFit="cover"
                            transition={300}
                          />
                        ) : (
                          <View
                            style={{
                              width: 110,
                              height: 110,
                              backgroundColor: colors.background.surface,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Ionicons name="image-outline" size={32} color={colors.text.muted} />
                          </View>
                        )}
                        <View style={{ flex: 1, padding: spacing.md, justifyContent: "center" }}>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            <View style={{
                              backgroundColor: mediaType === "video" ? colors.accent.orange + "30" : colors.nasa.blue + "30",
                              paddingHorizontal: 6,
                              paddingVertical: 2,
                              borderRadius: radii.sm,
                            }}>
                              <Text style={{
                                color: mediaType === "video" ? colors.accent.orange : colors.nasa.blue,
                                fontSize: 9,
                                fontWeight: "700",
                                textTransform: "uppercase",
                              }}>
                                {mediaType}
                              </Text>
                            </View>
                            {date ? (
                              <Text style={{ color: colors.text.muted, fontSize: 10 }}>
                                {date.split("T")[0]}
                              </Text>
                            ) : null}
                          </View>
                          <Text
                            style={{ color: colors.text.primary, fontSize: 14, fontWeight: "600", lineHeight: 19 }}
                            numberOfLines={2}
                          >
                            {title}
                          </Text>
                          {keywords.length > 0 && (
                            <View style={{ flexDirection: "row", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                              {keywords.map((kw, ki) => (
                                <View
                                  key={ki}
                                  style={{
                                    backgroundColor: colors.glass.light,
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                    borderRadius: radii.sm,
                                    borderWidth: 1,
                                    borderColor: colors.glass.border,
                                  }}
                                >
                                  <Text style={{ color: colors.text.muted, fontSize: 9 }}>{kw}</Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                        <View style={{ justifyContent: "center", paddingRight: spacing.md }}>
                          <Ionicons name="chevron-forward" size={18} color={colors.text.muted} />
                        </View>
                      </TouchableOpacity>
                    </FadeInView>
                  );
                })}

                <TouchableOpacity
                  onPress={loadMore}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    backgroundColor: colors.background.surface,
                    paddingVertical: spacing.md,
                    borderRadius: radii.lg,
                    borderWidth: 1,
                    borderColor: colors.border.subtle,
                    marginTop: spacing.sm,
                  }}
                >
                  <Ionicons name="arrow-down" size={16} color={colors.nasa.blue} />
                  <Text style={{ color: colors.nasa.blue, fontWeight: "600", fontSize: 14 }}>
                    Cargar más resultados
                  </Text>
                </TouchableOpacity>
              </FadeInView>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;
