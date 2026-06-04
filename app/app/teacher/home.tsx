import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import type { Href } from "expo-router";
import { AppScreen } from "../../src/components/AppScreen";
import { AppCard } from "../../src/components/AppCard";
import { BottomNavBar } from "../../src/components/BottomNavBar";
import { CLIENT_CONFIG } from "../../src/config/client.config";
import { mockChildren } from "../../src/data/mockChildren";
import { mockDailyReportSummary } from "../../src/data/mockDailyReports";
import { useBottomNavPress } from "../../src/navigation/useBottomNavPress";
import { Colors } from "../../src/theme/colors";
import { Spacing } from "../../src/theme/spacing";

const teacherQuickActions: { id: string; label: string; route: Href }[] = [
  { id: "children", label: "ילדים", route: "/teacher/children" },
  { id: "attendance", label: "נוכחות", route: "/teacher/attendance" },
  { id: "daily-report", label: "סיכום יום", route: "/teacher/daily-report" },
  { id: "contracts", label: "חוזים", route: "/teacher/contracts" },
];

export default function TeacherHomeScreen() {
  const router = useRouter();
  const handleBottomNavPress = useBottomNavPress("teacher");
  const ownerName = CLIENT_CONFIG.ownerName || CLIENT_CONFIG.daycareName;

  return (
    <View style={styles.root}>
      <AppScreen scrollable>
        <View style={styles.content}>
          <Text style={styles.title}>בוקר טוב, {ownerName}</Text>
          <Text style={styles.subtitle}>{CLIENT_CONFIG.daycareName}</Text>
          <View style={styles.statsRow}>
            <AppCard style={styles.statCard}>
              <Text style={styles.statNumber}>{mockChildren.length}</Text>
              <Text style={styles.statLabel}>ילדים בגן</Text>
            </AppCard>
            <AppCard style={styles.statCard}>
              <Text style={styles.statNumber}>{mockDailyReportSummary.presentChildren}</Text>
              <Text style={styles.statLabel}>נוכחים היום</Text>
            </AppCard>
          </View>
          <AppCard style={styles.actionsCard}>
            <Text style={styles.actionsTitle}>פעולות מהירות</Text>
            <View style={styles.actionsGrid}>
              {teacherQuickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  activeOpacity={0.75}
                  onPress={() => router.push(action.route)}
                  style={styles.actionItem}
                >
                  <Text style={styles.actionText}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </AppCard>
          <AppCard style={styles.card}>
            <Text style={styles.cardTitle}>סקירת היום</Text>
            <Text style={styles.cardText}>כאן יופיעו נוכחות, פעולות יומיות ועדכונים מהגן.</Text>
          </AppCard>
        </View>
      </AppScreen>
      <BottomNavBar
        activeItem="home"
        variant="teacher"
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
  content: {
    paddingTop: Spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: "right",
  },
  card: {
    marginTop: Spacing.lg,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  cardText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  actionsCard: {
    marginTop: Spacing.lg,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  actionItem: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  actionText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "500",
  },
});
