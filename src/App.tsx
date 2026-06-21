import { StatusBar } from "expo-status-bar";
import { View, Text, ActivityIndicator } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { AppProvider } from "./context/AppContext";
import { AppNavigator } from "./navigation/AppNavigator";
import { ErrorBoundary } from "./components/ErrorBoundary";

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0A0A1A",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0B3D91" />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <AppProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
