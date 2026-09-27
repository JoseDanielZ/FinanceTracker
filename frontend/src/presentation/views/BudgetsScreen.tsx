import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { fonts } from '../theme/typography';
import { useThemeColors } from '../controllers/useThemeColors';
import { useBudgetsController } from '../controllers/useBudgetsController';
import { EXPENSE_CATEGORIES } from '../../config/categories';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { CategoryChip } from '../components/CategoryChip';
import { Button } from '../components/Button';

const STATUS_LABEL: Record<string, string> = {
  ok: 'Dentro del presupuesto',
  warning: 'Cerca del límite',
  over: 'Excedido',
};

export function BudgetsScreen() {
  const colors = useThemeColors();
  const { budgets, loading, addBudget } = useBudgetsController();
  const [adding, setAdding] = useState(false);
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [limit, setLimit] = useState('');

  function statusColor(status: string) {
    if (status === 'over') return colors.over;
    if (status === 'warning') return colors.expense;
    return colors.income;
  }

  async function handleSave() {
    const value = parseFloat(limit.replace(',', '.'));
    if (!value || value <= 0) return;
    await addBudget(category, value);
    setLimit('');
    setAdding(false);
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Presupuestos</Text>
          <Text onPress={() => setAdding((v) => !v)} style={{ color: colors.textPrimary, fontFamily: fonts.bodySemibold }}>
            {adding ? 'Cerrar' : '+ Nuevo'}
          </Text>
        </View>

        {adding && (
          <Card style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {EXPENSE_CATEGORIES.map((c) => (
                <CategoryChip key={c} label={c} color={colors.expense} active={category === c} onPress={() => setCategory(c)} />
              ))}
            </View>
            <TextInput
              value={limit}
              onChangeText={setLimit}
              placeholder="Límite mensual, ej. 250"
              keyboardType="decimal-pad"
              style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
              placeholderTextColor={colors.textSecondary}
            />
            <Button label="Guardar presupuesto" color={colors.expense} onPress={handleSave} />
          </Card>
        )}

        {!loading && budgets.length === 0 && (
          <Text style={{ color: colors.textSecondary }}>Aún no has creado presupuestos este mes.</Text>
        )}

        {budgets.map((b) => (
          <Card key={b.id} style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.textPrimary, fontFamily: fonts.bodySemibold, fontSize: 14 }}>{b.category}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>${b.spent.toFixed(0)} / ${b.limit.toFixed(0)}</Text>
            </View>
            <ProgressBar percent={b.percent} color={statusColor(b.status)} />
            <Text style={{ color: statusColor(b.status), fontFamily: fonts.bodySemibold, fontSize: 12 }}>
              {STATUS_LABEL[b.status]} · {b.percent}%
            </Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: fonts.display, fontSize: 24 },
  input: { height: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, fontSize: 15 },
});
