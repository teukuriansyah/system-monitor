import { Text, View, Pressable, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from "react"
import DeviceInfo from "../../modules/device/src/DeviceModule"
import DeviceSection from "@/components/DeviceSection";

export default function Device() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [buildSpecs, setBuildSpecs] = useState<string[]>([]) 
  const [osVersion, setOsVersion] = useState<string[]>([])
  const [display, setDisplay] = useState<any>(["100 x 100","500 dpi"])
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

  useEffect(() => {
    getBuildSpecs()
    getOsVersion()
  },[])
  return (
    <View>
      {/* Header */}
      <View className="px-5 py-2">
        <View className="gap-2 p-5 border rounded-lg">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-1">
              <View><Feather name="smartphone" size={24} color="#004E5C" /></View>
              <View className="px-2">
                <View className="flex flex-row items-center gap-2">
                  <Text className="text-2xl font-bold">Merk Hp</Text>
                  <View className="bg-green-600 rounded-full px-3"><Text className="text-sm text-green-300 font-bold">VERIFIED</Text></View>
                </View>
                <Text className="text-sm text-gray-400">Board hp</Text>
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
              <Text className="font-bold text-2xl text-green-600 text-center">9-Core</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-sm text-center">DISPLAY</Text>
              <Text className="font-bold text-2xl text-yellow-600">120Hz</Text>
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
          <Pressable className="border rounded-xl p-3" onPress={() => setSelectedCategory("all")}><Text>All Specs</Text></Pressable>
          <Pressable className="border rounded-xl p-3" onPress={() => setSelectedCategory("hardware")}><Text>Hardware</Text></Pressable>
          <Pressable className="border rounded-xl p-3" onPress={() => setSelectedCategory("android")}><Text>Android OS</Text></Pressable>
          <Pressable className="border rounded-xl p-3" onPress={() => setSelectedCategory("display")}><Text>Display Metrics</Text></Pressable>
        </ScrollView>
      </View>

      {/* Section */}
      <View className="px-5 gap-4 py-2">
        {(selectedCategory == "all") ? allSpecs.map((d,i) => <DeviceSection key={i} icon={d} specs={d} dataOsVersion={osVersion} dataBuildSpecs={buildSpecs} dataDisplay={display}/>) : ((selectedCategory == "android")) ? <DeviceSection icon="androidSpecs" specs="androidSpecs" dataOsVersion={osVersion}/> : ((selectedCategory == "hardware")) ? <DeviceSection icon="buildSpecs" specs="buildSpecs" dataBuildSpecs={buildSpecs}/> : <DeviceSection icon="displaySpecs" specs="displaySpecs" dataDisplay={display}/>}
      </View>
    </View>
  );
}

