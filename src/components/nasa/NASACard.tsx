import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../design";
import { useResponsiveDesign } from "../../hooks/useResponsiveDesign";
import {
  getNASAItemImage,
  getNASAItemTitle,
  type NASAItem,
} from "../../types/nasa";

interface NASACardProps {
  item: NASAItem;
  onPress: () => void;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

export const NASACard = ({
  item,
  onPress,
  onFavoriteToggle,
  isFavorite,
}: NASACardProps) => {
  const { isMobile } = useResponsiveDesign();
  const imageUrl = getNASAItemImage(item);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.background.card,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 16,
        width: isMobile ? "100%" : "48%",
        ...(Platform.OS === "web"
          ? { boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }
          : { elevation: 5 }),
      }}
    >
      <Image
        source={imageUrl}
        style={{ width: "100%", height: 200 }}
        contentFit="cover"
        transition={300}
      />
      <View style={{ padding: 12 }}>
        <Text
          style={{
            color: colors.text.primary,
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 4,
          }}
          numberOfLines={2}
        >
          {getNASAItemTitle(item)}
        </Text>
        <TouchableOpacity
          onPress={onFavoriteToggle}
          style={{ alignSelf: "flex-end", marginTop: 8 }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? colors.nasa.red : colors.text.secondary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
