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

const PENDING_SUBTITLE = "יש טופס מהגן\nהממתין לחתימה";

/**
 * Figma node 26:34 — fixed LTR layout inside the banner (matches Figma layer order).
 */
export function ChildBanner({ childName, pending, onPress }: ChildBannerProps) {
  const [bannerWidth, setBannerWidth] = useState(FIGMA_W);
  const sx = bannerWidth / FIGMA_W;

  const name = childName.trim().length > 0 ? childName : "ילד/ה";
  const cta = pending ? "לצפייה ולחתימה" : "לכל הפרטים";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={
        pending
          ? `היום של ${name}. יש טופס מהגן הממתין לחתימה`
          : `היום של ${name}. כל העדכונים והרגעים החשובים מהגן`
      }
      style={styles.banner}
      onLayout={(e) => setBannerWidth(e.nativeEvent.layout.width)}
    >
      <Image
        source={HomeAssets.banner.toys}
        style={styles.watermark}
        contentFit="contain"
      />

      <View style={styles.layer}>
        <Text
          style={[styles.title, { width: 121 * sx }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.85}
        >
          היום של {name}
        </Text>

        {pending ? (
          <Text
            style={[styles.subtitle, { left: -47 * sx, width: 280 * sx }]}
          >
            {PENDING_SUBTITLE}
          </Text>
        ) : (
          <View style={[styles.subtitleWrap, { left: -47 * sx, width: 280 * sx }]}>
            <Text style={styles.subtitleLine}>כל העדכונים</Text>
            <Text style={styles.subtitleLine}>והרגעים החשובים מהגן</Text>
          </View>
        )}

        <View style={[styles.ctaPill, { left: 52 * sx, width: 79 * sx }]}>
          <Text style={styles.ctaText} numberOfLines={1}>
            {cta}
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
  title: {
    position: "absolute",
    left: 0,
    top: 10,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "500",
    color: DARK_GREEN,
    textAlign: "right",
    writingDirection: "rtl",
  },
  subtitleWrap: {
    position: "absolute",
    top: 27,
    alignItems: "center",
    gap: 1,
  },
  subtitle: {
    position: "absolute",
    top: 27,
    fontSize: 8,
    lineHeight: 11,
    fontWeight: "400",
    color: "#647166",
    textAlign: "center",
    writingDirection: "rtl",
  },
  subtitleLine: {
    fontSize: 8,
    lineHeight: 11,
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
