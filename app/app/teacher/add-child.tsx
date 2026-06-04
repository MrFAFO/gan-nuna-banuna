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

type Gender = "male" | "female";

const RELATIONSHIP_OPTIONS = ["אמא", "אבא", "סבתא", "סבא", "אפוטרופוס", "אחר"];

export default function AddChildScreen() {
  const router = useRouter();
  const handleBottomNavPress = useBottomNavPress("teacher");
  const [childName, setChildName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [relationshipType, setRelationshipType] = useState("אמא");
  const [parentFullName, setParentFullName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleCancel() {
    router.push("/teacher/children");
  }

  function handleSave() {
    if (!childName.trim()) {
      setErrorMessage("יש להזין את שם הילד");
      return;
    }

    if (!birthDate.trim()) {
      setErrorMessage("יש לבחור תאריך לידה");
      return;
    }

    if (!relationshipType.trim()) {
      setErrorMessage("יש לבחור סוג קשר");
      return;
    }

    if (!parentFullName.trim()) {
      setErrorMessage("יש להזין שם הורה / אפוטרופוס");
      return;
    }

    if (!parentPhone.trim()) {
      setErrorMessage("יש להזין מספר טלפון");
      return;
    }

    setErrorMessage("");
    Alert.alert("הילד נוסף בהצלחה", "בשלב הדמו הפרטים לא נשמרים בבסיס נתונים.", [
      {
        text: "חזרה לרשימה",
        onPress: () => router.push("/teacher/children"),
      },
    ]);
  }

  return (
    <View style={styles.root}>
      <AppScreen scrollable contentStyle={styles.screenContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity activeOpacity={0.75} onPress={handleCancel}>
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>הוספת ילד</Text>
          <View style={styles.notificationDot} />
        </View>

        <AppCard style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>מידע רגיש</Text>
          <Text style={styles.noticeText}>
            כל המידע יישמר בצורה מאובטחת וישמש לצרכי ניהול ותיעוד בגן.
          </Text>
        </AppCard>

        <AppCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>פרטי הילד</Text>

          <TouchableOpacity activeOpacity={0.75} style={styles.photoPlaceholder}>
            <Text style={styles.photoIcon}>+</Text>
            <Text style={styles.photoText}>הוספת תמונה</Text>
            <Text style={styles.photoSubtext}>אופציונלי</Text>
          </TouchableOpacity>

          <AppTextInput
            label="שם הילד *"
            value={childName}
            onChangeText={setChildName}
            placeholder="הזן שם הילד"
          />

          <AppTextInput
            label="תאריך לידה *"
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="בחר תאריך"
          />

          <Text style={styles.fieldLabel}>מין</Text>
          <View style={styles.optionRow}>
            <OptionChip
              label="זכר"
              active={gender === "male"}
              onPress={() => setGender("male")}
            />
            <OptionChip
              label="נקבה"
              active={gender === "female"}
              onPress={() => setGender("female")}
            />
          </View>
        </AppCard>

        <AppCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>פרטי הורה / אפוטרופוס</Text>

          <Text style={styles.fieldLabel}>סוג קשר *</Text>
          <View style={styles.relationshipGrid}>
            {RELATIONSHIP_OPTIONS.map((option) => (
              <OptionChip
                key={option}
                label={option}
                active={relationshipType === option}
                onPress={() => setRelationshipType(option)}
              />
            ))}
          </View>

          <AppTextInput
            label="שם מלא *"
            value={parentFullName}
            onChangeText={setParentFullName}
            placeholder="הזן שם מלא"
          />

          <AppTextInput
            label="טלפון *"
            value={parentPhone}
            onChangeText={setParentPhone}
            placeholder="הזן מספר טלפון"
            keyboardType="phone-pad"
          />

          <AppTextInput
            label="אימייל"
            value={parentEmail}
            onChangeText={setParentEmail}
            placeholder="הזן כתובת אימייל"
            keyboardType="email-address"
          />
        </AppCard>

        <AppCard style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>מידע נוסף</Text>
            <Text style={styles.counterText}>{notes.length}/300</Text>
          </View>

          <AppTextInput
            label="הערות חשובות"
            value={notes}
            onChangeText={(value) => setNotes(value.slice(0, 300))}
            placeholder="לדוגמה: רגישויות, אלרגיות, מידע רפואי חשוב וכו'"
            multiline
          />
        </AppCard>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <View style={styles.actions}>
          <AppButton title="שמירה" onPress={handleSave} />
          <AppButton title="ביטול" onPress={handleCancel} variant="outline" />
        </View>
      </AppScreen>

      <BottomNavBar
        activeItem="children"
        variant="teacher"
        onItemPress={handleBottomNavPress}
      />
    </View>
  );
}

function OptionChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.optionChip, active ? styles.optionChipActive : undefined]}
    >
      <Text style={[styles.optionText, active ? styles.optionTextActive : undefined]}>
        {label}
      </Text>
    </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "center",
  },
  notificationDot: {
    width: 14,
    height: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
  },
  noticeCard: {
    backgroundColor: Colors.secondary,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  noticeText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: "right",
  },
  sectionCard: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  sectionHeaderRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counterText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  photoPlaceholder: {
    alignSelf: "center",
    width: 116,
    height: 116,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  photoIcon: {
    fontSize: 28,
    color: Colors.primary,
    fontWeight: "800",
  },
  photoText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: "700",
    marginTop: 4,
  },
  photoSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  optionRow: {
    flexDirection: "row-reverse",
    gap: Spacing.sm,
  },
  relationshipGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  optionChip: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.background,
  },
  optionChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  optionTextActive: {
    color: Colors.white,
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
