import { View, Text, Image } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Navbar() {
  return(
    <SafeAreaView className="px-7 flex flex-row items-center gap-4">
      <View>
        <Image source={require("../assets/screen.png")} className="aspect-square h-12"/>
      </View>
      <View>
        <Text className="text-2xl font-bold">System</Text>
        <Text className="text-2xl font-bold">Monitor</Text>
      </View>
    </SafeAreaView>
  )
}