import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import { AppCard } from "../AppCard";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
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

/** RTL visual order: events → messages → attendance → children. */
const SUMMARY_ITEMS: SummaryItem[] = [
  { key: "events", label: "אירועים קרובים", illustration: HomeAssets.summary.events },
  { key: "messages", label: "הודעות חדשות", illustration: HomeAssets.summary.messages },
  { key: "attendance", label: "נוכחות החודש", illustration: HomeAssets.summary.attendance },
  { key: "children", label: "ילדים בגן", illustration: HomeAssets.summary.children },
];

interface TodaySummaryCardProps {
  values: SummaryValues;
}

export function TodaySummaryCard({ values }: TodaySummaryCardProps) {
  return (
    <AppCard elevation="elevated" style={styles.card}>
      <View style={styles.row}>
        {SUMMARY_ITEMS.map((item) => (
          <View key={item.key} style={styles.item}>
            <Image
              source={item.illustration}
              style={styles.illustration}
              contentFit="contain"
              transition={120}
            />
            <Text style={styles.value} numberOfLines={1}>
              {values[item.key]}
            </Text>
            <Text style={styles.label} numberOfLines={2}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 2,
    gap: 2,
  },
  illustration: {
    width: 40,
    height: 40,
    marginBottom: 2,
  },
  value: {
    ...Typography.titleLarge,
    color: Colors.primary,
    textAlign: "center",
  },
  label: {
    ...Typography.label,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
