// Mismos tokens exactos que el mockup en Claude (Design canvas).
// Si cambias un color, cámbialo también allá para que no se desalineen.
export const lightColors = {
  bg: '#F7F5F1',
  surface: '#FFFFFF',
  surfaceAlt: '#EFEBE4',
  border: '#E7E3DC',
  textPrimary: '#1B1D1F',
  textSecondary: '#6B6862',
  income: '#1F6F78',
  incomeTint: '#E4EFEE',
  expense: '#C1662E',
  expenseTint: '#F6E9DE',
  over: '#9B3A26',
  overTint: '#F5E1DC',
  navInactive: '#B7B2A8',
};

export const darkColors = {
  bg: '#121316',
  surface: '#1C1E22',
  surfaceAlt: '#24262B',
  border: '#2A2D31',
  textPrimary: '#F2F1EE',
  textSecondary: '#9B978F',
  income: '#3FA6AE',
  incomeTint: '#1B3236',
  expense: '#E08A52',
  expenseTint: '#332419',
  over: '#E2694F',
  overTint: '#332019',
  navInactive: '#5C5F64',
};

export type ThemeColors = typeof lightColors;
