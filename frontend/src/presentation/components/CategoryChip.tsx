import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { fonts } from '../theme/typography';

type Props = {
  label: string;
  active?: boolean;
  color: string;
  onPress?: () => void;
};

export function CategoryChip({ label, active, color, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active ? { backgroundColor: color } : { borderWidth: 1, borderColor: color + '55' },
      ]}
    >
      <Text style={[styles.label, { color: active ? '#FFFFFF' : color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  label: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
  },
});
