import { Stack } from "expo-router";
import "../../global.css"
import Navbar from "../components/Navbar"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header:() => <Navbar/>,}}/>
      <Stack.Screen name="device" options={{ header:() => <Navbar/>}}/>
      <Stack.Screen name="battery" options={{ header:() => <Navbar/>}}/>
      <Stack.Screen name="settings" options={{ header:() => <Navbar/>}}/>
    </Stack>
  );
}
