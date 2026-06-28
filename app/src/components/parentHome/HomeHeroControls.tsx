import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "../../theme/colors";
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
const TOP_OFFSET = 18;

/**
 * Persistent post-login top controls, fixed over the Hero.
 * Visible control is 34x34 (rounded 10, white 96%, subtle shadow) while the
 * touchable keeps a >=44x44 invisible tap target. Icons are the exact exported
 * Figma SVGs. Positioned with insets.top + 18 per the safe-area rule.
 */
export function HomeHeroControls({
  topInset,
  unreadCount,
  onMenuPress,
  onNotificationsPress,
}: HomeHeroControlsProps) {
  const top = topInset + TOP_OFFSET - (TAP_TARGET - CONTROL_SIZE) / 2;
  const badgeLabel = unreadCount > 99 ? "99+" : String(unreadCount);

  return (
    <>
      {/* Menu — top-left */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onMenuPress}
        accessibilityRole="button"
        accessibilityLabel="תפריט"
        style={[styles.tapTarget, { top, left: 16 - (TAP_TARGET - CONTROL_SIZE) / 2 }]}
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
          unreadCount > 0 ? `התראות, ${unreadCount} חדשות` : "התראות"
        }
        style={[styles.tapTarget, { top, right: 16 - (TAP_TARGET - CONTROL_SIZE) / 2 }]}
      >
        <View style={styles.control}>
          <BellIcon width={18} height={20} />
          {unreadCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1}>
                {badgeLabel}
              </Text>
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
    shadowColor: "#1F3A2B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: Colors.error,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 14,
  },
});
