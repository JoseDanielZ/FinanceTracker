import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../theme/typography';
import { useThemeColors } from '../controllers/useThemeColors';
import { useBankAccountsController } from '../controllers/useBankAccountsController';
import { ACCOUNT_TYPES, ACCOUNT_TYPE_LABELS, AccountType } from '../../config/accountTypes';
import { BankAccount } from '../../domain/entities/BankAccount';
import { Card } from '../components/Card';
import { CategoryChip } from '../components/CategoryChip';
import { Button } from '../components/Button';

export function BankAccountsScreen() {
  const colors = useThemeColors();
  const navigation = useNavigation<any>();
  const { accounts, loading, error, totalBalance, addAccount } = useBankAccountsController();

  const [adding, setAdding] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState<AccountType>(ACCOUNT_TYPES[0]);
  const [balance, setBalance] = useState('');

  function resetForm() {
    setBankName('');
    setAccountType(ACCOUNT_TYPES[0]);
    setBalance('');
    setAdding(false);
  }

  async function handleSave() {
    const value = parseFloat(balance.replace(',', '.'));
    if (!bankName.trim() || isNaN(value)) return;
    await addAccount({ bankName: bankName.trim(), accountType, balance: value });
    resetForm();
  }

  function renderAccount({ item }: { item: BankAccount }) {
    return (
      <Card style={{ gap: 8, marginBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.textPrimary, fontFamily: fonts.bodySemibold, fontSize: 15 }}>{item.bankName}</Text>
          <Text style={{ color: colors.income, fontFamily: fonts.display, fontSize: 18 }}>${item.balance.toFixed(2)}</Text>
        </View>
        <View style={[styles.typeTag, { backgroundColor: colors.incomeTint, alignSelf: 'flex-start' }]}>
          <Text style={{ color: colors.income, fontSize: 12, fontFamily: fonts.bodySemibold }}>{ACCOUNT_TYPE_LABELS[item.accountType]}</Text>
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
        <Text style={[styles.title, { color: colors.textPrimary }]}>Cuentas bancarias</Text>
        <View style={[styles.totalPill, { backgroundColor: colors.incomeTint }]}>
          <Text style={{ color: colors.income, fontFamily: fonts.bodySemibold, fontSize: 12 }}>${totalBalance.toFixed(2)}</Text>
        </View>
      </View>

      {error && <Text style={{ color: colors.over, paddingHorizontal: 20, marginBottom: 8 }}>{error}</Text>}

      <FlatList
        data={accounts}
        keyExtractor={(a) => a.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 6 }}
        renderItem={renderAccount}
        refreshing={loading}
        ListEmptyComponent={!loading ? <Text style={{ color: colors.textSecondary, marginTop: 20 }}>Aún no has agregado cuentas.</Text> : null}
      />

      {adding && (
        <View style={[styles.addPanel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput
            value={bankName}
            onChangeText={setBankName}
            placeholder="Banco, ej. BBVA"
            style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
            placeholderTextColor={colors.textSecondary}
          />
          <View style={styles.chipsRow}>
            {ACCOUNT_TYPES.map((t) => (
              <CategoryChip
                key={t}
                label={ACCOUNT_TYPE_LABELS[t]}
                color={colors.income}
                active={accountType === t}
                onPress={() => setAccountType(t)}
              />
            ))}
          </View>
          <TextInput
            value={balance}
            onChangeText={setBalance}
            placeholder="Saldo actual"
            keyboardType="decimal-pad"
            style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
            placeholderTextColor={colors.textSecondary}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button label="Cancelar" color={colors.surfaceAlt} textColor={colors.textSecondary} onPress={resetForm} style={{ flex: 1 }} />
            <Button label="Guardar" color={colors.income} onPress={handleSave} style={{ flex: 1 }} />
          </View>
        </View>
      )}

      {!adding && (
        <Pressable
          onPress={() => setAdding(true)}
          style={[styles.fab, { backgroundColor: colors.income }]}
          accessibilityLabel="Agregar cuenta"
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
  typeTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  addPanel: { margin: 20, padding: 16, borderRadius: 16, borderWidth: 1, gap: 12 },
  input: { height: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, fontSize: 15 },
  fab: {
    position: 'absolute', right: 20, bottom: 24, width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 5,
  },
});
