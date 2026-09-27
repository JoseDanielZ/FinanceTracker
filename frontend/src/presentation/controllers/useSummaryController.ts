import { useCallback, useEffect, useState } from 'react';
import { Transaction } from '../../domain/entities/Transaction';
import { TransactionRepositoryImpl } from '../../data/repositories/TransactionRepositoryImpl';

const repository = new TransactionRepositoryImpl();

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7); // 'YYYY-MM'
}

// Controller de la pantalla Resumen: trae TODO el mes (sin filtrar
// por tipo) y deriva ingresos/gastos/balance y los últimos 3
// movimientos — la misma forma que ya tiene el mockup.
export function useSummaryController() {
  const [items, setItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await repository.list({ month: currentMonth() });
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const income = items.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = items.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const recent = items.slice(0, 4);

  return { loading, income, expense, balance, recent, reload: load };
}
