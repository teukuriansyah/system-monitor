import { Text, View } from "react-native";
import { Link } from "expo-router"

export default function Index() {
  return (
    <View>
      <Link href="/device">Device</Link>
      <Text>test</Text>
    </View>
  );
}

