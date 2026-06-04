import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { AppButton } from "../../src/components/AppButton";
import { AppCard } from "../../src/components/AppCard";
import { AppScreen } from "../../src/components/AppScreen";
import { AppTextInput } from "../../src/components/AppTextInput";
import { BottomNavBar } from "../../src/components/BottomNavBar";
import { StatusBadge } from "../../src/components/StatusBadge";
import { CLIENT_CONFIG } from "../../src/config/client.config";
import { mockChildren } from "../../src/data/mockChildren";
import { useBottomNavPress } from "../../src/navigation/useBottomNavPress";
import { Colors } from "../../src/theme/colors";
import { BorderRadius, Spacing } from "../../src/theme/spacing";

export default function TeacherChildrenScreen() {
  const router = useRouter();
  const handleBottomNavPress = useBottomNavPress("teacher");
  const [searchText, setSearchText] = useState("");

  const filteredChildren = useMemo(() => {
    const query = searchText.trim();

    if (!query) {
      return mockChildren;
    }

    return mockChildren.filter((child) => child.name.includes(query));
  }, [searchText]);

  const presentCount = mockChildren.filter(
    (child) => child.attendanceStatus === "arrived",
  ).length;
  const absentCount = mockChildren.length - presentCount;

  return (
    <View style={styles.root}>
      <AppScreen scrollable contentStyle={styles.screenContent}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.iconButton}>☰</Text>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </View>

          <Text style={styles.title}>ילדים בגן</Text>
          <Text style={styles.subtitle}>
            רשימת הילדים ב{CLIENT_CONFIG.daycareName}
          </Text>

          <View style={styles.heroCard}>
            <Text style={styles.heroIcon}>◦</Text>
            <View style={styles.heroTextBlock}>
              <Text style={styles.heroTitle}>היום בגן</Text>
              <Text style={styles.heroText}>
                תמונת מצב מהירה של הילדים, הנוכחות והחוזים.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.searchRow}>
          <AppTextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="חיפוש ילד..."
            style={styles.searchInput}
          />

          <TouchableOpacity activeOpacity={0.75} style={styles.filterButton}>
            <Text style={styles.filterText}>סינון</Text>
          </TouchableOpacity>
        </View>

        <AppCard style={styles.summaryCard}>
          <SummaryItem label="סה״כ ילדים" value={mockChildren.length} />
          <SummaryItem label="נוכחים היום" value={presentCount} />
          <SummaryItem label="נעדרים היום" value={absentCount} />
        </AppCard>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>רשימת ילדים</Text>
          <Text style={styles.sectionMeta}>{filteredChildren.length} מוצגים</Text>
        </View>

        {filteredChildren.length === 0 ? (
          <AppCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>לא נמצאו ילדים</Text>
            <Text style={styles.emptyText}>נסו לחפש שם אחר או לנקות את החיפוש.</Text>
          </AppCard>
        ) : (
          filteredChildren.map((child) => (
            <AppCard key={child.id} style={styles.childCard}>
              <View style={styles.childMain}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{child.name.slice(0, 1)}</Text>
                </View>

                <View style={styles.childInfo}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childAge}>{child.age}</Text>

                  <View style={styles.badgeRow}>
                    <StatusBadge status={child.attendanceStatus} />
                    {child.contractStatus ? (
                      <StatusBadge status={child.contractStatus} />
                    ) : null}
                  </View>
                </View>

                <Text style={styles.detailsArrow}>‹</Text>
              </View>
            </AppCard>
          ))
        )}

        <AppButton
          title="הוספת ילד"
          onPress={() => router.push("/teacher/add-child")}
          style={styles.addButton}
        />
      </AppScreen>

      <BottomNavBar
        activeItem="children"
        variant="teacher"
        onItemPress={handleBottomNavPress}
      />
    </View>
  );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
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
  header: {
    gap: Spacing.sm,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBackground,
    color: Colors.textPrimary,
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
  },
  notification: {
    minWidth: 30,
    height: 30,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  notificationText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "700",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  heroCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.secondary,
    marginTop: Spacing.sm,
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBackground,
    color: Colors.primary,
    fontSize: 34,
    lineHeight: 58,
    textAlign: "center",
  },
  heroTextBlock: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  heroText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: "right",
    marginTop: 4,
  },
  searchRow: {
    flexDirection: "row-reverse",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.cardBackground,
  },
  filterText: {
    color: Colors.primary,
    fontWeight: "700",
  },
  summaryCard: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  listHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  sectionMeta: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  childCard: {
    marginBottom: Spacing.sm,
  },
  childMain: {
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
    fontSize: 20,
    fontWeight: "800",
    color: Colors.primary,
  },
  childInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  childName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  childAge: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: "right",
  },
  badgeRow: {
    flexDirection: "row-reverse",
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  detailsArrow: {
    color: Colors.textSecondary,
    fontSize: 28,
  },
  emptyCard: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  emptyText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  addButton: {
    marginTop: Spacing.md,
  },
});
