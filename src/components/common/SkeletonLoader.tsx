import { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { colors, radii, spacing } from "../../design";
import { useNativeDriver } from "../../utils/animations";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

const SkeletonItem = ({
  width = "100%",
  height = 16,
  borderRadius = radii.sm,
  style,
}: SkeletonLoaderProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: useNativeDriver,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: useNativeDriver,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: colors.background.surface,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const HomeSkeleton = () => (
  <View style={{ padding: spacing.lg, gap: spacing.lg }}>
    <SkeletonItem height={200} borderRadius={radii.xl} />
    <View style={{ flexDirection: "row", gap: spacing.md }}>
      {[1, 2].map((i) => (
        <SkeletonItem key={i} height={100} borderRadius={radii.lg} style={{ flex: 1 }} />
      ))}
    </View>
    <SkeletonItem width="40%" height={18} />
    <View style={{ flexDirection: "row", gap: spacing.md }}>
      {[1, 2, 3].map((i) => (
        <SkeletonItem key={i} width={160} height={130} borderRadius={radii.lg} />
      ))}
    </View>
  </View>
);

export const DetailSkeleton = () => (
  <View style={{ padding: spacing.lg, gap: spacing.lg }}>
    <SkeletonItem height={260} borderRadius={radii.lg} />
    <SkeletonItem width="70%" height={24} />
    <SkeletonItem width="40%" height={14} />
    <SkeletonItem height={100} borderRadius={radii.lg} />
    <SkeletonItem height={200} />
  </View>
);

export const CardSkeleton = () => (
  <View
    style={{
      backgroundColor: colors.background.card,
      borderRadius: radii.xl,
      overflow: "hidden",
      marginBottom: spacing.lg,
    }}
  >
    <SkeletonItem height={180} />
    <View style={{ padding: spacing.lg, gap: spacing.sm }}>
      <SkeletonItem width="50%" height={12} />
      <SkeletonItem width="80%" height={18} />
      <SkeletonItem height={14} />
      <SkeletonItem width="30%" height={14} />
    </View>
  </View>
);
