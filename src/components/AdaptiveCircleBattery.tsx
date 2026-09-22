import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function AdaptiveBatteryCircle({ batteryLevel = 0 }) {
  const [textSize, setTextSize] = useState({ width: 0, height: 0 });

  const handleTextLayout = (event:any) => {
    const { width, height } = event.nativeEvent.layout;
    setTextSize({ width, height });
  };

  const strokeWidth = 8;
  const padding = 24; // Jarak/ruang antara teks dan garis lingkaran

  // Ambil dimensi terbesar dari teks agar lingkaran berbentuk bulat sempurna (1:1)
  const maxTextDimension = Math.max(textSize.width, textSize.height);
  const diameter = maxTextDimension > 0 ? maxTextDimension + padding * 2 : 80;

  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * Math.min(Math.max(batteryLevel, 0), 100)) / 100;

  return (
    // Container utama dijadikan penyelarasan tengah penuh
    <View 
      className="items-center justify-center relative" 
      style={{ width: diameter, height: diameter }}
    >
      {/* SVG di-posisikan absolute di latar belakang */}
      {textSize.width > 0 && (
        <Svg width={diameter} height={diameter} style={{ position: 'absolute' }}>
          {/* Garis Latar Belakang */}
          <Circle
            stroke="#1e2d4a"
            fill="none"
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Garis Progress Baterai */}
          <Circle
            stroke="yellow"
            fill="none"
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${diameter / 2}, ${diameter / 2}`}
          />
        </Svg>
      )}

      {/* Teks ditempatkan di tengah container */}
      <View onLayout={handleTextLayout} className="items-center justify-center">
        <Text className="text-2xl font-bold text-[#f3f5f7]">
          {batteryLevel}%
        </Text>
      </View>
    </View>
  );
}