import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../theme/typography';
import { useThemeColors } from '../controllers/useThemeColors';
import { useCreditCardsController } from '../controllers/useCreditCardsController';
import { CreditCard } from '../../domain/entities/CreditCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export function CreditCardsScreen() {
  const colors = useThemeColors();
  const navigation = useNavigation<any>();
  const { cards, loading, error, totalDebt, addCard } = useCreditCardsController();

  const [adding, setAdding] = useState(false);
  const [issuer, setIssuer] = useState('');
  const [balanceOwed, setBalanceOwed] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [statementDay, setStatementDay] = useState('');
  const [paymentDueDay, setPaymentDueDay] = useState('');

  function resetForm() {
    setIssuer('');
    setBalanceOwed('');
    setCreditLimit('');
    setStatementDay('');
    setPaymentDueDay('');
    setAdding(false);
  }

  async function handleSave() {
    const debt = parseFloat(balanceOwed.replace(',', '.'));
    const cutoff = parseInt(statementDay, 10);
    const due = parseInt(paymentDueDay, 10);
    if (!issuer.trim() || isNaN(debt) || debt < 0) return;
    if (!cutoff || cutoff < 1 || cutoff > 31 || !due || due < 1 || due > 31) return;
    const limit = parseFloat(creditLimit.replace(',', '.'));
    await addCard({
      issuer: issuer.trim(),
      balanceOwed: debt,
      statementDay: cutoff,
      paymentDueDay: due,
      creditLimit: isNaN(limit) ? undefined : limit,
    });
    resetForm();
  }

  function renderCard({ item }: { item: CreditCard }) {
    return (
      <Card style={{ gap: 10, marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.textPrimary, fontFamily: fonts.bodySemibold, fontSize: 15 }}>{item.issuer}</Text>
          <Text style={{ color: colors.over, fontFamily: fonts.display, fontSize: 18 }}>${item.balanceOwed.toFixed(2)}</Text>
        </View>
        {item.creditLimit != null && (
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Límite: ${item.creditLimit.toFixed(2)}</Text>
        )}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Corte: día {item.statementDay}</Text>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Pago: día {item.paymentDueDay}</Text>
        </View>
      </Card>
    );
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Tarjetas de crédito</Text>
        <View style={[styles.totalPill, { backgroundColor: colors.overTint }]}>
          <Text style={{ color: colors.over, fontFamily: fonts.bodySemibold, fontSize: 12 }}>${totalDebt.toFixed(2)}</Text>
        </View>
      </View>

      {error && <Text style={{ color: colors.over, paddingHorizontal: 20, marginBottom: 8 }}>{error}</Text>}

      <FlatList
        data={cards}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 6 }}
        renderItem={renderCard}
        refreshing={loading}
        ListEmptyComponent={!loading ? <Text style={{ color: colors.textSecondary, marginTop: 20 }}>Aún no has agregado tarjetas.</Text> : null}
      />

      {adding && (
        <View style={[styles.addPanel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput
            value={issuer}
            onChangeText={setIssuer}
            placeholder="Banco / emisor, ej. BBVA"
            style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
            placeholderTextColor={colors.textSecondary}
          />
          <TextInput
            value={balanceOwed}
            onChangeText={setBalanceOwed}
            placeholder="Cuánto debes"
            keyboardType="decimal-pad"
            style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
            placeholderTextColor={colors.textSecondary}
          />
          <TextInput
            value={creditLimit}
            onChangeText={setCreditLimit}
            placeholder="Límite de crédito (opcional)"
            keyboardType="decimal-pad"
            style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
            placeholderTextColor={colors.textSecondary}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput
              value={statementDay}
              onChangeText={setStatementDay}
              placeholder="Día de corte (1-31)"
              keyboardType="number-pad"
              style={[styles.input, { borderColor: colors.border, color: colors.textPrimary, flex: 1 }]}
              placeholderTextColor={colors.textSecondary}
            />
            <TextInput
              value={paymentDueDay}
              onChangeText={setPaymentDueDay}
              placeholder="Día de pago (1-31)"
              keyboardType="number-pad"
              style={[styles.input, { borderColor: colors.border, color: colors.textPrimary, flex: 1 }]}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button label="Cancelar" color={colors.surfaceAlt} textColor={colors.textSecondary} onPress={resetForm} style={{ flex: 1 }} />
            <Button label="Guardar" color={colors.over} onPress={handleSave} style={{ flex: 1 }} />
          </View>
        </View>
      )}

      {!adding && (
        <Pressable
          onPress={() => setAdding(true)}
          style={[styles.fab, { backgroundColor: colors.over }]}
          accessibilityLabel="Agregar tarjeta"
        >
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 8 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 14, gap: 10 },
  title: { fontFamily: fonts.display, fontSize: 18, flex: 1 },
  totalPill: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999 },
  addPanel: { margin: 20, padding: 16, borderRadius: 16, borderWidth: 1, gap: 12 },
  input: { height: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, fontSize: 15 },
  fab: {
    position: 'absolute', right: 20, bottom: 24, width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 5,
  },
});
