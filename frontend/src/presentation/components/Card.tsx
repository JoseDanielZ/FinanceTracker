import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useThemeColors } from '../../presentation/controllers/useThemeColors';

export function Card({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  const colors = useThemeColors();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
});
