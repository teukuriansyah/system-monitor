import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View } from "react-native";
import "../../global.css";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true, tabBarActiveTintColor: "#38bdf8", tabBarInactiveTintColor: "#94a3b8", tabBarLabelStyle: { fontSize: 12, fontWeight: '500', marginBottom: 6 }, tabBarStyle: { backgroundColor: "#141e35", height: 72, borderTopWidth: 0, elevation: 20 }}}>
      <Tabs.Screen name="index" options={{ title: "Dashboard", header: () => <Navbar />, tabBarIcon: ({ focused, color }) => <View className={`w-14 h-8 rounded-full items-center justify-center ${focused ? 'bg-slate-800' : 'bg-transparent'}`}><Ionicons name="speedometer-outline" size={20} color={color} /></View> }} />
      <Tabs.Screen name="battery" options={{ title: "Battery", header: () => <Navbar />, tabBarIcon: ({ focused, color }) => <View className={`w-14 h-8 rounded-full items-center justify-center ${focused ? 'bg-slate-800' : 'bg-transparent'}`}><MaterialIcons name="battery-charging-full" size={20} color={color} /></View> }} />
      <Tabs.Screen name="device" options={{ title: "Device", header: () => <Navbar />, tabBarIcon: ({ focused, color }) => <View className={`w-14 h-8 rounded-full items-center justify-center ${focused ? 'bg-slate-800' : 'bg-transparent'}`}><Ionicons name="hardware-chip-outline" size={20} color={color} /></View> }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", header: () => <Navbar />, tabBarIcon: ({ focused, color }) => <View className={`w-14 h-8 rounded-full items-center justify-center ${focused ? 'bg-slate-800' : 'bg-transparent'}`}><Ionicons name="options-outline" size={20} color={color} /></View> }} />
    </Tabs>
  );
}
