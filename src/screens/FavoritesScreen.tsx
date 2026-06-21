import { useCallback, useContext } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../design";
import { useResponsiveDesign } from "../hooks/useResponsiveDesign";
import { ResponsiveHeader } from "../components/common/ResponsiveHeader";
import { NASACard } from "../components/nasa/NASACard";
import { AppContext } from "../context/AppContext";
import { getNASAItemId, type NASAItem } from "../types/nasa";
import type { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isMobile } = useResponsiveDesign();
  const { state, isFavorite, removeFavorite } = useContext(AppContext);

  const handleCardPress = useCallback(
    (item: NASAItem) => {
      navigation.navigate("Detail", { item });
    },
    [navigation]
  );

  const handleFavoriteToggle = useCallback(
    (item: NASAItem) => {
      const id = getNASAItemId(item);
      removeFavorite(id);
    },
    [removeFavorite]
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <ResponsiveHeader title="Favorites" />
      {state.favorites.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <Text
            style={{
              color: colors.text.secondary,
              fontSize: 18,
              textAlign: "center",
            }}
          >
            No favorites yet. Start exploring and save your favorite NASA
            images!
          </Text>
        </View>
      ) : (
        <FlatList
          data={state.favorites}
          keyExtractor={(item, index) => `fav-${index}`}
          numColumns={isMobile ? 1 : 2}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <NASACard
              item={item}
              onPress={() => handleCardPress(item)}
              onFavoriteToggle={() => handleFavoriteToggle(item)}
              isFavorite={isFavorite(getNASAItemId(item))}
            />
          )}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
