import { View, Text, ActivityIndicator } from "react-native";
import { colors } from "../../design";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = "Loading...",
}: LoadingStateProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background.primary,
        padding: 24,
      }}
    >
      <ActivityIndicator size="large" color={colors.nasa.blue} />
      <Text
        style={{
          marginTop: 16,
          color: colors.text.secondary,
          fontSize: 16,
        }}
      >
        {message}
      </Text>
    </View>
  );
};
