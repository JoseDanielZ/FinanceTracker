import { useColorScheme } from 'react-native';
import { lightColors, darkColors, ThemeColors } from '../theme/colors';

// Controller mínimo: decide qué paleta usar según el modo del sistema.
// Todas las vistas leen colores de aquí, nunca hardcodeados.
export function useThemeColors(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkColors : lightColors;
}
