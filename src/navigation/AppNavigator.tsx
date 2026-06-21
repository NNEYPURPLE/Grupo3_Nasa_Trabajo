import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../design";
import TopNav from "../components/common/TopNav";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import InfoScreen from "../screens/InfoScreen";
import ExploreScreen from "../screens/ExploreScreen";
import LibraryScreen from "../screens/LibraryScreen";
import GameScreen from "../screens/GameScreen";
import DetailScreen from "../screens/DetailScreen";

export type RootStackParamList = {
  Welcome: undefined;
  MainTabs: undefined;
  Detail: { item: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        header: () => <TopNav />,
        headerStyle: { backgroundColor: "transparent", elevation: 0, shadowOpacity: 0 },
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: colors.background.primary },
      }}
      tabBar={() => null}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Información" component={InfoScreen} />
      <Tab.Screen name="Explorar" component={ExploreScreen} />
      <Tab.Screen name="Biblioteca" component={LibraryScreen} />
      <Tab.Screen name="Juego" component={GameScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background.primary },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
