import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../theme/typography';
import { useThemeColors } from '../controllers/useThemeColors';
import { useProfileController } from '../controllers/useProfileController';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}

export function ProfileScreen() {
  const colors = useThemeColors();
  const navigation = useNavigation<any>();
  const { profile, loading, error, saveProfile } = useProfileController();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email ?? '');
    }
  }, [profile]);

  async function handleSave() {
    if (!name.trim()) return;
    await saveProfile({ name: name.trim(), email: email.trim() || undefined });
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Perfil</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.avatarWrap}>
          <View style={[styles.avatarBig, { backgroundColor: colors.surfaceAlt }]}>
            <Text style={{ color: colors.textPrimary, fontFamily: fonts.display, fontSize: 28 }}>
              {initialsOf(name || 'Usuario')}
            </Text>
          </View>
        </View>

        {error && <Text style={{ color: colors.over }}>{error}</Text>}

        <Card style={{ gap: 14 }}>
          <View style={{ gap: 6 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Nombre</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Correo (opcional)</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="tucorreo@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <Button label={loading ? 'Cargando…' : 'Guardar'} color={colors.income} onPress={handleSave} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: fonts.display, fontSize: 20 },
  avatarWrap: { alignItems: 'center' },
  avatarBig: { width: 88, height: 88, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  input: { height: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, fontSize: 15 },
});
