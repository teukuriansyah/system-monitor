import { Pressable, View } from 'react-native';
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
  duration = 300,
  trackColors = { on: '#82cab2', off: '#fa7f7c' },
}) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    // Interpolasi warna track berdasarkan animasi value (0 sampai 1)
    const backgroundColor = interpolateColor(
      value.value,
      [0, 1],
      [trackColors.off, trackColors.on]
    );

    return {
      backgroundColor,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    // Padding track adalah 4px (p-1 -> 4px di Tailwind/NativeWind)
    const padding = 4;
    const maxTranslate = width.value - height.value;

    const translateX = interpolate(
      value.value,
      [0, 1],
      [0, maxTranslate > 0 ? maxTranslate : 0]
    );

    return {
      transform: [{ translateX }],
      borderRadius: (height.value - padding * 2) / 2,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        // Ukuran default dibuat kecil & kompak: w-[50px] h-[28px] p-1 (4px padding)
        className={`justify-center w-[50px] h-[28px] p-1 ${className}`}
        style={trackAnimatedStyle}>
        <Animated.View
          className="h-full aspect-square bg-white shadow-sm"
          style={thumbAnimatedStyle}
        />
      </Animated.View>
    </Pressable>
  );
};

export default function ToggleButton() {
  // SharedValue 0 untuk OFF, 1 untuk ON
  const progress = useSharedValue(0);

  const handlePress = () => {
    // Jalankan animasi smooth saat di-press
    progress.value = withTiming(progress.value === 0 ? 1 : 0, { duration: 300 });
  };

  return (
    <View className="flex-1 items-center justify-center">
      {/* Kamu tidak perlu menimpa className jika ingin menggunakan ukuran standar kecil di atas */}
      <Switch value={progress} onPress={handlePress} />
    </View>
  );
}