import { Text, View, ScrollView } from "react-native";
import ToggleButton from "../components/ToggleButton"

export default function Battery() {
  return (
    <ScrollView className="bg-[#0b1326]">
      <View className="px-5 py-2">
        <View className="p-4 rounded-xl bg-[#141e35] rounded-lg">
          <View>
            <Text className="text-lg font-bold text-[#f3f5f7]">Foreground Service</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <View className="w-52">
              <Text className="text-xl font-bold text-[#f3f5f7]">Enable Background Monitoring</Text>
              <Text className="text-sm text-gray-400">Runs Foreground Service with persistent status notification</Text>
            </View>
            <View>
              <ToggleButton />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

