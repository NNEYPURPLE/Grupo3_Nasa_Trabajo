import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../design";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
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
      <Ionicons
        name="alert-circle-outline"
        size={64}
        color={colors.status.error}
      />
      <Text
        style={{
          marginTop: 16,
          color: colors.text.primary,
          fontSize: 18,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Oops! Something went wrong
      </Text>
      <Text
        style={{
          marginTop: 8,
          color: colors.text.secondary,
          fontSize: 14,
          textAlign: "center",
        }}
      >
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={{
            marginTop: 24,
            backgroundColor: colors.nasa.blue,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text
            style={{ color: colors.text.primary, fontWeight: "600" }}
          >
            Try Again
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
