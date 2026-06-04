import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { AppButton } from "../../src/components/AppButton";
import { AppCard } from "../../src/components/AppCard";
import { AppScreen } from "../../src/components/AppScreen";
import { AppTextInput } from "../../src/components/AppTextInput";
import { BottomNavBar } from "../../src/components/BottomNavBar";
import { StatusBadge } from "../../src/components/StatusBadge";
import { mockContracts } from "../../src/data/mockContracts";
import { useBottomNavPress } from "../../src/navigation/useBottomNavPress";
import { Colors } from "../../src/theme/colors";
import { BorderRadius, Spacing } from "../../src/theme/spacing";
import type { ContractStatus } from "../../src/types/contract";

export default function TeacherContractsScreen() {
  const router = useRouter();
  const handleBottomNavPress = useBottomNavPress("teacher");
  const [searchText, setSearchText] = useState("");

  const filteredContracts = useMemo(() => {
    const query = searchText.trim();

    if (!query) {
      return mockContracts;
    }

    return mockContracts.filter((contract) =>
      [contract.childName, contract.parentName, contract.fileName].some((value) =>
        value.includes(query),
      ),
    );
  }, [searchText]);

  const sentCount = mockContracts.filter((contract) => contract.status === "sent").length;
  const signedCount = mockContracts.filter((contract) => contract.status === "signed").length;
  const needsCareCount = mockContracts.filter((contract) =>
    ["expired", "declined", "error"].includes(contract.status),
  ).length;

  return (
    <View style={styles.root}>
      <AppScreen scrollable contentStyle={styles.screenContent}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.iconButton}>☰</Text>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{sentCount}</Text>
            </View>
          </View>

          <Text style={styles.title}>חוזים</Text>
          <Text style={styles.subtitle}>ניהול חוזים וחתימות להורים</Text>

          <View style={styles.heroCard}>
            <Text style={styles.heroIcon}>□</Text>
            <View style={styles.heroTextBlock}>
              <Text style={styles.heroTitle}>מסמכים מסודרים במקום אחד</Text>
              <Text style={styles.heroText}>
                מעקב אחרי חוזים שנשלחו, נחתמו או דורשים טיפול.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryGrid}>
          <SummaryCard label="סה״כ חוזים" value={mockContracts.length} />
          <SummaryCard label="ממתינים לחתימה" value={sentCount} />
          <SummaryCard label="נחתמו" value={signedCount} />
          <SummaryCard label="דורשים טיפול" value={needsCareCount} />
        </View>

        <AppButton
          title="העלאת חוזה חדש"
          onPress={() => router.push("/teacher/upload-contract")}
          style={styles.uploadButton}
        />

        <View style={styles.searchRow}>
          <AppTextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="חיפוש חוזה, שם ילד או הורה..."
            style={styles.searchInput}
          />

          <TouchableOpacity activeOpacity={0.75} style={styles.filterButton}>
            <Text style={styles.filterText}>סינון</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>רשימת חוזים</Text>
          <Text style={styles.sectionMeta}>{filteredContracts.length} מוצגים</Text>
        </View>

        {filteredContracts.length === 0 ? (
          <AppCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>לא נמצאו חוזים</Text>
            <Text style={styles.emptyText}>נסו לחפש שם אחר או לנקות את החיפוש.</Text>
          </AppCard>
        ) : (
          filteredContracts.map((contract) => (
            <AppCard key={contract.id} style={styles.contractCard}>
              <View style={styles.contractHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{contract.childName.slice(0, 1)}</Text>
                </View>

                <View style={styles.contractInfo}>
                  <Text style={styles.childName}>{contract.childName}</Text>
                  <Text style={styles.childAge}>{contract.childAge}</Text>
                </View>

                <StatusBadge status={contract.status as ContractStatus} />
              </View>

              <View style={styles.contractMeta}>
                <Text style={styles.metaText}>הורה: {contract.parentName}</Text>
                <Text style={styles.metaText}>קובץ: {contract.fileName}</Text>
                <Text style={styles.metaText}>
                  נשלח: {new Date(contract.sentAt).toLocaleDateString("he-IL")}
                </Text>
                {contract.expiryDate ? (
                  <Text style={styles.metaText}>
                    תוקף: {new Date(contract.expiryDate).toLocaleDateString("he-IL")}
                  </Text>
                ) : null}
              </View>
            </AppCard>
          ))
        )}
      </AppScreen>

      <BottomNavBar
        activeItem="contracts"
        variant="teacher"
        onItemPress={handleBottomNavPress}
      />
    </View>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <AppCard style={styles.summaryCard}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </AppCard>
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
    backgroundColor: Colors.lateBackground,
  },
  notificationText: {
    color: Colors.lateText,
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
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  uploadButton: {
    marginTop: Spacing.lg,
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
  listHeader: {
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
  },
  sectionMeta: {
    fontSize: 13,
    color: Colors.textSecondary,
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
  contractCard: {
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  contractHeader: {
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
  contractInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  childName: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  childAge: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  contractMeta: {
    gap: 4,
    alignItems: "flex-end",
  },
  metaText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "right",
  },
});
