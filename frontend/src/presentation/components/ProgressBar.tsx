import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColors } from '../../presentation/controllers/useThemeColors';

export function ProgressBar({ percent, color }: { percent: number; color: string }) {
  const colors = useThemeColors();
  const width = Math.min(percent, 100);
  return (
    <View style={[styles.track, { backgroundColor: colors.surfaceAlt }]}>
      <View style={[styles.fill, { width: `${width}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 7, borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 999 },
});
