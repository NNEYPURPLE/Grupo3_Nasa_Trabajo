import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  Dimensions,
  Platform,
  Keyboard,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, spacing, radii, typography } from "../../design";
import type { RootStackParamList } from "../../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SUGGESTED = [
  "Climate Change",
  "Artemis",
  "Mars perseverance",
  "SpaceX Crew-2",
  "International Space Station",
];

interface SearchOverlayProps {
  visible: boolean;
  onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SearchOverlay = ({ visible, onClose }: SearchOverlayProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [searchText, setSearchText] = useState("");
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSearch = () => {
    const trimmed = searchText.trim();
    if (trimmed) {
      Keyboard.dismiss();
      onClose();
      navigation.navigate("MainTabs" as any, { screen: "Explorar", params: { query: trimmed } });
    }
  };

  const handleSuggestion = (text: string) => {
    setSearchText(text);
    Keyboard.dismiss();
    onClose();
    navigation.navigate("MainTabs" as any, { screen: "Explorar", params: { query: text } });
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: colors.background.primary,
          transform: [{ translateX: slideAnim }],
        }}
      >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: spacing.md,
          paddingTop: Platform.OS === "ios" ? 60 : 40,
          paddingBottom: spacing.md,
          gap: spacing.sm,
        }}
      >
        <Ionicons name="search" size={20} color={colors.text.muted} />
        <TextInput
          placeholder="Search the universe"
          placeholderTextColor={colors.text.muted}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoFocus
          style={{
            flex: 1,
            fontSize: 16,
            color: colors.text.primary,
            outlineStyle: "none" as any,
          }}
        />
        <Pressable
          onPress={() => {
            setSearchText("");
            onClose();
          }}
          style={{ padding: spacing.xs }}
        >
          <Ionicons name="close" size={22} color={colors.text.secondary} />
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
        <Text
          style={[
            typography.h4,
            { color: colors.text.primary, marginBottom: spacing.md },
          ]}
        >
          Suggested Searches
        </Text>

        {SUGGESTED.map((item, i) => (
          <Pressable
            key={item}
            onPress={() => handleSuggestion(item)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255,255,255,0.06)",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <Ionicons name="search" size={16} color={colors.text.muted} />
              <Text
                style={{
                  fontSize: 15,
                  color: colors.text.secondary,
                  fontWeight: "500",
                }}
              >
                {item}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={16} color={colors.nasa.red} />
          </Pressable>
        ))}
      </View>
      </Animated.View>
    </Modal>
  );
};

export default SearchOverlay;
