import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppCard } from "../../src/components/AppCard";
import { AppScreen } from "../../src/components/AppScreen";
import { BottomNavBar } from "../../src/components/BottomNavBar";
import {
  mockDailyActivities,
  mockDailyMeals,
  mockDailyMessages,
  mockDailyNotes,
  mockDailyReportSummary,
} from "../../src/data/mockDailyReports";
import { useBottomNavPress } from "../../src/navigation/useBottomNavPress";
import { Colors } from "../../src/theme/colors";
import { BorderRadius, Spacing } from "../../src/theme/spacing";

const CATEGORY_LABELS: Record<string, string> = {
  learning: "למידה",
  creative: "יצירה",
  movement: "תנועה",
  story: "סיפור",
  outdoor: "חצר",
};

const MEAL_LABELS: Record<string, string> = {
  breakfast: "בוקר",
  lunch: "צהריים",
  snack: "ביניים",
};

export default function TeacherDailyReportScreen() {
  const handleBottomNavPress = useBottomNavPress("teacher");
  const formattedDate = new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function showPlaceholder(action: string) {
    Alert.alert(action, "הפעולה תתחבר בהמשך. בשלב הזה מוצגים נתוני דמו בלבד.");
  }

  return (
    <View style={styles.root}>
      <AppScreen scrollable contentStyle={styles.screenContent}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.iconButton}>☰</Text>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>2</Text>
            </View>
          </View>

          <Text style={styles.title}>סיכום יום</Text>
          <Text style={styles.subtitle}>{formattedDate}</Text>

          <View style={styles.heroCard}>
            <Text style={styles.heroIcon}>✎</Text>
            <View style={styles.heroTextBlock}>
              <Text style={styles.heroTitle}>מה חשוב להורים לדעת?</Text>
              <Text style={styles.heroText}>
                ריכוז הפעילויות, הארוחות וההערות שיופיעו בסיכום היום.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryGrid}>
          <SummaryCard
            label="נוכחות"
            value={mockDailyReportSummary.presentChildren}
            text="ילדים הגיעו"
          />
          <SummaryCard
            label="פעילויות"
            value={mockDailyReportSummary.activitiesCount}
            text="פעילויות"
          />
          <SummaryCard
            label="ארוחות"
            value={mockDailyReportSummary.mealsCount}
            text="ארוחות"
          />
          <SummaryCard
            label="הודעות להורים"
            value={mockDailyReportSummary.messagesCount}
            text="נשלחו"
          />
        </View>

        <SectionHeader
          title="פעילויות מרכזיות"
          actionLabel="הוספת פעילות"
          onPress={() => showPlaceholder("הוספת פעילות")}
        />

        {mockDailyActivities.map((activity) => (
          <AppCard key={activity.id} style={styles.contentCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTime}>{activity.time}</Text>
              <Text style={styles.badge}>{CATEGORY_LABELS[activity.category]}</Text>
            </View>
            <Text style={styles.itemTitle}>{activity.title}</Text>
            <Text style={styles.itemText}>{activity.description}</Text>
          </AppCard>
        ))}

        <SectionHeader
          title="הודעות להורים"
          actionLabel="צפייה בכל ההודעות"
          onPress={() => showPlaceholder("הודעות להורים")}
        />

        <AppCard style={styles.contentCard}>
          {mockDailyMessages.map((message, index) => (
            <View
              key={message.id}
              style={[
                styles.compactItem,
                index === mockDailyMessages.length - 1 && styles.lastCompactItem,
              ]}
            >
              <Text style={styles.itemTime}>{message.time}</Text>
              <Text style={styles.itemText}>{message.text}</Text>
            </View>
          ))}
        </AppCard>

        <SectionHeader
          title="הערות מהיום"
          actionLabel="הוספת הערה"
          onPress={() => showPlaceholder("הוספת הערה")}
        />

        <AppCard style={styles.contentCard}>
          {mockDailyNotes.map((note, index) => (
            <View
              key={note.id}
              style={[
                styles.compactItem,
                index === mockDailyNotes.length - 1 && styles.lastCompactItem,
              ]}
            >
              <Text style={styles.itemTitle}>{note.childName ?? "הערה כללית"}</Text>
              <Text style={styles.itemText}>{note.text}</Text>
            </View>
          ))}
        </AppCard>

        <Text style={styles.sectionTitle}>מה אכלנו היום</Text>
        {mockDailyMeals.map((meal) => (
          <AppCard key={meal.id} style={styles.contentCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTime}>{meal.time}</Text>
              <Text style={styles.badge}>{MEAL_LABELS[meal.mealType]}</Text>
            </View>
            <Text style={styles.itemTitle}>{meal.title}</Text>
            <Text style={styles.itemText}>{meal.description}</Text>
          </AppCard>
        ))}
      </AppScreen>

      <BottomNavBar
        activeItem="daily"
        variant="teacher"
        onItemPress={handleBottomNavPress}
      />
    </View>
  );
}

function SummaryCard({
  label,
  value,
  text,
}: {
  label: string;
  value: number;
  text: string;
}) {
  return (
    <AppCard style={styles.summaryCard}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryText}>{text}</Text>
    </AppCard>
  );
}

function SectionHeader({
  title,
  actionLabel,
  onPress,
}: {
  title: string;
  actionLabel: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
        <Text style={styles.sectionAction}>{actionLabel}</Text>
      </TouchableOpacity>
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
    color: Colors.primary,
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
  summaryGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  summaryCard: {
    width: "48%",
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.primary,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center",
  },
  summaryText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionAction: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  contentCard: {
    marginBottom: Spacing.sm,
  },
  itemHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.xs,
  },
  itemTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  badge: {
    fontSize: 12,
    color: Colors.primary,
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    overflow: "hidden",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  itemText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: "right",
  },
  compactItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  lastCompactItem: {
    borderBottomWidth: 0,
  },
});
