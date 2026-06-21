import { useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, spacing, radii, shadows } from "../design";
import { AppHeader } from "../components/common/AppHeader";
import { FadeInView } from "../components/common/FadeInView";
import { useResponsiveDesign } from "../hooks/useResponsiveDesign";
import { libraryItems, type LibraryItemData } from "../data/mockData";
import type { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LibraryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isMobile } = useResponsiveDesign();
  const numCols = isMobile ? 2 : 3;

  const handlePress = useCallback(
    (item: LibraryItemData) => {
      navigation.navigate("Detail", { item });
    },
    [navigation]
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <AppHeader title="Biblioteca" subtitle="Galería de imágenes del espacio" />

      <FlatList
        data={libraryItems}
        keyExtractor={(item) => item.id}
        numColumns={numCols}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxxl }}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={numCols > 1 ? { gap: spacing.md } : undefined}
        renderItem={({ item, index }) => (
          <FadeInView
            delay={index * 80}
            distance={12}
            style={{ flex: 1, marginBottom: spacing.md }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: colors.background.card,
                borderRadius: radii.lg,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: colors.border.subtle,
                ...shadows.sm,
              }}
            >
              <View style={{ position: "relative" }}>
                <Image
                  source={item.imageUrl}
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
              </View>
              <TouchableOpacity
                onPress={() => handlePress(item)}
                activeOpacity={0.85}
                style={{ padding: spacing.md }}
              >
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          </FadeInView>
        )}
        ListFooterComponent={
          <FadeInView delay={500}>
            <Text
              style={{
                color: colors.text.muted,
                fontSize: 12,
                textAlign: "center",
                marginTop: spacing.sm,
              }}
            >
              {libraryItems.length} imágenes disponibles
            </Text>
          </FadeInView>
        }
        ListEmptyComponent={
          <FadeInView>
            <View
              style={{
                alignItems: "center",
                marginTop: 80,
              }}
            >
              <Ionicons
                name="images-outline"
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
                No hay imágenes disponibles
              </Text>
            </View>
          </FadeInView>
        }
      />
    </View>
  );
};

export default LibraryScreen;
