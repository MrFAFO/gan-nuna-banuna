import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import { useAuth } from "../../src/auth/AuthContext";

export default function PlatformLayout() {
  const { profile, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initializing) {
      return;
    }
    if (profile && profile.role !== "platform_admin") {
      router.replace("/");
    }
  }, [profile, initializing, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
