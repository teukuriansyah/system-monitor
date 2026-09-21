import { Text, View } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';

const DeviceSection = (props:any) => {
  const buildSpecs =[["Manufacture","Brand","Model","Board","Product"],props.dataBuildSpecs]
  const androidSpecs =[["Android Version", "SDK / API Level"],props.dataOsVersion]
  const displaySpecs = [["Resolution", "Density"],props.dataDisplay]

  return (
    <View className="p-4 rounded-lg bg-[#141e35]">
      <View className="flex flex-row gap-2 items-center">
        <View>
          {props.icon == "buildSpecs" ? (
            <Ionicons name="hardware-chip-outline" size={24} color="#f3f5f7"/>
          ) : props.icon == "androidSpecs" ? (
            <Ionicons name="logo-android" size={24} color="#f3f5f7"/>
          ) : (
            <Feather name="monitor" size={24} color="#f3f5f7"/>
          )}
        </View>
        <View>
          <Text className="text-xl font-bold text-[#f3f5f7]">
            {props.specs == "buildSpecs"
              ? "Hardware Spesification"
              : props.specs == "androidSpecs"
                ? "Android OS"
                : "Display Metrics"}
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-between mt-2">
        <View>
          {props.specs == "androidSpecs"
            ? androidSpecs[0].map((d:any, i:any) => <Text className="text-gray-400" key={i}>{d}</Text>)
            : props.specs == "buildSpecs"
              ? buildSpecs[0].map((d:any, i:any) => <Text className="text-gray-400" key={i}>{d}</Text>)
              : displaySpecs[0].map((d:any, i:any) => <Text key={i} className="text-gray-400">{d}</Text>)}
        </View>
        <View>
          {props.specs == "androidSpecs"
            ? androidSpecs[1]?.map((d:any, i:any) => <Text className="text-[#f3f5f7]" key={i}>{d}</Text>)
            : props.specs == "buildSpecs"
              ? buildSpecs[1]?.map((d:any, i:any) => <Text key={i} className="text-[#f3f5f7]">{d}</Text>)
              : displaySpecs[1]?.map((d:any, i:any) => <Text key={i} className="text-[#f3f5f7]">{d}</Text>)}
        </View>
      </View>
    </View>
  );
};

export default DeviceSection;
