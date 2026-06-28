import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import type { Href } from "expo-router";

import { AppCard } from "../AppCard";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import { HomeAssets } from "./homeAssets";

interface QuickAction {
  id: string;
  label: string;
  illustration: ImageSourcePropType;
  route: Href;
}

/**
 * Complete 3x3 grid. Order is the approved RTL visual order; with a
 * row-reverse wrapping container the first item in each triple renders on the
 * right. Each entry keeps its existing product route.
 */
const QUICK_ACTIONS: QuickAction[] = [
  // Row 1
  { id: "daily-summary", label: "סיכום יום", illustration: HomeAssets.quickActions.dailySummary, route: "/parent/daily-summary" },
  { id: "forms", label: "טפסים ומסמכים", illustration: HomeAssets.quickActions.forms, route: "/parent/contract-renewal" },
  { id: "calendar", label: "לוח שנה", illustration: HomeAssets.quickActions.calendar, route: "/calendar" },
  // Row 2
  { id: "today-photos", label: "תמונות מהיום", illustration: HomeAssets.quickActions.todayPhotos, route: "/parent/gallery" },
  { id: "live-cameras", label: "מצלמות לייב", illustration: HomeAssets.quickActions.liveCameras, route: "/parent/cameras" as Href },
  { id: "albums", label: "אלבומים", illustration: HomeAssets.quickActions.albums, route: "/parent/albums" as Href },
  // Row 3
  { id: "announcements", label: "הודעות מהגן", illustration: HomeAssets.quickActions.announcements, route: "/messages" },
  { id: "suggestions", label: "הצעות מהגן", illustration: HomeAssets.quickActions.suggestions, route: "/parent/event-suggestions" as Href },
  { id: "contact", label: "צור קשר עם הגן", illustration: HomeAssets.quickActions.contact, route: "/parent/contact" },
];

export function QuickActionsGrid() {
  const router = useRouter();

  return (
    <View style={styles.grid}>
      {QUICK_ACTIONS.map((action) => (
        <TouchableOpacity
          key={action.id}
          activeOpacity={0.85}
          onPress={() => router.push(action.route)}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          style={styles.cell}
        >
          <AppCard style={styles.card}>
            <Image
              source={action.illustration}
              style={styles.illustration}
              contentFit="contain"
              transition={120}
            />
            <Text style={styles.label} numberOfLines={2}>
              {action.label}
            </Text>
          </AppCard>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: Spacing.md,
  },
  cell: {
    width: "31.5%",
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    minHeight: 104,
    gap: Spacing.xs,
  },
  illustration: {
    width: 52,
    height: 52,
  },
  label: {
    ...Typography.captionMedium,
    color: Colors.textPrimary,
    textAlign: "center",
  },
});
