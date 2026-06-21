import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, typography } from "../design";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary para capturar errores en toda la aplicación
 * y mostrar una interfaz amigable al usuario
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Loguear el error (en producción, enviar a servicio como Sentry)
    console.error("🔴 Error boundary caught:", {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background.primary,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: spacing.lg,
          }}
        >
          <Ionicons
            name="alert-circle"
            size={64}
            color={colors.status.error}
            style={{ marginBottom: spacing.lg }}
          />
          <Text
            style={[
              typography.h2,
              {
                color: colors.text.primary,
                textAlign: "center",
                marginBottom: spacing.md,
              },
            ]}
          >
            Algo salió mal
          </Text>
          <Text
            style={{
              color: colors.text.secondary,
              textAlign: "center",
              fontSize: 14,
              marginBottom: spacing.xxl,
              lineHeight: 20,
            }}
          >
            {this.state.error?.message || "Ocurrió un error inesperado"}
          </Text>
          <TouchableOpacity
            onPress={this.handleReset}
            style={{
              backgroundColor: colors.nasa.blue,
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.md,
              borderRadius: 8,
            }}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Intentar de nuevo"
          >
            <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
              Intentar de nuevo
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
