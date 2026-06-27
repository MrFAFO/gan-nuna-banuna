import React from "react";
import { StyleSheet, View } from "react-native";
import type { ImageStyle, StyleProp, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../theme/colors";
import { BorderRadius } from "../theme/spacing";
import {
  IllustratedIcons,
  IllustratedIconFallback,
  type IllustratedIconName,
} from "../theme/illustratedIcons";

interface IllustratedIconProps {
  name: IllustratedIconName;
  /** Rendered box size in px. Defaults to 56. */
  size?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a warm illustrated icon. While real artwork is still being exported
 * from Figma (source is `null` in the registry), it shows a branded placeholder
 * — a soft tile with the matching line icon — so the layout is final and only
 * the art needs swapping in later.
 */
export function IllustratedIcon({ name, size = 56, style }: IllustratedIconProps) {
  const source = IllustratedIcons[name];

  if (source) {
    return (
      <Image
        source={source}
        style={[{ width: size, height: size }, style as StyleProp<ImageStyle>]}
        contentFit="contain"
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        { width: size, height: size, borderRadius: size * 0.28 },
        style,
      ]}
    >
      <Ionicons
        name={IllustratedIconFallback[name]}
        size={size * 0.5}
        color={Colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.md,
  },
});
