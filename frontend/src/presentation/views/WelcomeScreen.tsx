import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../theme/typography';
import { useThemeColors } from '../controllers/useThemeColors';
import { useAuthController } from '../controllers/useAuthController';
import { Button } from '../components/Button';

export function WelcomeScreen({ navigation }: any) {
  const colors = useThemeColors();
  const { authenticateWithBiometrics, error } = useAuthController(() => navigation.replace('Main'));

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={{ flex: 1 }} />

      <View style={styles.brand}>
        <View style={[styles.logo, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="trending-up" size={26} color={colors.income} />
        </View>
        <Text style={[styles.appName, { color: colors.textPrimary }]}>FinanceTracker</Text>
        <Text style={[styles.tagline, { color: colors.textSecondary }]}>
          Tus ingresos y gastos, sin complicaciones.
        </Text>
      </View>

      <View style={{ gap: 14, marginTop: 40 }}>
        {error && <Text style={{ color: colors.over, textAlign: 'center' }}>{error}</Text>}
        <Button label="Continuar con Face ID" color={colors.income} onPress={authenticateWithBiometrics} />
        <Button
          label="Iniciar sesión con contraseña"
          color="transparent"
          textColor={colors.textPrimary}
          variant="outline"
          onPress={() => navigation.replace('Main')}
          style={{ borderColor: colors.border }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 28, justifyContent: 'space-between' },
  brand: { alignItems: 'center', gap: 16 },
  logo: { width: 64, height: 64, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  appName: { fontFamily: fonts.display, fontSize: 26 },
  tagline: { fontFamily: fonts.body, fontSize: 14, textAlign: 'center', maxWidth: 240 },
});
