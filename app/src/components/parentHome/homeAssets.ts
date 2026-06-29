import type { ImageSourcePropType } from "react-native";

/**
 * Central registry for the approved Parent Home PNG illustrations exported from
 * Figma 03_ASSETS, rendered through expo-image.
 *
 * The approved SVGs (hero corner decor + menu / bell icons) are NOT listed here:
 * they are imported directly as React components via react-native-svg-transformer
 * at their point of use.
 *
 * Paths are relative to app/src/components/parentHome.
 */

/**
 * Parent Home surface colors (from approved Figma assets).
 * pageBackground — soft tint of hero decor green, blended toward white.
 * cardSurface — warm white for floating cards (towards beige).
 */
export const ParentHomeColors = {
  pageBackground: "#EBF2E0",
  cardSurface: "#FFFBF6",
} as const;

export const HomeAssets = {
  hero: {
    background: require("../../../assets/parent/home/hero/hero-background-artwork-mobile.png") as ImageSourcePropType,
  },
  summary: {
    events: require("../../../assets/parent/home/summary/summary-upcoming-events.png") as ImageSourcePropType,
    messages: require("../../../assets/parent/home/summary/summary-new-notifications.png") as ImageSourcePropType,
    attendance: require("../../../assets/parent/home/summary/summary-monthly-attendance.png") as ImageSourcePropType,
    children: require("../../../assets/parent/home/summary/summary-my-children-in-kindergarten.png") as ImageSourcePropType,
  },
  quickActions: {
    dailySummary: require("../../../assets/parent/home/quick-actions/action-daily-summary.png") as ImageSourcePropType,
    forms: require("../../../assets/parent/home/quick-actions/action-forms-and-documents.png") as ImageSourcePropType,
    calendar: require("../../../assets/parent/home/quick-actions/action-calendar.png") as ImageSourcePropType,
    todayPhotos: require("../../../assets/parent/home/quick-actions/action-today-photos.png") as ImageSourcePropType,
    liveCameras: require("../../../assets/parent/home/quick-actions/action-live-cameras.png") as ImageSourcePropType,
    albums: require("../../../assets/parent/home/quick-actions/action-albums.png") as ImageSourcePropType,
    announcements: require("../../../assets/parent/home/quick-actions/action-kindergarten-announcements.png") as ImageSourcePropType,
    suggestions: require("../../../assets/parent/home/quick-actions/action-kindergarten-suggestions.png") as ImageSourcePropType,
    contact: require("../../../assets/parent/home/quick-actions/action-contact-kindergarten.png") as ImageSourcePropType,
  },
  banner: {
    toys: require("../../../assets/parent/home/banner/child-banner-toys-illustration.png") as ImageSourcePropType,
  },
} as const;
