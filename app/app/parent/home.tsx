import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import type { Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../../src/auth/AuthContext";
import { AppButton } from "../../src/components/AppButton";
import { AppCard } from "../../src/components/AppCard";
import { AppHeader } from "../../src/components/AppHeader";
import { AppScreen } from "../../src/components/AppScreen";
import { AppStateCard } from "../../src/components/AppStateCard";
import { BottomNavBar } from "../../src/components/BottomNavBar";
import { IllustratedIcon } from "../../src/components/IllustratedIcon";
import { StatusBadge } from "../../src/components/StatusBadge";
import { useAsyncData } from "../../src/hooks/useAsyncData";
import { useHero } from "../../src/daycare/DaycareBrandingContext";
import { Colors } from "../../src/theme/colors";
import { Typography } from "../../src/theme/typography";
import { BorderRadius, Spacing } from "../../src/theme/spacing";
import type { IllustratedIconName } from "../../src/theme/illustratedIcons";
import {
  getCurrentDaycareName,
  getCurrentParentChildId,
} from "../../src/services/auth.service";
import { getChildById } from "../../src/services/children.service";
import { getContractByChildId } from "../../src/services/contracts.service";
import { getParentHomeStats } from "../../src/services/parentHome.service";
import { useBottomNavPress } from "../../src/navigation/useBottomNavPress";

const STAT_ICONS: Record<string, IllustratedIconName> = {
  events: "events",
  messages: "messages",
  attendance: "attendance",
  children: "children",
};

interface HomeAction {
  id: string;
  icon: IllustratedIconName;
  label: string;
  subtitle: string;
  route: Href;
}

const HOME_ACTIONS: HomeAction[] = [
  { id: "calendar", icon: "calendar", label: "לוח שנה", subtitle: "אירועים ופעילויות", route: "/calendar" },
  { id: "documents", icon: "documents", label: "מסמכים", subtitle: "טפסים ומסמכים", route: "/parent/contract-renewal" },
  { id: "dailySummary", icon: "dailySummary", label: "סיכום יום", subtitle: "מעקב ותיעוד יומי", route: "/parent/daily-summary" },
  { id: "albums", icon: "albums", label: "אלבומים", subtitle: "אלבומי תמונות", route: "/parent/albums" as Href },
  { id: "cameras", icon: "cameras", label: "מצלמות", subtitle: "צפייה בזמן אמת", route: "/parent/cameras" as Href },
  { id: "photos", icon: "photos", label: "תמונות", subtitle: "תמונות אחרונות", route: "/parent/gallery" },
  { id: "contact", icon: "contact", label: "צור קשר", subtitle: "שיחה ישירה עם הגן", route: "/parent/contact" },
  { id: "suggestions", icon: "suggestions", label: "הצעות מהגן", subtitle: "רעיונות ופעילויות", route: "/parent/event-suggestions" as Href },
  { id: "messages", icon: "messages", label: "הודעות מהגן", subtitle: "עדכונים חשובים", route: "/messages" },
];

function formatToday() {
  return new Date().toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ParentHomeScreen() {
  const router = useRouter();
  const handleBottomNavPress = useBottomNavPress("parent");
  const { profile, setParentChildId } = useAuth();
  const parentChildId = getCurrentParentChildId();
  const hasMultipleChildren = (profile?.parentChildIds.length ?? 0) > 1;

  const { data, loading, error, reload } = useAsyncData(async () => {
    const childIds = profile?.parentChildIds ?? [parentChildId];
    const children = await Promise.all(childIds.map((id) => getChildById(id)));
    const [child, contract, stats] = await Promise.all([
      getChildById(parentChildId),
      getContractByChildId(parentChildId),
      getParentHomeStats(),
    ]);
    return { children: children.filter(Boolean), child, contract, stats };
  }, [parentChildId, profile?.parentChildIds]);

  const parentChild = data?.child;
  const parentContract = data?.contract;
  const hasPendingContract = parentContract?.status === "sent";
  const parentStats = data?.stats ?? [];
  const parentHomeHero = useHero("parentHome");

  return (
    <View style={styles.root}>
      <AppScreen scrollable noPadding contentStyle={styles.screenContent}>
        <View style={styles.heroSection}>
          <Image
            source={parentHomeHero}
            style={styles.fullHeroImage}
            contentFit="cover"
            contentPosition="top"
          />
          <View style={styles.heroGradient} />
          <View style={styles.headerOverlay}>
            <AppHeader
              onBellPress={() => router.push("/notifications")}
              onLeadingPress={() => router.push("/settings")}
            />
          </View>
          <View style={styles.heroGreeting}>
            <Text style={styles.greeting}>יום טוב ☀️</Text>
            <Text style={styles.greetingSubtext}>
              יום נפלא ב{getCurrentDaycareName()}!
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          {loading || !data ? (
            <AppStateCard
              state="loading"
              title="טוען נתונים"
              message="רגע, טוענים את העדכונים מהגן"
            />
          ) : error ? (
            <AppStateCard
              state="error"
              title="לא הצלחנו לטעון"
              message="אירעה שגיאה בטעינת הנתונים. נסו שוב."
              actionLabel="נסו שוב"
              onActionPress={reload}
            />
          ) : (
            <>
              {hasMultipleChildren ? (
                <View style={styles.childPicker}>
                  {(data.children ?? []).map((childOption) => {
                    if (!childOption) {
                      return null;
                    }
                    const selected = childOption.id === parentChildId;
                    return (
                      <TouchableOpacity
                        key={childOption.id}
                        activeOpacity={0.85}
                        onPress={() => setParentChildId(childOption.id)}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        accessibilityLabel={childOption.name}
                        style={[styles.childPickerItem, selected && styles.childPickerItemSelected]}
                      >
                        <Text
                          style={[
                            styles.childPickerText,
                            selected && styles.childPickerTextSelected,
                          ]}
                        >
                          {childOption.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}

              <AppCard style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                  <Text style={styles.summaryTitle}>סיכום היום</Text>
                  <Text style={styles.summaryDate}>{formatToday()}</Text>
                </View>
                <View style={styles.statsGrid}>
                  {parentStats.map((stat) => (
                    <View key={stat.id} style={styles.statItem}>
                      <Text style={styles.statLabel} numberOfLines={1}>
                        {stat.label}
                      </Text>
                      <IllustratedIcon
                        name={STAT_ICONS[stat.id] ?? "events"}
                        size={44}
                        style={styles.statIcon}
                      />
                      <Text style={styles.statValue}>{stat.value}</Text>
                      <Text style={styles.statText} numberOfLines={1}>
                        {stat.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </AppCard>

              {hasPendingContract ? (
                <AppCard style={styles.contractAlert}>
                  <View style={styles.contractHeader}>
                    <StatusBadge status="sent" />
                    <Text style={styles.contractTitle}>חוזה חדש ממתין לחתימה</Text>
                  </View>
                  <Text style={styles.contractText}>
                    יש לעיין בחוזה ולחתום עליו בהקדם כדי להשלים את ההרשמה.
                  </Text>
                  <AppButton
                    title="חתימה על חוזה"
                    onPress={() => router.push("/parent/contract-renewal")}
                    style={styles.contractButton}
                  />
                </AppCard>
              ) : null}

              <View style={styles.actionsGrid}>
                {HOME_ACTIONS.map((action) => (
                  <TouchableOpacity
                    key={action.id}
                    activeOpacity={0.85}
                    onPress={() => router.push(action.route)}
                    accessibilityRole="button"
                    accessibilityLabel={`${action.label}, ${action.subtitle}`}
                    style={styles.actionPressable}
                  >
                    <AppCard style={styles.actionCard}>
                      <IllustratedIcon name={action.icon} size={56} />
                      <Text style={styles.actionLabel} numberOfLines={1}>
                        {action.label}
                      </Text>
                      <Text style={styles.actionSubtitle} numberOfLines={1}>
                        {action.subtitle}
                      </Text>
                    </AppCard>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push("/parent/child")}
                accessibilityRole="button"
                accessibilityLabel={`צפייה בפרופיל של ${parentChild?.name ?? "הילד/ה"}`}
              >
                <AppCard elevation="elevated" style={styles.childCard}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {parentChild?.name.slice(0, 1) ?? "י"}
                    </Text>
                  </View>
                  <View style={styles.childTextBlock}>
                    <Text style={styles.childName}>
                      היום של {parentChild?.name ?? "ילד/ה"}
                    </Text>
                    <Text style={styles.childSubtitle}>
                      כל העדכונים והרגעים החשובים מהיום
                    </Text>
                  </View>
                  <Ionicons name="chevron-back" size={20} color={Colors.textSecondary} />
                </AppCard>
              </TouchableOpacity>
            </>
          )}
        </View>
      </AppScreen>

      <BottomNavBar
        activeItem="home"
        variant="parent"
        onItemPress={handleBottomNavPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContent: {
    paddingBottom: Spacing.xxl,
  },
  heroSection: {
    width: "100%",
    height: 300,
    position: "relative",
    backgroundColor: Colors.background,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    overflow: "hidden",
  },
  fullHeroImage: {
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: Colors.heroOverlay,
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  heroGreeting: {
    position: "absolute",
    top: Spacing.xxl + Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    alignItems: "center",
  },
  greeting: {
    ...Typography.titleLarge,
    color: Colors.white,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    textAlign: "center",
  },
  greetingSubtext: {
    ...Typography.bodyMedium,
    color: "rgba(255,255,255,0.95)",
    textAlign: "center",
    marginTop: 2,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  body: {
    paddingHorizontal: Spacing.md,
    marginTop: -Spacing.xl,
    gap: Spacing.md,
  },
  childPicker: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: Spacing.xs,
  },
  childPickerItem: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  childPickerItemSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.primary,
  },
  childPickerText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  childPickerTextSelected: {
    color: Colors.primary,
  },
  summaryCard: {
    gap: Spacing.md,
  },
  summaryHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
  },
  summaryDate: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statsGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  statItem: {
    flexBasis: "31%",
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
  },
  statIcon: {
    marginVertical: 4,
  },
  statValue: {
    ...Typography.title,
    color: Colors.primary,
  },
  statLabel: {
    ...Typography.label,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  statText: {
    ...Typography.label,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 2,
  },
  contractAlert: {
    backgroundColor: Colors.sentBackground,
    borderColor: Colors.reminderBorder,
  },
  contractHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  contractTitle: {
    flex: 1,
    ...Typography.subtitle,
    color: Colors.textPrimary,
    textAlign: "right",
  },
  contractText: {
    color: Colors.sentText,
    ...Typography.body,
    textAlign: "right",
    marginTop: Spacing.sm,
  },
  contractButton: {
    marginTop: Spacing.md,
  },
  actionsGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: Spacing.md,
  },
  actionPressable: {
    width: "31.5%",
  },
  actionCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    gap: 4,
  },
  actionLabel: {
    ...Typography.captionMedium,
    color: Colors.textPrimary,
    textAlign: "center",
    marginTop: 4,
  },
  actionSubtitle: {
    ...Typography.label,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  childCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
  },
  avatarText: {
    ...Typography.titleLarge,
    color: Colors.primary,
  },
  childTextBlock: {
    flex: 1,
    alignItems: "flex-end",
  },
  childName: {
    ...Typography.title,
    color: Colors.textPrimary,
    textAlign: "right",
  },
  childSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: "right",
  },
});
