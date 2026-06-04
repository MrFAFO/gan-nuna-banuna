import { useRouter } from "expo-router";
import type { Href } from "expo-router";

import type { BottomNavItem } from "../components/BottomNavBar";

type BottomNavVariant = "parent" | "teacher";

const PARENT_ROUTES: Partial<Record<BottomNavItem, Href>> = {
  home: "/parent/home",
  daily: "/parent/daily-summary",
  absence: "/parent/absence-report",
  contracts: "/parent/contract-renewal",
};

const TEACHER_ROUTES: Partial<Record<BottomNavItem, Href>> = {
  home: "/teacher/home",
  daily: "/teacher/daily-report",
  attendance: "/teacher/attendance",
  children: "/teacher/children",
  contracts: "/teacher/contracts",
};

export function useBottomNavPress(variant: BottomNavVariant) {
  const router = useRouter();
  const routes = variant === "teacher" ? TEACHER_ROUTES : PARENT_ROUTES;

  return (item: BottomNavItem) => {
    const route = routes[item];

    if (route) {
      router.push(route);
    }
  };
}
