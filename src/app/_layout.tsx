import { Stack, Tabs } from "expo-router";
import { Feather, Ionicons } from '@expo/vector-icons';
import "../../global.css"
import Navbar from "../components/Navbar"

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ header:() => <Navbar/>, tabBarIcon:(focused) => <Feather name="home" size={20} color={focused?"blue":"black"}/>}}/>
      <Tabs.Screen name="device" options={{ header:() => <Navbar/>}}/>
      <Tabs.Screen name="battery" options={{ header:() => <Navbar/>}}/>
      <Tabs.Screen name="settings" options={{ header:() => <Navbar/>}}/>
    </Tabs>
  );
}
