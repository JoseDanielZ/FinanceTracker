import { useCallback, useEffect, useState } from 'react';
import { Transaction, TransactionType } from '../../domain/entities/Transaction';
import { TransactionRepositoryImpl } from '../../data/repositories/TransactionRepositoryImpl';

const repository = new TransactionRepositoryImpl();

// Controller compartido por Ingresos y Gastos: mismo patrón, distinto
// "type". Guarda la lista en estado, expone addTransaction() y vuelve
// a cargar tras cada guardado.
export function useTransactionsController(type: TransactionType) {
  const [items, setItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.list({ type });
      setItems(data);
      setError(null);
    } catch (e) {
      setError('No se pudo conectar con el backend. ¿Está corriendo en ' + 'localhost:3000' + '?');
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    load();
  }, [load]);

  const addTransaction = useCallback(
    async (category: string, amount: number) => {
      await repository.create({ type, category, amount });
      await load();
    },
    [type, load],
  );

  const total = items.reduce((sum, t) => sum + t.amount, 0);

  return { items, loading, error, total, addTransaction, reload: load };
}
