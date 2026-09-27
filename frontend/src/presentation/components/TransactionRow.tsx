import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../theme/typography';
import { useThemeColors } from '../../presentation/controllers/useThemeColors';
import { Transaction } from '../../domain/entities/Transaction';

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Comida: 'restaurant-outline',
  Ropa: 'shirt-outline',
  Pareja: 'heart-outline',
  Entretenimiento: 'play-circle-outline',
  Sueldo: 'briefcase-outline',
  Semanal: 'calendar-outline',
  Extra: 'gift-outline',
};

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const colors = useThemeColors();
  const isIncome = transaction.type === 'income';
  const color = isIncome ? colors.income : colors.expense;
  const tint = isIncome ? colors.incomeTint : colors.expenseTint;
  const icon = ICONS[transaction.category] ?? 'pricetag-outline';
  const sign = isIncome ? '+' : '-';

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: tint }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{transaction.category}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {new Date(transaction.date).toLocaleDateString('es-EC')}
        </Text>
      </View>
      <Text style={[styles.amount, { color }]}>
        {sign}${transaction.amount.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, borderBottomWidth: 1 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: fonts.bodyMedium, fontSize: 14 },
  subtitle: { fontFamily: fonts.body, fontSize: 12, marginTop: 2 },
  amount: { fontFamily: fonts.bodySemibold, fontSize: 14 },
});
