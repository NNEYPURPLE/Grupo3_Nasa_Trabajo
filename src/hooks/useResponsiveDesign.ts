import { useWindowDimensions } from "react-native";

export type DeviceType = "mobile" | "tablet" | "desktop";

export const useResponsiveDesign = () => {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  let deviceType: DeviceType = "mobile";
  if (isTablet) deviceType = "tablet";
  if (isDesktop) deviceType = "desktop";

  return {
    width,
    height,
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    select: <T>(config: { mobile: T; tablet?: T; desktop?: T }): T => {
      if (isDesktop && config.desktop !== undefined) return config.desktop;
      if (isTablet && config.tablet !== undefined) return config.tablet;
      return config.mobile;
    },
  };
};
