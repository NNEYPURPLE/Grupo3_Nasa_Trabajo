import { Platform, TextStyle, ViewStyle } from "react-native";

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 22,
  full: 9999,
} as const;

const fontFamily = Platform.select({
  web: "'Inter', system-ui, -apple-system, sans-serif",
  default: "Inter_400Regular",
});

export const typography: Record<string, TextStyle> = {
  h1: { fontFamily, fontSize: 32, fontWeight: "800", lineHeight: 38, letterSpacing: -0.5 },
  h2: { fontFamily, fontSize: 26, fontWeight: "800", lineHeight: 32, letterSpacing: -0.3 },
  h3: { fontFamily, fontSize: 20, fontWeight: "700", lineHeight: 26 },
  h4: { fontFamily, fontSize: 17, fontWeight: "700", lineHeight: 22 },
  body: { fontFamily, fontSize: 15, fontWeight: "400", lineHeight: 24, letterSpacing: 0.2 },
  bodySmall: { fontFamily, fontSize: 13, fontWeight: "400", lineHeight: 20, letterSpacing: 0.2 },
  caption: { fontFamily, fontSize: 10, fontWeight: "600", lineHeight: 14, letterSpacing: 0.8 },
  label: { fontFamily, fontSize: 10, fontWeight: "700", lineHeight: 14, letterSpacing: 1 },
  overline: { fontFamily, fontSize: 9, fontWeight: "700", lineHeight: 12, letterSpacing: 1.5 },
  number: { fontFamily, fontSize: 24, fontWeight: "800", lineHeight: 28, letterSpacing: -0.5 },
  numberSmall: { fontFamily, fontSize: 18, fontWeight: "800", lineHeight: 22, letterSpacing: -0.3 },
  numberLarge: { fontFamily, fontSize: 32, fontWeight: "800", lineHeight: 36, letterSpacing: -1 },
};

const isRnWeb = Platform.OS === "web";

export const shadows: Record<string, ViewStyle> = {
  sm: isRnWeb
    ? { boxShadow: "0 2px 6px rgba(0,0,0,0.15)", elevation: 3 }
    : { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
  md: isRnWeb
    ? { boxShadow: "0 4px 12px rgba(0,0,0,0.2)", elevation: 5 }
    : { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
  lg: isRnWeb
    ? { boxShadow: "0 8px 24px rgba(0,0,0,0.25)", elevation: 8 }
    : { shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 8 },
  glow: isRnWeb
    ? { boxShadow: "0 0 24px rgba(11,61,145,0.35)", elevation: 10 }
    : { shadowColor: "#0B3D91", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 10 },
  glowAccent: isRnWeb
    ? { boxShadow: "0 0 24px rgba(252,61,33,0.3)", elevation: 10 }
    : { shadowColor: "#FC3D21", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 10 },
  glowPrimary: isRnWeb
    ? { boxShadow: "0 0 20px rgba(59,130,246,0.25), 0 4px 12px rgba(0,0,0,0.2)", elevation: 8 }
    : { shadowColor: "#3B82F6", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 8 },
};

export const colors = {
  nasa: {
    blue: "#0B3D91",
    blueLight: "#1A5FCC",
    blueDark: "#072A66",
    red: "#FC3D21",
    redLight: "#FF6B4A",
    dark: "#1A1A2E",
    light: "#E8E8E8",
    gray: "#4A4A6A",
    white: "#FFFFFF",
    black: "#000000",
  },
  primary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },
  accent: {
    orange: "#FC3D21",
    orangeLight: "#FF6B4A",
    gold: "#F59E0B",
    amber: "#F59E0B",
    teal: "#10B981",
    purple: "#7C3AED",
    blue: "#3B82F6",
    cyan: "#06B6D4",
    coral: "#FF6B6B",
    lime: "#A3E635",
    pink: "#E879F9",
    rose: "#F43F5E",
  },
  status: {
    loading: "#3B82F6",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
  },
  background: {
    primary: "#0A0A1A",
    secondary: "#141428",
    card: "#1A1A35",
    surface: "#222244",
    elevated: "#2A2A50",
  },
  glass: {
    light: "rgba(255, 255, 255, 0.04)",
    ultraLight: "rgba(255, 255, 255, 0.03)",
    medium: "rgba(255, 255, 255, 0.07)",
    heavy: "rgba(255, 255, 255, 0.12)",
    border: "rgba(255, 255, 255, 0.08)",
    borderMedium: "rgba(255, 255, 255, 0.12)",
    borderActive: "rgba(11, 61, 145, 0.3)",
  },
  text: {
    primary: "#F0F0F0",
    secondary: "#A0A0C0",
    muted: "#6B7280",
    accent: "#FC3D21",
  },
  border: {
    subtle: "#2A2A50",
    active: "#0B3D91",
    success: "#10B981",
    error: "#EF4444",
  },
  nebula: {
    blue: "rgba(56, 189, 248, 0.15)",
    purple: "rgba(124, 58, 237, 0.15)",
    teal: "rgba(16, 185, 129, 0.15)",
  },
  overlay: "rgba(0, 0, 0, 0.5)",
  cardOverlay: "rgba(10, 10, 26, 0.6)",
  overlayLight: "rgba(10, 10, 26, 0.6)",
} as const;

export const glassStyles: Record<string, ViewStyle> = {
  card: {
    backgroundColor: colors.glass.light,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.glass.border,
    overflow: "hidden",
  },
  cardActive: {
    backgroundColor: colors.glass.medium,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.glass.borderActive,
    overflow: "hidden",
  },
  surface: {
    backgroundColor: colors.glass.light,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  light: {
    backgroundColor: colors.glass.light,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  medium: {
    backgroundColor: colors.glass.medium,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.glass.borderMedium,
  },
};
