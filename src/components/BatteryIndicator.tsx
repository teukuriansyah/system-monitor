import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface BatteryProps {
  percentage: number;
}

export default function BatteryIndicator(props: BatteryProps) {
  const clampedPercentage = Math.min(100, Math.max(0, props.percentage));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
      
      {/* Bingkai Luar Baterai */}
      <View 
        style={{ 
          height: 50, 
          flex: 1, 
          backgroundColor: 'rgba(30, 41, 59, 0.6)', 
          borderRadius: 16, 
          borderWidth: 1, 
          borderColor: 'rgba(51, 65, 85, 0.4)', 
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Warna Baterai (Penuh Atas-Bawah) */}
        <View 
          style={{ 
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: `${clampedPercentage}%`,
          }}
        >
          <LinearGradient
            colors={['#38bdf8', '#34d399', '#4ade80']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ 
              width: '100%', 
              height: '100%', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              paddingHorizontal: 12 
            }}
          >
            {/* Ikon Petir & Teks Persentase */}
            <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 10 }}>
              <Ionicons name="flash" size={16} color="#064e3b" />
              <Text style={{ color: '#064e3b', fontWeight: 'bold', fontSize: 14, marginLeft: 4 }}>
                {clampedPercentage}%
              </Text>
            </View>
          </LinearGradient>
        </View>

      </View>

      {/* Kutub Baterai */}
      <View 
        style={{ 
          width: 8, 
          height: 20, 
          backgroundColor: 'rgba(51, 65, 85, 0.6)', 
          borderTopRightRadius: 4, 
          borderBottomRightRadius: 4, 
          marginLeft: 4 
        }} 
      />

    </View>
  );
}