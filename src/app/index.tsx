import { Text, View, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { Host, CircularProgressIndicator } from '@expo/ui/jetpack-compose';
import DeviceInfo from "../../modules/device/src/DeviceModule"
import AdaptiveBatteryCircle from "@/components/AdaptiveCircleBattery";
import Battery from "../../modules/battery/src/BatteryModule"

export default function Index() {
  const [deviceSummary,setDeviceSummary] = useState<any>()
  const [backgroundMonitor,setBackgroundMonitor] = useState<any>()

  const getDeviceSummary = () => {
    const model = DeviceInfo.getModel()
    const osVersion = DeviceInfo.getOsVersion()
    setDeviceSummary({model,osVersion})
  }

  const getBackgroundMonitoring = () => {
    const batteryLevel = Battery.getBatteryLevel()
    const temp = Battery.getTemp()
    const batteryType = Battery.getBatteryType()
    const voltage = Battery.getVoltage()
    setBackgroundMonitor({batteryLevel, temp, batteryType, voltage})
  }

  useEffect(() => {
    getDeviceSummary()
    getBackgroundMonitoring()
  },[])
  return (
    <ScrollView className="bg-[#0b1326]">
      {/* Background Monitoring */}
      <View className="px-5 py-2">
        <View className="rounded-lg p-3 gap-3 bg-[#141e35]">
          <View>
            <View></View>
            <View>
              <Text className="font-bold text-xl text-[#f3f5f7]">Background Monitoring</Text>
              <Text className="text-sm text-gray-400">Foreground Service Engine</Text>
            </View>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-sm text-gray-400">Batt: {backgroundMonitor?.batteryLevel}</Text>
            <Text className="text-sm text-gray-400">Temp: {backgroundMonitor?.temp}°C</Text>
          </View>
        </View>
      </View>

      {/* Device Summary */}
      <View className="px-5 py-2">
        <View className="flex gap-3 rounded-lg bg-[#141e35] p-4">
          <View>
            <Text className="font-bold text-xl text-[#f3f5f7]">Device Summary</Text>
          </View>
          <View className="flex flex-row justify-between">
            <View>
              <Text className="text-sm text-gray-400 ">Model & Hardware</Text>
              <Text className="font-bold text-[#f3f5f7]">{deviceSummary?.model}</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-400">Android Runtime</Text>
              <Text className="font-bold text-[#f3f5f7]">Android {deviceSummary?.osVersion}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Battery Telemetry */}
      <View className="px-5 py-2">
        <View className="bg-[#141e35] rounded-lg p-4">
          <View>
            <Text className="font-bold text-xl text-[#f3f5f7]">Battery Telemetry</Text>
          </View>
          <View className="flex flex-row justify-center p-10">
            <AdaptiveBatteryCircle batteryLevel={backgroundMonitor?.batteryLevel ?? 0} />
          </View>
          <View className="flex flex-row justify-between">
            <View>
              <Text className="text-sm text-center text-gray-400">Temp</Text>
              <Text className="text-lg font-bold text-center text-[#f3f5f7]">{backgroundMonitor?.temp}°C</Text>
            </View>
            <View>
              <Text className="text-sm text-center text-gray-400">Voltage</Text>
              <Text className="text-lg font-bold text-center text-[#f3f5f7]">{parseInt(backgroundMonitor?.voltage)}V</Text>
            </View>
            <View>
              <Text className="text-sm text-center text-gray-400">Battery Type</Text>
              <Text className="text-lg font-bold text-center text-[#f3f5f7]">{backgroundMonitor?.batteryType}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

