import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { HomeAssets } from "./homeAssets";

interface ChildBannerProps {
  childName: string;
  /** True when the selected child has a contract awaiting signature. */
  pending: boolean;
  onPress: () => void;
}

const FIGMA_W = 361;
const FIGMA_H = 86;

const SUBTITLE_LINE_1 = "כל העדכונים";
const SUBTITLE_LINE_2 = "והאירועים החשובים בגן";
const CTA_LABEL = "לכל הפרטים";

/**
 * Figma node 26:34 — fixed LTR layout inside the banner (matches Figma layer order).
 * Visual copy is always static; `pending` only affects the status-dot tint.
 */
export function ChildBanner({ childName, pending, onPress }: ChildBannerProps) {
  const [bannerWidth, setBannerWidth] = useState(FIGMA_W);
  const sx = bannerWidth / FIGMA_W;

  const name = childName.trim().length > 0 ? childName : "ילד/ה";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`היום של ${name}. ${SUBTITLE_LINE_1} ${SUBTITLE_LINE_2}`}
      style={styles.banner}
      onLayout={(e) => setBannerWidth(e.nativeEvent.layout.width)}
    >
      <Image
        source={HomeAssets.banner.toys}
        style={styles.watermark}
        contentFit="contain"
      />

      <View style={styles.layer}>
        <View style={[styles.textBlock, { left: -47 * sx, width: 280 * sx }]}>
          <Text
            style={styles.title}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.85}
          >
            היום של {name}
          </Text>
          <View style={styles.subtitleGroup}>
            <Text style={styles.subtitleLine}>{SUBTITLE_LINE_1}</Text>
            <Text style={styles.subtitleLine}>{SUBTITLE_LINE_2}</Text>
          </View>
        </View>

        <View style={[styles.ctaPill, { left: 52 * sx, width: 79 * sx }]}>
          <Text style={styles.ctaText} numberOfLines={1}>
            {CTA_LABEL}
          </Text>
        </View>

        <Text
          style={[styles.name, { left: 176 * sx, width: 79 * sx }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.85}
        >
          {name}
        </Text>

        <View style={[styles.avatarWrap, { left: 266 * sx }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial} numberOfLines={1}>
              {name.split(" ")[0].charAt(0)}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statusDot,
            pending ? styles.statusDotPending : null,
            { left: 172 * sx },
          ]}
        />
      </View>

      <Ionicons
        name="chevron-forward"
        size={13}
        color="#53755E"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

const DARK_GREEN = "#315A44";

const styles = StyleSheet.create({
  banner: {
    height: FIGMA_H,
    borderRadius: 18,
    backgroundColor: "#E5EBD9",
    borderWidth: 1,
    borderColor: "#E5EBD9",
    overflow: "hidden",
    direction: "ltr",
    shadowColor: "#1F3A2B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  watermark: {
    position: "absolute",
    left: -31,
    top: -10,
    width: 124,
    height: 124,
    opacity: 0.4,
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    direction: "ltr",
  },
  textBlock: {
    position: "absolute",
    top: 10,
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "500",
    color: DARK_GREEN,
    textAlign: "center",
    writingDirection: "rtl",
    width: "100%",
  },
  subtitleGroup: {
    alignItems: "center",
    gap: 0,
    marginTop: -1,
  },
  subtitleLine: {
    fontSize: 8,
    lineHeight: 10,
    fontWeight: "400",
    color: "#647166",
    textAlign: "center",
    writingDirection: "rtl",
  },
  ctaPill: {
    position: "absolute",
    top: 61,
    height: 17,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#B7C9A7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  ctaText: {
    fontSize: 9,
    lineHeight: 12,
    fontWeight: "400",
    color: "#53755E",
    textAlign: "right",
    alignSelf: "stretch",
    writingDirection: "rtl",
  },
  name: {
    position: "absolute",
    top: 34,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    color: DARK_GREEN,
    textAlign: "right",
    writingDirection: "rtl",
  },
  avatarWrap: {
    position: "absolute",
    top: 20,
    width: 46,
    height: 46,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F4D6C6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: "700",
    color: DARK_GREEN,
  },
  statusDot: {
    position: "absolute",
    top: 42,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6FA46B",
  },
  statusDotPending: {
    backgroundColor: "#E8A75D",
  },
  chevron: {
    position: "absolute",
    right: 14,
    top: "50%",
    marginTop: -7,
  },
});
