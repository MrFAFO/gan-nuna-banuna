import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { AppButton } from "../../src/components/AppButton";
import { AppCard } from "../../src/components/AppCard";
import { AppScreen } from "../../src/components/AppScreen";
import { BottomNavBar } from "../../src/components/BottomNavBar";
import { StatusBadge } from "../../src/components/StatusBadge";
import { CLIENT_CONFIG } from "../../src/config/client.config";
import { mockChildren } from "../../src/data/mockChildren";
import { mockContracts } from "../../src/data/mockContracts";
import { mockParentChildId } from "../../src/data/mockParent";
import { useBottomNavPress } from "../../src/navigation/useBottomNavPress";
import { Colors } from "../../src/theme/colors";
import { BorderRadius, Spacing } from "../../src/theme/spacing";

export default function ParentContractRenewalScreen() {
  const router = useRouter();
  const handleBottomNavPress = useBottomNavPress("parent");
  const child = mockChildren.find((item) => item.id === mockParentChildId);
  const contract =
    mockContracts.find((item) => item.childId === mockParentChildId && item.status === "sent") ??
    mockContracts.find((item) => item.childId === mockParentChildId);

  function showPlaceholder(title: string, message: string) {
    Alert.alert(title, message);
  }

  return (
    <View style={styles.root}>
      <AppScreen scrollable contentStyle={styles.screenContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity activeOpacity={0.75} onPress={() => router.push("/parent/home")}>
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerTextBlock}>
            <Text style={styles.title}>חוזה הגן</Text>
            <Text style={styles.subtitle}>חידוש / חתימה על חוזה</Text>
          </View>
          <View style={styles.notificationDot} />
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>✎</Text>
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroTitle}>חתימה רגועה וברורה</Text>
            <Text style={styles.heroText}>
              אפשר לעיין בפרטי החוזה לפני מעבר לחתימה דיגיטלית.
            </Text>
          </View>
        </View>

        <AppCard style={styles.childCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{child?.name.slice(0, 1) ?? "י"}</Text>
          </View>
          <View style={styles.childInfo}>
            <Text style={styles.childName}>{child?.name ?? contract?.childName ?? "ילד/ה"}</Text>
            <Text style={styles.childSubtext}>{CLIENT_CONFIG.daycareName}</Text>
          </View>
        </AppCard>

        {contract ? (
          <>
            <AppCard style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <Text style={styles.sectionLabel}>סטטוס החוזה</Text>
                <StatusBadge status={contract.status} />
              </View>
              <Text style={styles.contractTitle}>חוזה לשנת {contract.activityYear}</Text>
              <Text style={styles.contractText}>
                בתוקף החל מ-{formatDate(contract.periodStart)} עד {formatDate(contract.periodEnd)}
              </Text>
            </AppCard>

            <AppCard style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>פרטי החוזה</Text>
              <DetailRow label="שנת פעילות" value={contract.activityYear ?? "לא צוין"} />
              <DetailRow
                label="תקופת החוזה"
                value={`${formatDate(contract.periodStart)} - ${formatDate(contract.periodEnd)}`}
              />
              <DetailRow label="ילד/ה" value={contract.childName} />
              <DetailRow
                label="מספר ימי פעילות בשבוע"
                value={`${contract.activityDaysPerWeek ?? 5} ימים`}
              />
            </AppCard>

            <AppCard style={styles.documentCard}>
              <Text style={styles.sectionTitle}>מסמך החוזה</Text>
              <Text style={styles.fileName}>{contract.fileName}</Text>
              <Text style={styles.fileSize}>{contract.fileSize ?? "PDF"}</Text>
              <AppButton
                title="צפייה במסמך"
                variant="outline"
                onPress={() =>
                  showPlaceholder("צפייה במסמך", "צפייה במסמך PDF תתווסף בהמשך.")
                }
                style={styles.cardButton}
              />
            </AppCard>

            <AppCard style={styles.signatureCard}>
              <Text style={styles.sectionTitle}>חתימה על החוזה</Text>
              <Text style={styles.cardText}>
                לאחר קריאת החוזה, ניתן לחתום עליו דיגיטלית דרך ספק חתימה חיצוני.
              </Text>
              <AppButton
                title="חתום על החוזה"
                onPress={() =>
                  showPlaceholder(
                    "חתימה דיגיטלית",
                    "החתימה הדיגיטלית תיפתח בעתיד דרך ספק חתימה חיצוני.",
                  )
                }
                style={styles.cardButton}
              />
            </AppCard>
          </>
        ) : (
          <AppCard style={styles.emptyCard}>
            <Text style={styles.sectionTitle}>אין חוזה להצגה</Text>
            <Text style={styles.cardText}>כרגע לא נמצא חוזה משויך לילד/ה.</Text>
          </AppCard>
        )}

        <AppCard style={styles.infoCard}>
          <Text style={styles.sectionTitle}>מידע נוסף</Text>
          <Text style={styles.cardText}>
            ניתן לפנות אל הגן בכל שאלה או הבהרה בנוגע לחוזה.
          </Text>
          <AppButton
            title="צור קשר עם הגן"
            variant="outline"
            onPress={() =>
              showPlaceholder("יצירת קשר", "אפשרויות יצירת קשר יתווספו בהמשך.")
            }
            style={styles.cardButton}
          />
        </AppCard>
      </AppScreen>

      <BottomNavBar
        activeItem="contracts"
        variant="parent"
        onItemPress={handleBottomNavPress}
      />
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailValue}>{value}</Text>
      <Text style={styles.detailLabel}>{label}</Text>
    </View>
  );
}

function formatDate(value: string | undefined) {
  if (!value) {
    return "לא צוין";
  }

  return new Date(value).toLocaleDateString("he-IL");
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
    fontSize: 24,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  notificationDot: {
    width: 14,
    height: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.warning,
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
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  heroText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: "right",
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
    fontSize: 20,
    fontWeight: "800",
    color: Colors.primary,
  },
  childInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  childName: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  childSubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statusCard: {
    gap: Spacing.sm,
  },
  statusHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "700",
  },
  contractTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  contractText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  detailsCard: {
    gap: Spacing.sm,
  },
  documentCard: {
    gap: Spacing.sm,
  },
  signatureCard: {
    gap: Spacing.sm,
  },
  infoCard: {
    gap: Spacing.sm,
  },
  emptyCard: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  detailRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: "700",
    textAlign: "left",
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  fileSize: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  cardText: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  cardButton: {
    marginTop: Spacing.xs,
  },
});
