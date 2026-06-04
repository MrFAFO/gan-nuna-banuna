import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { AppButton } from "../../src/components/AppButton";
import { AppCard } from "../../src/components/AppCard";
import { AppScreen } from "../../src/components/AppScreen";
import { AppTextInput } from "../../src/components/AppTextInput";
import { BottomNavBar } from "../../src/components/BottomNavBar";
import { mockChildren } from "../../src/data/mockChildren";
import { mockParentChildId } from "../../src/data/mockParent";
import { useBottomNavPress } from "../../src/navigation/useBottomNavPress";
import { Colors } from "../../src/theme/colors";
import { BorderRadius, Spacing } from "../../src/theme/spacing";

const REPORT_OPTIONS = [
  "הילד לא מגיע היום",
  "נגיע מאוחר",
  "הילד יצא מוקדם",
  "אבקש שהגננת תחזור אליי",
];

export default function ParentAbsenceReportScreen() {
  const router = useRouter();
  const handleBottomNavPress = useBottomNavPress("parent");
  const child = mockChildren.find((item) => item.id === mockParentChildId);
  const [selectedReport, setSelectedReport] = useState(REPORT_OPTIONS[0]);
  const [note, setNote] = useState("");

  const formattedDate = new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function handleSend() {
    Alert.alert(
      "הדיווח נשלח לגננת",
      "בשלב הדמו לא נשלחת הודעה אמיתית. בעתיד הדיווח יחובר למסך הנוכחות.",
      [{ text: "חזרה לבית", onPress: () => router.push("/parent/home") }],
    );
  }

  return (
    <View style={styles.root}>
      <AppScreen scrollable contentStyle={styles.screenContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity activeOpacity={0.75} onPress={() => router.push("/parent/home")}>
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>דיווח מהיר לגננת</Text>
          <View style={styles.headerSpacer} />
        </View>

        <AppCard style={styles.contextCard}>
          <Text style={styles.childName}>{child?.name ?? "ילד/ה"}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.contextText}>
            הדיווח עוזר לגננת לעדכן את הנוכחות, אבל תמיד אפשר גם להתקשר או לשלוח הודעה אישית.
          </Text>
        </AppCard>

        <Text style={styles.sectionTitle}>מה תרצו לעדכן?</Text>

        <View style={styles.optionsList}>
          {REPORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              activeOpacity={0.75}
              onPress={() => setSelectedReport(option)}
              style={[
                styles.optionCard,
                selectedReport === option ? styles.optionCardActive : undefined,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedReport === option ? styles.optionTextActive : undefined,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <AppCard style={styles.noteCard}>
          <AppTextInput
            label="הערה, לא חובה"
            value={note}
            onChangeText={setNote}
            placeholder="אפשר להוסיף שעה משוערת, סיבה או בקשה קצרה"
            multiline
          />
        </AppCard>

        <AppButton title="שליחת דיווח" onPress={handleSend} />
      </AppScreen>

      <BottomNavBar
        activeItem="absence"
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
    gap: Spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBackground,
    color: Colors.primary,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "center",
  },
  headerSpacer: {
    width: 38,
  },
  contextCard: {
    backgroundColor: Colors.secondary,
  },
  childName: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  dateText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 3,
    textAlign: "right",
  },
  contextText: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  optionsList: {
    gap: Spacing.sm,
  },
  optionCard: {
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.cardBackground,
  },
  optionCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  optionTextActive: {
    color: Colors.white,
  },
  noteCard: {
    gap: Spacing.sm,
  },
});
