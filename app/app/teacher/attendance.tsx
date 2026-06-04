import React, { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppButton } from "../../src/components/AppButton";
import { AppCard } from "../../src/components/AppCard";
import { AppScreen } from "../../src/components/AppScreen";
import { BottomNavBar } from "../../src/components/BottomNavBar";
import { mockChildren } from "../../src/data/mockChildren";
import { useBottomNavPress } from "../../src/navigation/useBottomNavPress";
import { Colors } from "../../src/theme/colors";
import { BorderRadius, Spacing } from "../../src/theme/spacing";
import type { AttendanceStatus } from "../../src/types/child";

const STATUS_OPTIONS: { status: AttendanceStatus; label: string }[] = [
  { status: "arrived", label: "הגיע" },
  { status: "not_arrived", label: "לא הגיע" },
  { status: "late", label: "מאחר" },
  { status: "left_early", label: "יצא מוקדם" },
];

export default function AttendanceScreen() {
  const handleBottomNavPress = useBottomNavPress("teacher");
  const [attendanceByChildId, setAttendanceByChildId] = useState(() =>
    Object.fromEntries(
      mockChildren.map((child) => [child.id, child.attendanceStatus]),
    ) as Record<string, AttendanceStatus>,
  );

  const summary = useMemo(() => {
    const statuses = Object.values(attendanceByChildId);

    return {
      arrived: statuses.filter((status) => status === "arrived").length,
      late: statuses.filter((status) => status === "late").length,
      notArrived: statuses.filter((status) => status === "not_arrived").length,
    };
  }, [attendanceByChildId]);

  const formattedDate = new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function updateChildStatus(childId: string, status: AttendanceStatus) {
    setAttendanceByChildId((current) => ({
      ...current,
      [childId]: status,
    }));
  }

  function handleSave() {
    Alert.alert("הנוכחות נשמרה בהצלחה", "בשלב הדמו הנתונים נשמרים רק במסך.");
  }

  return (
    <View style={styles.root}>
      <AppScreen scrollable contentStyle={styles.screenContent}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.iconButton}>☰</Text>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>!</Text>
            </View>
          </View>

          <Text style={styles.title}>נוכחות היום</Text>
          <Text style={styles.subtitle}>{formattedDate}</Text>

          <View style={styles.heroCard}>
            <Text style={styles.heroIcon}>✓</Text>
            <View style={styles.heroTextBlock}>
              <Text style={styles.heroTitle}>סימון מהיר וברור</Text>
              <Text style={styles.heroText}>
                עדכנו את מצב הילדים בבוקר ובמהלך היום בלחיצה אחת.
              </Text>
            </View>
          </View>
        </View>

        <AppCard style={styles.summaryCard}>
          <SummaryItem label="הגיעו" value={summary.arrived} tone="success" />
          <SummaryItem label="מאחרים" value={summary.late} tone="warning" />
          <SummaryItem label="לא הגיעו" value={summary.notArrived} tone="error" />
        </AppCard>

        <Text style={styles.sectionTitle}>רשימת ילדים</Text>

        {mockChildren.map((child) => {
          const selectedStatus = attendanceByChildId[child.id];

          return (
            <AppCard key={child.id} style={styles.childCard}>
              <View style={styles.childHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{child.name.slice(0, 1)}</Text>
                </View>

                <View style={styles.childInfo}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childAge}>{child.age}</Text>
                </View>
              </View>

              <View style={styles.statusGrid}>
                {STATUS_OPTIONS.map((option) => (
                  <StatusChip
                    key={option.status}
                    label={option.label}
                    status={option.status}
                    active={selectedStatus === option.status}
                    onPress={() => updateChildStatus(child.id, option.status)}
                  />
                ))}
              </View>
            </AppCard>
          );
        })}

        <AppButton title="שמור נוכחות" onPress={handleSave} style={styles.saveButton} />
      </AppScreen>

      <BottomNavBar
        activeItem="attendance"
        variant="teacher"
        onItemPress={handleBottomNavPress}
      />
    </View>
  );
}

function SummaryItem({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "success" | "warning" | "error";
}) {
  const color =
    tone === "success"
      ? Colors.presentText
      : tone === "warning"
        ? Colors.lateText
        : Colors.absentText;

  return (
    <View style={styles.summaryItem}>
      <Text style={[styles.summaryValue, { color }]}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summarySubtext}>ילדים</Text>
    </View>
  );
}

function StatusChip({
  label,
  status,
  active,
  onPress,
}: {
  label: string;
  status: AttendanceStatus;
  active: boolean;
  onPress: () => void;
}) {
  const colors = getStatusColors(status);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[
        styles.statusChip,
        {
          backgroundColor: active ? colors.backgroundColor : Colors.background,
          borderColor: active ? colors.color : Colors.background,
        },
      ]}
    >
      <Text style={[styles.statusText, { color: active ? colors.color : Colors.textSecondary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function getStatusColors(status: AttendanceStatus) {
  switch (status) {
    case "arrived":
      return { backgroundColor: Colors.presentBackground, color: Colors.presentText };
    case "not_arrived":
      return { backgroundColor: Colors.absentBackground, color: Colors.absentText };
    case "late":
      return { backgroundColor: Colors.lateBackground, color: Colors.lateText };
    case "left_early":
      return { backgroundColor: Colors.leftEarlyBackground, color: Colors.leftEarlyText };
  }
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
    width: 30,
    height: 30,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
  },
  notificationText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "800",
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
    color: Colors.presentText,
    fontSize: 28,
    lineHeight: 58,
    textAlign: "center",
    fontWeight: "800",
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
    fontSize: 24,
    fontWeight: "800",
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: "700",
    marginTop: 2,
  },
  summarySubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  childCard: {
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  childHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: Spacing.md,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
  },
  avatarText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "800",
  },
  childInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  childName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  childAge: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statusGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  statusChip: {
    minHeight: 38,
    minWidth: "45%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
  },
  saveButton: {
    marginTop: Spacing.md,
  },
});
