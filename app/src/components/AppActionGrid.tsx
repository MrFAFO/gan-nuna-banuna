import React from "react";
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import { Colors } from "../theme/colors";
import { BorderRadius, Shadow, Spacing } from "../theme/spacing";
import { IllustratedIcon } from "./IllustratedIcon";
import type { IllustratedIconName } from "../theme/illustratedIcons";

export interface AppActionItem {
  id: string;
  title: string;
  subtitle?: string;
  /** Bespoke illustration (optimized PNG). Falls back to `iconName` placeholder. */
  illustration?: ImageSourcePropType;
  iconName?: IllustratedIconName;
  onPress: () => void;
  accessibilityLabel?: string;
}

interface AppActionGridProps {
  actions: AppActionItem[];
  /** Horizontal inset from screen edges (default: 2 × Spacing.md) */
  horizontalInset?: number;
}

/**
 * The signature warm 3-column action grid from the Parent Home design, made
 * reusable. Each card is a white rounded tile with a green-tinted shadow and an
 * illustration over a title + subtitle. Pass `illustration` once bespoke art is
 * optimized; until then pass `iconName` to render the IllustratedIcon placeholder.
 * See docs/16-design-system.md.
 */
export function AppActionGrid({ actions, horizontalInset = Spacing.md * 2 }: AppActionGridProps) {
  const { width } = useWindowDimensions();
  const contentWidth = width - horizontalInset;
  const columnGap = Spacing.sm;
  const cardWidth = (contentWidth - columnGap * 2) / 3;

  return (
    <View style={[styles.grid, { columnGap, rowGap: columnGap }]}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          activeOpacity={0.85}
          onPress={action.onPress}
          accessibilityRole="button"
          accessibilityLabel={
            action.accessibilityLabel ??
            `${action.title}${action.subtitle ? `. ${action.subtitle}` : ""}`
          }
          style={[styles.card, { width: cardWidth }]}
        >
          {action.illustration ? (
            <Image
              source={action.illustration}
              style={styles.illustration}
              contentFit="contain"
              transition={120}
            />
          ) : (
            <IllustratedIcon name={action.iconName ?? "calendar"} width={78} height={72} />
          )}
          <Text style={styles.title} numberOfLines={1}>
            {action.title}
          </Text>
          {action.subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {action.subtitle}
            </Text>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
  },
  card: {
    height: 116,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.sm + 2, // 10
    overflow: "hidden",
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 10,
    paddingHorizontal: 4,
    ...Shadow.warmTile,
  },
  illustration: {
    width: 78,
    height: 72,
  },
  title: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    color: Colors.brandGreen,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
    color: Colors.brandGreen,
    textAlign: "center",
  },
});
