import React from 'react';
import { MovementsScreen } from './MovementsScreen';
import { INCOME_CATEGORIES } from '../../config/categories';

export function IncomeScreen() {
  return <MovementsScreen type="income" categories={INCOME_CATEGORIES} title="Ingresos" />;
}
