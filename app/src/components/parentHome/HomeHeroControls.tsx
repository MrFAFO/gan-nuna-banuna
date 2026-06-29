import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MenuIcon from "../../../assets/shared/ui-icons/menu.svg";
import BellIcon from "../../../assets/shared/ui-icons/notification-bell.svg";

interface HomeHeroControlsProps {
  topInset: number;
  unreadCount: number;
  onMenuPress: () => void;
  onNotificationsPress: () => void;
}

const CONTROL_SIZE = 34;
const TAP_TARGET = 44;
const TOP_OFFSET = 12;

/**
 * Persistent post-login top controls, fixed over the Hero.
 * Visible control is 34x34 (rounded 10, white 96%, subtle shadow) while the
 * touchable keeps a >=44x44 invisible tap target. Icons are the exact exported
 * Figma SVGs. Positioned with insets.top + 12 per the safe-area rule.
 */
export function HomeHeroControls({
  topInset,
  unreadCount,
  onMenuPress,
  onNotificationsPress,
}: HomeHeroControlsProps) {
  const top = topInset + TOP_OFFSET - (TAP_TARGET - CONTROL_SIZE) / 2;
  const hasUnread = unreadCount > 0;
  const badgeLabel = unreadCount > 9 ? "9+" : String(unreadCount);

  return (
    <>
      {/* Menu — top-left */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onMenuPress}
        accessibilityRole="button"
        accessibilityLabel="תפריט"
        style={[styles.tapTarget, { top, left: 14 - (TAP_TARGET - CONTROL_SIZE) / 2 }]}
      >
        <View style={styles.control}>
          <MenuIcon width={18} height={12} />
        </View>
      </TouchableOpacity>

      {/* Notifications — top-right */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onNotificationsPress}
        accessibilityRole="button"
        accessibilityLabel={
          hasUnread ? `התראות, ${unreadCount} חדשות` : "התראות"
        }
        style={[styles.tapTarget, { top, right: 14 - (TAP_TARGET - CONTROL_SIZE) / 2 }]}
      >
        <View style={styles.control}>
          <BellIcon width={18} height={20} />
          {hasUnread ? (
            <View
              style={[
                styles.badge,
                unreadCount > 1 ? styles.badgeWithCount : null,
              ]}
            >
              {unreadCount > 1 ? (
                <Text style={styles.badgeText} numberOfLines={1}>
                  {badgeLabel}
                </Text>
              ) : null}
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  tapTarget: {
    position: "absolute",
    width: TAP_TARGET,
    height: TAP_TARGET,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  control: {
    width: CONTROL_SIZE,
    height: CONTROL_SIZE,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.96)",
    alignItems: "center",
    justifyContent: "center",
    // Figma: shadow 0 5 16 rgba(31,58,43,0.1)
    shadowColor: "#1F3A2B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  badge: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D96B5B",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeWithCount: {
    minWidth: 14,
    width: undefined,
    height: 14,
    borderRadius: 7,
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 8,
    lineHeight: 9,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    includeFontPadding: false,
  },
});
