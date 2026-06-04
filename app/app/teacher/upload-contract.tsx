import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { AppButton } from "../../src/components/AppButton";
import { AppCard } from "../../src/components/AppCard";
import { AppScreen } from "../../src/components/AppScreen";
import { AppTextInput } from "../../src/components/AppTextInput";
import { BottomNavBar } from "../../src/components/BottomNavBar";
import { useBottomNavPress } from "../../src/navigation/useBottomNavPress";
import { Colors } from "../../src/theme/colors";
import { BorderRadius, Spacing } from "../../src/theme/spacing";

const CONTRACT_TYPES = ["חוזה הרשמה", "חידוש חוזה", "אישור מיוחד", "נספח לחוזה"];
const STEPS = ["פרטי חוזה", "בחירת הורה", "תצוגה מקדימה", "שליחה"];

export default function UploadContractScreen() {
  const router = useRouter();
  const handleBottomNavPress = useBottomNavPress("teacher");
  const [contractName, setContractName] = useState("");
  const [contractType, setContractType] = useState(CONTRACT_TYPES[0]);
  const [contractDate, setContractDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleCancel() {
    router.push("/teacher/contracts");
  }

  function handleChooseFile() {
    setFileName("contract-demo.pdf");
    Alert.alert("קובץ דמו צורף", "בחירת קובץ אמיתית תתווסף בהמשך.");
  }

  function handleContinue() {
    if (!contractName.trim()) {
      setErrorMessage("יש להזין שם חוזה");
      return;
    }

    if (!contractType.trim()) {
      setErrorMessage("יש לבחור סוג חוזה");
      return;
    }

    if (!contractDate.trim()) {
      setErrorMessage("יש לבחור תאריך חוזה");
      return;
    }

    if (!fileName.trim()) {
      setErrorMessage("יש לצרף קובץ PDF");
      return;
    }

    setErrorMessage("");
    Alert.alert("השלב הבא: בחירת הורה", "בשלב הדמו המשך התהליך יוצג בהמשך.");
  }

  return (
    <View style={styles.root}>
      <AppScreen scrollable contentStyle={styles.screenContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity activeOpacity={0.75} onPress={handleCancel}>
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerTextBlock}>
            <Text style={styles.title}>העלאת חוזה חדש</Text>
            <Text style={styles.subtitle}>העלאת חוזה ושליחה להורה לחתימה</Text>
          </View>
          <View style={styles.notificationDot} />
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>□</Text>
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroTitle}>תהליך מסודר ובטוח</Text>
            <Text style={styles.heroText}>
              בשלב הראשון ממלאים פרטים ומצרפים PDF דמה בלבד.
            </Text>
          </View>
        </View>

        <AppCard style={styles.stepperCard}>
          {STEPS.map((step, index) => {
            const isActive = index === 0;

            return (
              <View key={step} style={styles.stepItem}>
                <View style={[styles.stepNumber, isActive && styles.stepNumberActive]}>
                  <Text style={[styles.stepNumberText, isActive && styles.stepNumberTextActive]}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>{step}</Text>
              </View>
            );
          })}
        </AppCard>

        <AppCard style={styles.formCard}>
          <Text style={styles.sectionTitle}>פרטי חוזה</Text>

          <AppTextInput
            label="שם החוזה *"
            value={contractName}
            onChangeText={setContractName}
            placeholder="לדוגמה: חוזה הרשמה לשנת 2025-2026"
          />

          <Text style={styles.fieldLabel}>סוג החוזה *</Text>
          <View style={styles.typeGrid}>
            {CONTRACT_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                activeOpacity={0.75}
                onPress={() => setContractType(type)}
                style={[styles.typeChip, contractType === type && styles.typeChipActive]}
              >
                <Text
                  style={[
                    styles.typeChipText,
                    contractType === type && styles.typeChipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <AppTextInput
            label="תאריך החוזה *"
            value={contractDate}
            onChangeText={setContractDate}
            placeholder="בחר תאריך"
          />

          <AppTextInput
            label="תאריך תפוגה (אופציונלי)"
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="בחר תאריך תפוגה"
          />

          <AppTextInput
            label="הערות (אופציונלי)"
            value={notes}
            onChangeText={setNotes}
            placeholder="הוסף הערות או מידע נוסף הקשור לחוזה..."
            multiline
          />
        </AppCard>

        <AppCard style={styles.formCard}>
          <Text style={styles.sectionTitle}>קובץ החוזה</Text>

          <TouchableOpacity activeOpacity={0.75} onPress={handleChooseFile} style={styles.uploadBox}>
            <Text style={styles.uploadIcon}>+</Text>
            <Text style={styles.uploadTitle}>
              {fileName ? fileName : "גרור קובץ לכאן או לחץ לבחירה"}
            </Text>
            <Text style={styles.uploadText}>PDF בלבד, עד 10MB</Text>
          </TouchableOpacity>

          <View style={styles.securityNotice}>
            <Text style={styles.securityText}>
              הקובץ יישמר בצורה מאובטחת. ההורה יוכל לצפות ולחתום דיגיטלית.
            </Text>
          </View>
        </AppCard>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <View style={styles.actions}>
          <AppButton title="המשך" onPress={handleContinue} />
          <AppButton title="ביטול" onPress={handleCancel} variant="outline" />
        </View>
      </AppScreen>

      <BottomNavBar
        activeItem="contracts"
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
  headerTextBlock: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: "center",
  },
  notificationDot: {
    width: 14,
    height: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
  },
  heroCard: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.secondary,
  },
  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBackground,
    color: Colors.primary,
    fontSize: 30,
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
  stepperCard: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  stepItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  stepNumberActive: {
    backgroundColor: Colors.primary,
  },
  stepNumberText: {
    color: Colors.textSecondary,
    fontWeight: "800",
  },
  stepNumberTextActive: {
    color: Colors.white,
  },
  stepLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  stepLabelActive: {
    color: Colors.primary,
    fontWeight: "800",
  },
  formCard: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  typeGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  typeChip: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
  },
  typeChipActive: {
    backgroundColor: Colors.primary,
  },
  typeChipText: {
    color: Colors.textPrimary,
    fontWeight: "700",
  },
  typeChipTextActive: {
    color: Colors.white,
  },
  uploadBox: {
    minHeight: 132,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
  uploadIcon: {
    fontSize: 30,
    color: Colors.primary,
    fontWeight: "800",
  },
  uploadTitle: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: "800",
    marginTop: Spacing.xs,
    textAlign: "center",
  },
  uploadText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 3,
    textAlign: "center",
  },
  securityNotice: {
    backgroundColor: Colors.presentBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  securityText: {
    color: Colors.presentText,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "right",
    fontWeight: "700",
  },
  errorText: {
    color: Colors.error,
    fontWeight: "700",
    textAlign: "right",
  },
  actions: {
    gap: Spacing.sm,
  },
});
