import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";
import { BorderRadius, Shadow, Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import { HomeAssets } from "./homeAssets";

interface ChildBannerProps {
  childName: string;
  /** True when the selected child has a contract awaiting signature. */
  pending: boolean;
  onPress: () => void;
}

/**
 * One compact child-attention banner shown after the Quick Actions grid.
 * Title is always dynamic ("היום של {childName}"); when a real pending form
 * exists for the child, the subtitle + CTA swap to point at the existing
 * contract-renewal flow. The toys illustration is the exact Figma asset.
 */
export function ChildBanner({ childName, pending, onPress }: ChildBannerProps) {
  const name = childName.trim().length > 0 ? childName : "ילד/ה";
  const subtitle = pending
    ? "יש טופס מהגן הממתין לחתימה"
    : "כל העדכונים והרגעים החשובים מהגן";
  const cta = pending ? "לצפייה ולחתימה" : "לכל הפרטים";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`היום של ${name}. ${subtitle}`}
      style={[styles.banner, pending ? styles.bannerPending : styles.bannerDefault]}
    >
      <View style={styles.textBlock}>
        <Text style={styles.title} numberOfLines={1}>
          היום של {name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
        <View style={styles.ctaRow}>
          <Text style={styles.ctaText}>{cta}</Text>
          <Ionicons name="chevron-back" size={16} color={Colors.primary} />
        </View>
      </View>

      <Image
        source={HomeAssets.banner.toys}
        style={styles.illustration}
        contentFit="contain"
        transition={120}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    ...Shadow.card,
  },
  bannerDefault: {
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.border,
  },
  bannerPending: {
    backgroundColor: Colors.sentBackground,
    borderColor: Colors.reminderBorder,
  },
  textBlock: {
    flex: 1,
    alignItems: "flex-end",
    gap: 2,
  },
  title: {
    ...Typography.title,
    color: Colors.textPrimary,
    textAlign: "right",
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  ctaRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 2,
    marginTop: Spacing.xs,
  },
  ctaText: {
    ...Typography.captionMedium,
    color: Colors.primary,
  },
  illustration: {
    width: 84,
    height: 84,
  },
});
