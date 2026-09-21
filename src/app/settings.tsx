import { Text, View } from "react-native";

export default function Battery() {
  return (
    <View>
      <View className="px-5 py-2">
        <View className="p-4 border rounded-xl">
          <View>
            <Text className="text-lg font-bold">Foreground Service</Text>
          </View>
          <View className="flex flex-row justify-between">
            <View className="w-52">
              <Text className="text-xl font-bold">Enable Background Monitoring</Text>
              <Text className="text-sm">Runs Foreground Service with persistent status notification</Text>
            </View>
            <View>
              <Text>Input</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

