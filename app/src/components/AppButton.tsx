import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";

import { Colors } from "../theme/colors";
import { BorderRadius, Shadow, Spacing } from "../theme/spacing";
import { Typography } from "../theme/typography";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  /** Light haptic tap on press (default true). */
  haptic?: boolean;
  /** Defaults to `title`. Override for icon-only or contextual labels. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

function getContainerStyle(variant: ButtonVariant) {
  switch (variant) {
    case "secondary":
      return styles.secondary;
    case "outline":
      return styles.outline;
    case "danger":
      return styles.danger;
    case "primary":
    default:
      return styles.primary;
  }
}

function getTextStyle(variant: ButtonVariant) {
  switch (variant) {
    case "secondary":
      return styles.secondaryText;
    case "outline":
      return styles.outlineText;
    case "danger":
      return styles.dangerText;
    case "primary":
    default:
      return styles.primaryText;
  }
}

function getSpinnerColor(variant: ButtonVariant) {
  switch (variant) {
    case "secondary":
      return Colors.textPrimary;
    case "outline":
      return Colors.primary;
    default:
      return Colors.white;
  }
}

export function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  haptic = true,
  accessibilityLabel,
  style,
  textStyle,
}: AppButtonProps) {
  const isInactive = disabled || loading;

  function handlePress() {
    if (isInactive) return;
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isInactive}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isInactive, busy: loading }}
      style={[
        styles.base,
        getContainerStyle(variant),
        isInactive ? styles.disabled : undefined,
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={getSpinnerColor(variant)} />
        ) : (
          <Text style={[styles.text, getTextStyle(variant), textStyle]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 4,
    borderRadius: BorderRadius.md,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: Colors.primary,
    ...Shadow.subtle,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.error,
  },
  text: {
    ...Typography.subtitle,
    textAlign: "center",
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.textPrimary,
  },
  outlineText: {
    color: Colors.primary,
  },
  dangerText: {
    color: Colors.white,
  },
});
