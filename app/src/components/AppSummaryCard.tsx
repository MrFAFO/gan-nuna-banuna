import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import { Colors } from "../theme/colors";
import { BorderRadius, Shadow } from "../theme/spacing";
import { IllustratedIcon } from "./IllustratedIcon";
import type { IllustratedIconName } from "../theme/illustratedIcons";

export interface AppSummaryItem {
  key: string;
  label: string;
  value: string;
  /** Bespoke illustration (optimized PNG). Falls back to `iconName` placeholder. */
  illustration?: ImageSourcePropType;
  iconName?: IllustratedIconName;
}

interface AppSummaryCardProps {
  items: AppSummaryItem[];
  title?: string;
  /** Defaults to today's Hebrew date. Pass "" to hide. */
  dateText?: string;
}

function formatTodayHebrew(): string {
  try {
    return new Intl.DateTimeFormat("he-IL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    return "";
  }
}

/**
 * The warm "summary" card from the Parent Home design, made reusable: a white
 * rounded card holding a row of warm mini-tiles, each with a label, illustration
 * and a value. See docs/16-design-system.md.
 */
export function AppSummaryCard({ items, title = "סיכום היום", dateText }: AppSummaryCardProps) {
  const date = dateText ?? formatTodayHebrew();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        {date ? (
          <Text style={styles.headerDate} numberOfLines={1}>
            {date}
          </Text>
        ) : null}
      </View>

      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.key} style={styles.item}>
            <Text
              style={styles.itemLabel}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {item.label}
            </Text>
            <View style={styles.itemIllustration}>
              {item.illustration ? (
                <Image
                  source={item.illustration}
                  style={styles.itemImage}
                  contentFit="contain"
                  transition={120}
                />
              ) : (
                <IllustratedIcon name={item.iconName ?? "calendar"} width={90} height={84} />
              )}
            </View>
            <Text style={styles.itemValue} numberOfLines={1}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const ITEM_H = 118;
const ILLUSTRATION_W = 90;
const ILLUSTRATION_H = 84;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl - 4, // 20
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 18,
    ...Shadow.warmCard,
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    height: 22,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "500",
    color: Colors.brandGreen,
    textAlign: "right",
  },
  headerDate: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.textMutedGreen,
    textAlign: "left",
  },
  grid: {
    flexDirection: "row-reverse",
    gap: 8,
    height: ITEM_H,
  },
  item: {
    flex: 1,
    height: ITEM_H,
    backgroundColor: Colors.surfaceWarm,
    borderWidth: 1,
    borderColor: Colors.borderWarm,
    borderRadius: BorderRadius.md, // 12
    overflow: "hidden",
  },
  itemLabel: {
    position: "absolute",
    top: 7,
    left: 0,
    right: 0,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: "500",
    color: Colors.brandGreen,
    textAlign: "center",
  },
  itemIllustration: {
    position: "absolute",
    top: 14,
    left: "50%",
    marginLeft: -(ILLUSTRATION_W / 2),
    width: ILLUSTRATION_W,
    height: ILLUSTRATION_H,
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: ILLUSTRATION_W,
    height: ILLUSTRATION_H,
  },
  itemValue: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    color: Colors.brandGreen,
    textAlign: "center",
  },
});
