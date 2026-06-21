import { Platform } from "react-native";

export const useNativeDriver = Platform.OS !== "web";
