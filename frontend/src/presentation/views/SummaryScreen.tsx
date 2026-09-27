import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../theme/typography';
import { useThemeColors } from '../controllers/useThemeColors';
import { useSummaryController } from '../controllers/useSummaryController';
import { useBankAccountsController } from '../controllers/useBankAccountsController';
import { useCreditCardsController } from '../controllers/useCreditCardsController';
import { ACCOUNT_TYPE_LABELS } from '../../config/accountTypes';
import { Card } from '../components/Card';
import { TransactionRow } from '../components/TransactionRow';

export function SummaryScreen() {
  const colors = useThemeColors();
  const navigation = useNavigation<any>();
  const { loading, income, expense, balance, recent } = useSummaryController();
  const { accounts, totalBalance, loading: accountsLoading } = useBankAccountsController();
  const { cards, totalDebt, loading: cardsLoading } = useCreditCardsController();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 22 }}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Resumen</Text>
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={[styles.avatar, { backgroundColor: colors.surfaceAlt }]}
            accessibilityLabel="Ver perfil"
          >
            <Text style={{ color: colors.textSecondary, fontFamily: fonts.bodySemibold, fontSize: 13 }}>JD</Text>
          </Pressable>
        </View>

        <Card>
          <Text style={{ color: colors.textSecondary, fontFamily: fonts.body, fontSize: 13 }}>Saldo disponible</Text>
          <Text style={{ color: colors.textPrimary, fontFamily: fonts.display, fontSize: 38, marginTop: 6 }}>
            {loading ? '…' : `$${balance.toFixed(2)}`}
          </Text>
          <View style={[styles.splitRow, { borderTopColor: colors.border }]}>
            <View style={styles.splitItem}>
              <Ionicons name="arrow-up-circle-outline" size={18} color={colors.income} />
              <View>
                <Text style={{ color: colors.textSecondary, fontSize: 11 }}>Ingresos</Text>
                <Text style={{ color: colors.income, fontFamily: fonts.bodySemibold, fontSize: 14 }}>${income.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.splitItem}>
              <Ionicons name="arrow-down-circle-outline" size={18} color={colors.expense} />
              <View>
                <Text style={{ color: colors.textSecondary, fontSize: 11 }}>Gastos</Text>
                <Text style={{ color: colors.expense, fontFamily: fonts.bodySemibold, fontSize: 14 }}>${expense.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </Card>

        <View style={{ gap: 10 }}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Cuentas bancarias</Text>
            <Pressable onPress={() => navigation.navigate('BankAccounts')}>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>Ver todo</Text>
            </Pressable>
          </View>
          <Card>
            {!accountsLoading && accounts.length === 0 && (
              <Text style={{ color: colors.textSecondary }}>Aún no has agregado cuentas.</Text>
            )}
            {accountsLoading && <Text style={{ color: colors.textSecondary }}>Cargando…</Text>}
            {!accountsLoading && accounts.length > 0 && (
              <>
                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Saldo total</Text>
                <Text style={{ color: colors.income, fontFamily: fonts.display, fontSize: 22, marginTop: 2, marginBottom: 10 }}>
                  ${totalBalance.toFixed(2)}
                </Text>
                {accounts.slice(0, 3).map((a) => (
                  <View key={a.id} style={styles.previewRow}>
                    <Text style={{ color: colors.textPrimary, fontSize: 13 }}>
                      {a.bankName} · {ACCOUNT_TYPE_LABELS[a.accountType]}
                    </Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 13 }}>${a.balance.toFixed(2)}</Text>
                  </View>
                ))}
              </>
            )}
          </Card>
        </View>

        <View style={{ gap: 10 }}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Tarjetas de crédito</Text>
            <Pressable onPress={() => navigation.navigate('CreditCards')}>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>Ver todo</Text>
            </Pressable>
          </View>
          <Card>
            {!cardsLoading && cards.length === 0 && (
              <Text style={{ color: colors.textSecondary }}>Aún no has agregado tarjetas.</Text>
            )}
            {cardsLoading && <Text style={{ color: colors.textSecondary }}>Cargando…</Text>}
            {!cardsLoading && cards.length > 0 && (
              <>
                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Deuda total</Text>
                <Text style={{ color: colors.over, fontFamily: fonts.display, fontSize: 22, marginTop: 2, marginBottom: 10 }}>
                  ${totalDebt.toFixed(2)}
                </Text>
                {cards.slice(0, 2).map((c) => (
                  <View key={c.id} style={styles.previewRow}>
                    <Text style={{ color: colors.textPrimary, fontSize: 13 }}>{c.issuer} · corte día {c.statementDay}</Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 13 }}>${c.balanceOwed.toFixed(2)}</Text>
                  </View>
                ))}
              </>
            )}
          </Card>
        </View>

        <View style={{ gap: 10 }}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Movimientos recientes</Text>
            <Pressable onPress={() => navigation.navigate('Historial')}>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>Ver todo</Text>
            </Pressable>
          </View>
          <Card>
            {recent.length === 0 && !loading && (
              <Text style={{ color: colors.textSecondary }}>Aún no hay movimientos este mes.</Text>
            )}
            {recent.map((t) => (
              <TransactionRow key={t.id} transaction={t} />
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: fonts.display, fontSize: 24 },
  avatar: { width: 36, height: 36, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  splitRow: { flexDirection: 'row', gap: 24, borderTopWidth: 1, paddingTop: 14, marginTop: 14 },
  splitItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontFamily: fonts.bodySemibold, fontSize: 15 },
  previewRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 },
});
