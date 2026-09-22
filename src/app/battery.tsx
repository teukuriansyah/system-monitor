import { Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react"
import BatteryModule from "../../modules/battery/src/BatteryModule";
import BatteryIndicator from "../components/BatteryIndicator";

export default function Battery() {
  const [header, setHeader] = useState<any>()
  const [section, setSection] = useState<any>()

  const calculateBatteryTime = (socPercent:number, totalCapacityMah:number, currentDrawMa:number) => {
    if (socPercent < 0 || socPercent > 100 || totalCapacityMah <= 0) {
      return { status: 'INVALID_INPUT', hours: 0, minutes: 0, formatted: 'Data tidak valid' };
    }

    if (Math.abs(currentDrawMa) <= 5) {
      return { status: 'STANDBY', hours: 0, minutes: 0, formatted: 'Standby / Tidak Terdeteksi' };
    }

    if (currentDrawMa > 5) {
      const remainingMah = totalCapacityMah * (socPercent / 100);
      const totalMinutes = (remainingMah / currentDrawMa) * 60;

      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);

      return {
        status: 'DISCHARGING',
        totalMinutes: Math.round(totalMinutes),
        hours,
        minutes,
        formatted: `${hours} jam ${minutes} menit`,
      };
    }
    if (currentDrawMa < -5) {
      const missingMah = totalCapacityMah * ((100 - socPercent) / 100);
      const chargingCurrent = Math.abs(currentDrawMa);
      const totalMinutes = (missingMah / chargingCurrent) * 60;

      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);

      return {
        status: 'CHARGING',
        totalMinutes: Math.round(totalMinutes),
        hours,
        minutes,
        formatted: `${hours} jam ${minutes} menit sampai penuh`,
      };
    }
  };

  const headerFetching = () => {
    const temp = BatteryModule.getTemp()
    const soc = BatteryModule.getBatterySoc()
    const totalCapacity = BatteryModule.getTotalCapacityMah()
    const currentDraw = BatteryModule.getCurrentDrawMa()
    const socTime = calculateBatteryTime(soc,totalCapacity,currentDraw)
    const socTimeFormat = {
      hour:socTime?.hours,
      minute:socTime?.minutes
    }
    const avgDrainRate = calculateDrainRatePerHour(currentDraw,totalCapacity)
    setHeader({temp,socTime:socTimeFormat,avgDrainRate})
  }

  const calculateDrainRatePerHour = (currentDrawMa:number, totalCapacityMah:number) => {
    if (totalCapacityMah <= 0 || currentDrawMa <= 0) return 0;

    const percentPerHour = (currentDrawMa / totalCapacityMah) * 100;

    return Math.round(percentPerHour * 10) / 10;
  };

  const sectionFetching = () => {
    const totalCapacity = BatteryModule.getTotalCapacityMah()
    const currentDraw = (BatteryModule.getBatteryLevel()/100)*totalCapacity
    const batteryLevel = BatteryModule.getBatteryLevel()
    setSection({currentDraw,totalCapacity,batteryLevel})
  }

  useEffect(() => {
    headerFetching()
    sectionFetching()
  },[])
  return (
    <ScrollView className="bg-[#0b1326]">
      {/* Header */}
      <View className="px-5 py-2 flex flex-row gap-3 justify-between">
        <View className="rounded-lg p-3 gap-3 bg-[#141e35] w-full max-w-28">
          <Text numberOfLines={1} className="text-center text-gray-400 text-sm">Avg Disount</Text>
          <View className="flex flex-row gap-1 items-end"><Text className="text-xl font-bold text-[#f3f5f7] text-center">-{header?.avgDrainRate}%</Text><Text className="text-[9px] text-gray-400">/hour</Text></View>
        </View>
        <View className="rounded-lg p-3 gap-3 bg-[#141e35] w-full max-w-28">
          <Text numberOfLines={1} className=" text-center text-gray-400 text-sm">Temp peak</Text>
          <Text className="text-xl font-bold text-[#f3f5f7] text-center">{header?.temp}°C</Text>
        </View>
        <View className="rounded-lg p-3 gap-3 bg-[#141e35] w-full max-w-28">
          <Text numberOfLines={1} className="text-center text-gray-400 text-sm">On Battery Soc</Text>
          <Text className="text-xl font-bold text-[#f3f5f7] text-center">{header?.socTime.hour}H {header?.socTime.minute}M</Text>
        </View>
      </View>

      {/* Section */}
      <View className="px-5 py-2">
        <View className="rounded-lg p-3 gap-3 bg-[#141e35]">
          <View>
            <Text className="text-[#f3f5f7] font-bold text-xl">Battery Energy & Health Matrix</Text>
          </View>
          <View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-[#f3f5f7]">Pysical Cell Pack</Text>
              <Text className="text-green-400 font-bold">{section?.currentDraw} / {section?.totalCapacity} mAh</Text>
            </View>
            <View>
              <BatteryIndicator percentage={section?.batteryLevel}/>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

