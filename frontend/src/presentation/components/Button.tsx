import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { fonts } from '../theme/typography';

type Props = {
  label: string;
  onPress: () => void;
  color: string;
  textColor?: string;
  variant?: 'filled' | 'outline';
  style?: ViewStyle;
};

// Botón genérico: recibe el color (income/expense/lo que sea) en vez
// de tenerlo fijo, para poder reusarlo en toda la app.
export function Button({ label, onPress, color, textColor = '#FFFFFF', variant = 'filled', style }: Props) {
  const isOutline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        isOutline ? { borderWidth: 1, borderColor: color, backgroundColor: 'transparent' } : { backgroundColor: color },
        style,
      ]}
    >
      <Text style={[styles.label, { color: isOutline ? color : textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
  },
});
