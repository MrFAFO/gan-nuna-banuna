import React from "react";
import { Text } from "react-native";
import { AppScreen } from "../../src/components/AppScreen";
import { BottomNavBar } from "../../src/components/BottomNavBar";

export default function TeacherHomeScreen() {
  return (
    <>
      <AppScreen scrollable>
        <Text>Teacher Home</Text>
      </AppScreen>
      <BottomNavBar activeItem="home" />
    </>
  );
}
