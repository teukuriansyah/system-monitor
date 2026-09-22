import React from 'react';
import { Pressable, SafeAreaView, View, Button } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Switch = ({
  value,
  onPress,
  className = '',
  duration = 400,
  trackColors = { on: '#82cab2', off: '#fa7f7c' },
}) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      value.value,
      [0, 1],
      [trackColors.off, trackColors.on]
    );
    const colorValue = withTiming(color, { duration });

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(value.value),
      [0, 1],
      [0, width.value - height.value]
    );
    const translateValue = withTiming(moveValue, { duration });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        className={`items-start w-[100px] h-[40px] p-[5px] ${className}`}
        style={trackAnimatedStyle}>
        <Animated.View
          className="h-full aspect-square bg-white"
          style={thumbAnimatedStyle}
        />
      </Animated.View>
    </Pressable>
  );
};

export default function ToggleButton() {
  const isOn = useSharedValue(false);

  const handlePress = () => {
    isOn.value = !isOn.value;
  };

  return (
    <SafeAreaView className="flex-1 h-[300px] items-center justify-center">
      <Switch value={isOn} onPress={handlePress} className="w-[200px] h-[80px] p-[10px]" />

      <View className="pt-4 flex-row justify-center items-center">
        <Button onPress={handlePress} title="Click me" />
      </View>
    </SafeAreaView>
  );
}
