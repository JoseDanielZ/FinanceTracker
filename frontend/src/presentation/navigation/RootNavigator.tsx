import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../views/WelcomeScreen';
import { ProfileScreen } from '../views/ProfileScreen';
import { CreditCardsScreen } from '../views/CreditCardsScreen';
import { BankAccountsScreen } from '../views/BankAccountsScreen';
import { MainTabs } from './MainTabs';

export type RootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  Profile: undefined;
  CreditCards: undefined;
  BankAccounts: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Pantallas "de detalle" (Perfil, Tarjetas, Cuentas) viven en el stack
// raíz, no dentro de los tabs — así pueden pushearse desde cualquier
// tab (hoy desde Resumen) y volver con back nativo.
export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreditCards" component={CreditCardsScreen} />
        <Stack.Screen name="BankAccounts" component={BankAccountsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
