import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
  variant?: "cosmic" | "card" | "dark" | "nebula" | "aurora";
}

export const GradientBackground = ({
  children,
  variant = "cosmic",
}: GradientBackgroundProps) => {
  const gradients = {
    cosmic: ["#0A0A1A", "#141428", "#0B0B2B"] as const,
    card: ["#1A1A35", "#222244"] as const,
    dark: ["#0A0A1A", "#141428"] as const,
    nebula: ["#0B0B2B", "#1A0A3E", "#0B3D91"] as const,
    aurora: ["#0A0A1A", "#141428", "#072A66"] as const,
  };

  return (
    <LinearGradient colors={gradients[variant]} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
};
