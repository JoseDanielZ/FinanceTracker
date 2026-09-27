import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../theme/typography';
import { useThemeColors } from '../controllers/useThemeColors';
import { useTransactionsController } from '../controllers/useTransactionsController';
import { TransactionType } from '../../domain/entities/Transaction';
import { TransactionRow } from '../components/TransactionRow';
import { CategoryChip } from '../components/CategoryChip';
import { Button } from '../components/Button';

type Props = {
  type: TransactionType;
  categories: readonly string[];
  title: string;
};

// Vista genérica para Ingresos y Gastos: misma pantalla, distinto
// "type"/"categories"/"color". IncomeScreen y ExpensesScreen son
// solo un par de líneas que la configuran (ver esos archivos).
export function MovementsScreen({ type, categories, title }: Props) {
  const colors = useThemeColors();
  const color = type === 'income' ? colors.income : colors.expense;
  const tint = type === 'income' ? colors.incomeTint : colors.expenseTint;
  const { items, loading, error, total, addTransaction } = useTransactionsController(type);

  const [filter, setFilter] = useState<string>('Todos');
  const [adding, setAdding] = useState(false);
  const [category, setCategory] = useState<string>(categories[0]);
  const [amount, setAmount] = useState('');

  const filtered = useMemo(
    () => (filter === 'Todos' ? items : items.filter((t) => t.category === filter)),
    [items, filter],
  );

  async function handleSave() {
    const value = parseFloat(amount.replace(',', '.'));
    if (!value || value <= 0) return;
    await addTransaction(category, value);
    setAmount('');
    setAdding(false);
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        <View style={[styles.totalPill, { backgroundColor: tint }]}>
          <Text style={{ color, fontFamily: fonts.bodySemibold, fontSize: 13 }}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.chipsRow}>
        <CategoryChip label="Todos" color={color} active={filter === 'Todos'} onPress={() => setFilter('Todos')} />
        {categories.map((c) => (
          <CategoryChip key={c} label={c} color={color} active={filter === c} onPress={() => setFilter(c)} />
        ))}
      </View>

      {error && <Text style={{ color: colors.over, paddingHorizontal: 20 }}>{error}</Text>}

      <FlatList
        data={filtered}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => <TransactionRow transaction={item} />}
        refreshing={loading}
        ListEmptyComponent={!loading ? <Text style={{ color: colors.textSecondary, marginTop: 20 }}>Aún no hay movimientos.</Text> : null}
      />

      {adding && (
        <View style={[styles.addPanel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.chipsRow}>
            {categories.map((c) => (
              <CategoryChip key={c} label={c} color={color} active={category === c} onPress={() => setCategory(c)} />
            ))}
          </View>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
            style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
            placeholderTextColor={colors.textSecondary}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button label="Cancelar" color={colors.surfaceAlt} textColor={colors.textSecondary} onPress={() => setAdding(false)} style={{ flex: 1 }} />
            <Button label="Guardar" color={color} onPress={handleSave} style={{ flex: 1 }} />
          </View>
        </View>
      )}

      {!adding && (
        <Pressable
          onPress={() => setAdding(true)}
          style={[styles.fab, { backgroundColor: color }]}
          accessibilityLabel={`Agregar ${type === 'income' ? 'ingreso' : 'gasto'}`}
        >
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 8 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 14 },
  title: { fontFamily: fonts.display, fontSize: 24 },
  totalPill: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 20, marginBottom: 14 },
  addPanel: { margin: 20, padding: 16, borderRadius: 16, borderWidth: 1, gap: 12 },
  input: { height: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, fontSize: 16 },
  fab: {
    position: 'absolute', right: 20, bottom: 24, width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 5,
  },
});
