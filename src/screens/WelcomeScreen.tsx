import { useEffect, useRef } from "react";
import { View, Text, Animated, ImageBackground, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, spacing } from "../design";
import { useNativeDriver } from "../utils/animations";
import { CosmicButton } from "../components/common/CosmicButton";
import type { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const logoScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(30)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslate = useRef(new Animated.Value(30)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(logoScale, {
        toValue: 1,
        useNativeDriver: useNativeDriver,
        speed: 8,
        bounciness: 10,
      }),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: useNativeDriver,
        }),
        Animated.timing(titleTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: useNativeDriver,
        }),
      ]),
      Animated.timing(lineWidth, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(descOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: useNativeDriver,
      }),
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: useNativeDriver,
        }),
        Animated.timing(buttonTranslate, {
          toValue: 0,
          duration: 400,
          useNativeDriver: useNativeDriver,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <ImageBackground
        source={{
          uri: "https://images-assets.nasa.gov/image/PIA03149/PIA03149~thumb.jpg",
        }}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(10,10,26,0.4)", "rgba(10,10,26,0.88)"]}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 32 }}
        >
          <Animated.View
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: colors.nasa.blue,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 28,
              ...(Platform.OS === "web"
                ? { boxShadow: "0 0 20px rgba(11,61,145,0.5)" }
                : { elevation: 10 }),
              transform: [{ scale: logoScale }],
            }}
          >
            <Ionicons name="planet" size={44} color={colors.text.primary} />
          </Animated.View>

          <Animated.View
            style={{
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslate }],
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 40,
                fontWeight: "800",
                textAlign: "center",
                letterSpacing: 1,
                marginBottom: 12,
              }}
            >
              Explorador{"\n"}Espacial
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              width: 60,
              height: 3,
              backgroundColor: colors.nasa.blue,
              borderRadius: 2,
              marginBottom: 20,
              transform: [{ scaleX: lineWidth }],
            }}
          />

          <Animated.Text
            style={{
              color: colors.text.secondary,
              fontSize: 16,
              textAlign: "center",
              lineHeight: 26,
              marginBottom: 56,
              maxWidth: 300,
              opacity: descOpacity,
            }}
          >
            Descubre los misterios del universo a través de imágenes y datos de la
            NASA
          </Animated.Text>

          <Animated.View
            style={{
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslate }],
            }}
          >
            <CosmicButton
              title="Comenzar"
              icon="arrow-forward"
              onPress={() => navigation.replace("MainTabs")}
              style={{ paddingHorizontal: 52, paddingVertical: 16, borderRadius: 30 }}
            />
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
