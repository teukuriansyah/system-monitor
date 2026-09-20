import { Stack } from "expo-router";
import "../../global.css"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="device" />
      <Stack.Screen name="battery" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
