import { Text, View } from "react-native";
import { Link } from "expo-router"

export default function Index() {
  return (
    <View>
      {/* Background Monitoring */}
      <View className="px-5 py-2">
        <View className="border rounded-lg p-3 gap-3">
          <View>
            <View></View>
            <View>
              <Text className="font-bold text-xl">Background Monitoring</Text>
              <Text className="text-sm text-gray-400">Foreground Service Engine</Text>
            </View>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-sm">Batt: </Text>
            <Text className="text-sm">Temp: </Text>
          </View>
        </View>
      </View>

      {/* Device Summary */}
      <View className="px-5 py-2">
        <View className="flex gap-3 rounded-lg border p-4">
          <View>
            <Text className="font-bold text-xl">Device Summary</Text>
          </View>
          <View className="flex flex-row justify-between">
            <View>
              <Text className="text-sm text-gray-400">Model & Hardware</Text>
              <Text className="font-bold">Model & Hardware</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-400">Model & Hardware</Text>
              <Text className="font-bold">Model & Hardware</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Battery Telemetry */}
      <View className="px-5 py-2">
        <View className="border rounded-lg p-4">
          <View>
            <Text className="font-bold text-xl">Battery Telemetry</Text>
          </View>
          <View className="flex flex-row justify-between">
            <View>
              <Text>Temp</Text>
              <Text>31°C</Text>
            </View>
            <View>
              <Text>Temp</Text>
              <Text>31°C</Text>
            </View>
            <View>
              <Text>Temp</Text>
              <Text>31°C</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

