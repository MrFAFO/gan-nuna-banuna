import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import { HomeAssets } from "./homeAssets";

export interface SummaryValues {
  events: string;
  messages: string;
  attendance: string;
  children: string;
}

interface SummaryItem {
  key: keyof SummaryValues;
  label: string;
  illustration: ImageSourcePropType;
}

/** Larger than Quick Actions — summary mini-cards have more vertical room. */
const ILLUSTRATION_W = 90;
const ILLUSTRATION_H = 84;

/**
 * Figma node 36:24. RTL visual order (right → left): upcoming events,
 * new notifications, monthly attendance, children in kindergarten.
 */
const SUMMARY_ITEMS: SummaryItem[] = [
  { key: "events", label: "אירועים קרובים", illustration: HomeAssets.summary.events },
  { key: "messages", label: "הודעות חדשות", illustration: HomeAssets.summary.messages },
  { key: "attendance", label: "נוכחות החודש", illustration: HomeAssets.summary.attendance },
  { key: "children", label: "ילדים בגן", illustration: HomeAssets.summary.children },
];

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

interface TodaySummaryCardProps {
  values: SummaryValues;
}

export function TodaySummaryCard({ values }: TodaySummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          סיכום היום
        </Text>
        <Text style={styles.headerDate} numberOfLines={1}>
          {formatTodayHebrew()}
        </Text>
      </View>

      <View style={styles.grid}>
        {SUMMARY_ITEMS.map((item) => (
          <View key={item.key} style={styles.item}>
            <Text
              style={styles.itemLabel}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {item.label}
            </Text>
            <Image
              source={item.illustration}
              style={styles.itemIllustration}
              contentFit="contain"
              transition={120}
            />
            <Text style={styles.itemValue} numberOfLines={1}>
              {values[item.key]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const DARK_GREEN = "#315A44";
/** Mini-card height — taller than Figma 99px so 78×72 icons + bottom values fit. */
const ITEM_H = 118;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 18,
    // Figma: drop-shadow 0 5 8 rgba(31,58,43,0.08)
    shadowColor: "#1F3A2B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
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
    color: DARK_GREEN,
    textAlign: "right",
  },
  headerDate: {
    fontSize: 12,
    fontWeight: "500",
    color: "#647166",
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
    backgroundColor: "#FFFCF8",
    borderWidth: 1,
    borderColor: "#F1E6D7",
    borderRadius: 12,
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
    color: DARK_GREEN,
    textAlign: "center",
  },
  itemIllustration: {
    position: "absolute",
    top: 14,
    left: "50%",
    marginLeft: -(ILLUSTRATION_W / 2),
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
    color: DARK_GREEN,
    textAlign: "center",
  },
});
