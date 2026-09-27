import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, SafeAreaView } from 'react-native';
import { fonts } from '../theme/typography';
import { useThemeColors } from '../controllers/useThemeColors';
import { useSummaryController } from '../controllers/useSummaryController';
import { TransactionRow } from '../components/TransactionRow';
import { Card } from '../components/Card';

// Agrupa los movimientos del mes por fecha ("Hoy", "23 sep", ...),
// igual que el log del mockup. El gráfico de 6 meses queda como
// siguiente paso (comentario TODO) — no es "lo fundamental" todavía.
function groupByDay(items: { date: string }[]) {
  const groups = new Map<string, typeof items>();
  for (const item of items) {
    const key = new Date(item.date).toLocaleDateString('es-EC', { day: '2-digit', month: 'short' });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item as any);
  }
  return Array.from(groups.entries()).map(([title, data]) => ({ title, data }));
}

export function HistoryScreen() {
  const colors = useThemeColors();
  const { loading, income, expense, balance, recent } = useSummaryController();
  // TODO: reemplazar `recent` (solo 4) por la lista completa del mes
  // cuando agregues paginación real en useSummaryController.
  const sections = useMemo(() => groupByDay(recent), [recent]);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, gap: 16 }}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Historial</Text>
        <Card style={{ flexDirection: 'row' }}>
          <View style={styles.stat}>
            <Text style={{ color: colors.textSecondary, fontSize: 11 }}>Ingresos</Text>
            <Text style={{ color: colors.income, fontFamily: fonts.bodySemibold }}>${income.toFixed(0)}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={{ color: colors.textSecondary, fontSize: 11 }}>Gastos</Text>
            <Text style={{ color: colors.expense, fontFamily: fonts.bodySemibold }}>${expense.toFixed(0)}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={{ color: colors.textSecondary, fontSize: 11 }}>Neto</Text>
            <Text style={{ color: colors.income, fontFamily: fonts.bodySemibold }}>${balance.toFixed(0)}</Text>
          </View>
        </Card>
      </View>

      <SectionList
        style={{ marginTop: 12 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        sections={sections}
        keyExtractor={(item: any) => item.id}
        renderSectionHeader={({ section }) => (
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{section.title}</Text>
        )}
        renderItem={({ item }) => <TransactionRow transaction={item as any} />}
        ListEmptyComponent={!loading ? <Text style={{ color: colors.textSecondary }}>Nada que mostrar todavía.</Text> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  title: { fontFamily: fonts.display, fontSize: 24 },
  stat: { flex: 1, alignItems: 'center', gap: 4 },
  sectionTitle: { fontFamily: fonts.bodySemibold, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 14, marginBottom: 6 },
});
