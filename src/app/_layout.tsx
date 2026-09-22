import { Stack, Tabs } from "expo-router";
import { Feather, Ionicons } from '@expo/vector-icons';
import "../../global.css"
import Navbar from "../components/Navbar"

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarStyle: {backgroundColor:"#141e35", height:72, maxHeight:80, borderTopWidth:0, elevation:20}}}>
      <Tabs.Screen name="index" options={{ header:() => <Navbar/>, tabBarIcon:(focused) => <Feather name="home" size={20} color={focused?"blue":"black"}/>}}/>
      <Tabs.Screen name="device" options={{ header:() => <Navbar/>}}/>
      <Tabs.Screen name="battery" options={{ header:() => <Navbar/>}}/>
      <Tabs.Screen name="settings" options={{ header:() => <Navbar/>}}/>
    </Tabs>
  );
}
