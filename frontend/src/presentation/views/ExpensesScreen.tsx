import React from 'react';
import { MovementsScreen } from './MovementsScreen';
import { EXPENSE_CATEGORIES } from '../../config/categories';

export function ExpensesScreen() {
  return <MovementsScreen type="expense" categories={EXPENSE_CATEGORIES} title="Gastos" />;
}
