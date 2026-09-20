import { Text, View } from "react-native";

export default function Index() {
  const buildSpecs =[["Manufacture","Brand","Model","Board","Product"],["Manufacture","Brand","Model","Board"]]
  const androidSpecs =[["Android Version"],["14"]]
  const allSpecs = ["buildSpecs","androidSpecs"]
  return (
    <View>
      {/* Navbar */}
      <View>
      </View>

      {/* Header */}
      <View>
        <View>
          <View>{/*logo hp*/}</View>
          <View>
            <View className="flex flex-row items-center gap-2">
              <Text className="text-2xl font-bold">Merk Hp</Text>
              <View className="bg-green-600 rounded-full px-3"><Text className="text-sm text-green-300 font-bold">VERIFIED</Text></View>
            </View>
            <Text className="text-sm text-gray-400">Board hp</Text>
          </View>
          <View>{/*logo share*/}</View>
        </View>
        <View className="flex flex-row items-center gap-4">
          <View>
            <Text className="text-gray-400 text-sm">ANDROID</Text>
            <Text className="font-bold text-2xl text-blue-600">14</Text>
          </View>
          <View>
            <Text className="text-gray-400 text-sm">SOC Setup</Text>
            <Text className="font-bold text-2xl text-green-600">9-Core</Text>
          </View>
          <View>
            <Text className="text-gray-400 text-sm">DISPLAY</Text>
            <Text className="font-bold text-2xl text-yellow-600">120Hz</Text>
          </View>
        </View>
      </View>

      {/* Section */}
      <View>
        {allSpecs.map((d,i) => <View>
          <View className="flex flex-row gap-2">
            <View>{/*logo android*/}</View>
            <View><Text className="text-xl font-bold">{d}</Text></View>
          </View>
          <View className="flex flex-row justify-between">
            <View>
              {androidSpecs[0].map((d,i) => <Text>{d}</Text>)}
            </View>
            <View >
              {androidSpecs[1].map((d,i) => <Text>{d}</Text>)}
            </View>
          </View>
        </View>)}
      </View>
    </View>
  );
}

