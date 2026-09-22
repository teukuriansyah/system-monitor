import { Text, View, Pressable, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from "react"
import Battery from "../../modules/battery/src/BatteryModule";
import DeviceInfo from "../../modules/device/src/DeviceModule"
import DeviceSection from "@/components/DeviceSection";

export default function Device() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [buildSpecs, setBuildSpecs] = useState<string[]>([]) 
  const [osVersion, setOsVersion] = useState<string[]>([])
  const [display, setDisplay] = useState<any>(["100 x 100","500 dpi"])
  const [socAndDisplayRefreshRate,setSocAndDisplayRefreshRate] = useState<any>([])
  const allSpecs = ["buildSpecs","androidSpecs","displaySpecs"]

  const getBuildSpecs = () => {
    const board = DeviceInfo.getBoard()
    const brand = DeviceInfo.getBrand()
    const model = DeviceInfo.getModel()
    const manufacture = DeviceInfo.getManufacture()
    const product = DeviceInfo.getProduct()
    setBuildSpecs([manufacture,brand,model,board,product])
  }

  const getOsVersion = () => {
    const androidVersion = DeviceInfo.getOsVersion()
    const sdkVersion = DeviceInfo.getSdkVersion()
    setOsVersion([androidVersion,sdkVersion])
  }

  const getSocAndDisplayRefreshRate = () => {
    const soc = Battery.getBatterySoc()
    const refreshRate = Battery.getDisplayRefreshRate()
    setSocAndDisplayRefreshRate({soc,refreshRate})
  }

  useEffect(() => {
    getBuildSpecs()
    getOsVersion()
    getSocAndDisplayRefreshRate()
  },[])
  return (
    <ScrollView className="bg-[#0b1326]">
      {/* Header */}
      <View className="px-5 py-2">
        <View className="gap-2 p-5 rounded-lg bg-[#141e35]">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-1">
              <View><Feather name="smartphone" size={24} color="#004E5C" /></View>
              <View className="px-2">
                <View className="flex flex-row items-center gap-2">
                  <Text className="text-2xl font-bold text-[#f3f5f7]">{buildSpecs[1]}</Text>
                  <View className="bg-green-600 rounded-full px-3"><Text className="text-sm text-green-300 font-bold">VERIFIED</Text></View>
                </View>
                <Text className="text-sm text-gray-400">{buildSpecs[3]}</Text>
              </View>
            </View>
            <View>
              <Feather name="share-2" size={24} color="#004E5C" />
            </View>
          </View>
          <View className="px-3 flex flex-row items-center gap-4 justify-between">
            <View>
              <Text className="text-gray-400 text-sm text-center">ANDROID</Text>
              <Text className="font-bold text-2xl text-blue-600 text-center">{osVersion[0]}</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-sm text-center">SOC Setup</Text>
              <Text className="font-bold text-2xl text-green-600 text-center">{socAndDisplayRefreshRate?.soc}-Core</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-sm text-center">DISPLAY</Text>
              <Text className="font-bold text-2xl text-yellow-600">{socAndDisplayRefreshRate?.refreshRate}Hz</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Button */}
      <View className="py-5 px-5 overflow-hidden">
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex-row gap-5 items-center"
        >
          <Pressable className={`${selectedCategory == "all" ? "bg-[#4cd7f6]" : "border border-gray-400"} rounded-xl p-3`} onPress={() => setSelectedCategory("all")}><Text className={selectedCategory != "all" ? "text-gray-400" : ""}>All Specs</Text></Pressable>
          <Pressable className={`${selectedCategory == "hardware" ? "bg-[#4cd7f6]" : "border border-gray-400"} rounded-xl p-3`} onPress={() => setSelectedCategory("hardware")}><Text className={`${selectedCategory != "hardware" ? "text-gray-400" : ""}`}>Hardware</Text></Pressable>
          <Pressable className={`${selectedCategory == "android" ? "bg-[#4cd7f6]" : "border border-gray-400"} rounded-xl p-3`} onPress={() => setSelectedCategory("android")}><Text className={`${selectedCategory != "android" ? "text-gray-400" : ""}`}>Android OS</Text></Pressable>
          <Pressable className={`${selectedCategory == "display" ? "bg-[#4cd7f6]" : "border border-gray-400"} rounded-xl p-3`} onPress={() => setSelectedCategory("display")}><Text className={`${selectedCategory != "display" ? "text-gray-400" : ""}`}>Display Metrics</Text></Pressable>
        </ScrollView>
      </View>

      {/* Section */}
      <View className="px-5 gap-4 py-2">
        {(selectedCategory == "all") ? allSpecs.map((d,i) => <DeviceSection key={i} icon={d} specs={d} dataOsVersion={osVersion} dataBuildSpecs={buildSpecs} dataDisplay={display}/>) : ((selectedCategory == "android")) ? <DeviceSection icon="androidSpecs" specs="androidSpecs" dataOsVersion={osVersion}/> : ((selectedCategory == "hardware")) ? <DeviceSection icon="buildSpecs" specs="buildSpecs" dataBuildSpecs={buildSpecs}/> : <DeviceSection icon="displaySpecs" specs="displaySpecs" dataDisplay={display}/>}
      </View>
    </ScrollView>
  );
}

// 4cd7f6