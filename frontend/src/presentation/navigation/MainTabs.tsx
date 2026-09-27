import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SummaryScreen } from '../views/SummaryScreen';
import { IncomeScreen } from '../views/IncomeScreen';
import { ExpensesScreen } from '../views/ExpensesScreen';
import { BudgetsScreen } from '../views/BudgetsScreen';
import { HistoryScreen } from '../views/HistoryScreen';
import { useThemeColors } from '../controllers/useThemeColors';

const Tab = createBottomTabNavigator();

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Resumen: 'home-outline',
  Ingresos: 'arrow-down-circle-outline',
  Gastos: 'arrow-up-circle-outline',
  Presupuestos: 'pie-chart-outline',
  Historial: 'time-outline',
};

// Las 5 pestañas del mockup, en el mismo orden que la barra inferior
// del diseño. Cada pantalla es totalmente independiente (Clean
// Architecture): comparten componentes/tema, no estado.
export function MainTabs() {
  const colors = useThemeColors();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.navInactive,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Resumen" component={SummaryScreen} />
      <Tab.Screen name="Ingresos" component={IncomeScreen} />
      <Tab.Screen name="Gastos" component={ExpensesScreen} />
      <Tab.Screen name="Presupuestos" component={BudgetsScreen} />
      <Tab.Screen name="Historial" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
