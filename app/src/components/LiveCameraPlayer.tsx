import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Video, ResizeMode } from "expo-av";

import { Colors } from "../theme/colors";
import { BorderRadius, Spacing } from "../theme/spacing";

interface LiveCameraPlayerProps {
  streamUrl: string | null;
  loading?: boolean;
  errorMessage?: string | null;
  onRefresh?: () => void;
}

export function LiveCameraPlayer({
  streamUrl,
  loading = false,
  errorMessage = null,
}: LiveCameraPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [playerError, setPlayerError] = useState<string | null>(null);

  useEffect(() => {
    setPlayerError(null);
  }, [streamUrl]);

  if (loading) {
    return (
      <View style={styles.placeholder}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.placeholderText}>מתחבר לשידור...</Text>
      </View>
    );
  }

  if (errorMessage || !streamUrl) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          {errorMessage ?? "השידור אינו זמין כרגע."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.playerWrap}>
      <Video
        ref={videoRef}
        source={{ uri: streamUrl }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping
        onError={() => setPlayerError("לא הצלחנו להפעיל את השידור.")}
      />
      {playerError ? <Text style={styles.errorOverlay}>{playerError}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  playerWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    backgroundColor: "#111",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  placeholderText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  errorOverlay: {
    position: "absolute",
    bottom: Spacing.sm,
    left: Spacing.sm,
    right: Spacing.sm,
    textAlign: "center",
    color: Colors.error,
    fontSize: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
});
