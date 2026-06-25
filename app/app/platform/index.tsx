import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../src/components/AppButton";
import { AppCard } from "../../src/components/AppCard";
import { AppScreen } from "../../src/components/AppScreen";
import { useAuth } from "../../src/auth/AuthContext";
import { supabase } from "../../src/lib/supabase";
import { Colors } from "../../src/theme/colors";
import { Spacing } from "../../src/theme/spacing";

type DaycareRow = {
  id: string;
  name: string;
  client_id: string;
};

export default function PlatformScreen() {
  const { profile, signOut } = useAuth();
  const [daycares, setDaycares] = useState<DaycareRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    void supabase
      .from("daycares")
      .select("id, name, client_id")
      .order("name")
      .then(({ data, error }) => {
        if (!error && data) {
          setDaycares(data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <AppScreen scrollable contentStyle={styles.content}>
      <Text style={styles.pageTitle}>ניהול פלטפורמה</Text>
      <View style={styles.body}>
        <AppCard style={styles.card}>
          <Text style={styles.greeting}>שלום, {profile?.fullName ?? ""}</Text>
          <Text style={styles.subtitle}>
            מסך זה מיועד למנהלי הפלטפורמה. פתיחת גן חדש מהאפליקציה תתווסף בהמשך.
          </Text>
          <Text style={styles.hint}>
            בינתיים ניתן לפתוח גן חדש עם curl ו-provision-daycare (ראו docs/12-supabase-setup.md).
          </Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>גנים במערכת</Text>
          {loading ? (
            <ActivityIndicator color={Colors.primary} />
          ) : daycares.length === 0 ? (
            <Text style={styles.emptyText}>אין גנים רשומים.</Text>
          ) : (
            daycares.map((daycare) => (
              <View key={daycare.id} style={styles.daycareRow}>
                <Text style={styles.daycareName}>{daycare.name}</Text>
                <Text style={styles.daycareClientId}>{daycare.client_id}</Text>
              </View>
            ))
          )}
        </AppCard>

        <AppButton title="התנתקות" onPress={() => void signOut()} variant="outline" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  body: {
    gap: Spacing.md,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
    marginBottom: Spacing.sm,
  },
  card: {
    gap: Spacing.sm,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  hint: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: "right",
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "right",
    marginBottom: Spacing.xs,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "right",
  },
  daycareRow: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  daycareName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    textAlign: "right",
  },
  daycareClientId: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "right",
    marginTop: 2,
  },
});
