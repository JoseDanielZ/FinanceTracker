import { useCallback, useEffect, useState } from 'react';
import { BudgetProgress } from '../../domain/entities/Budget';
import { BudgetRepositoryImpl } from '../../data/repositories/BudgetRepositoryImpl';

const repository = new BudgetRepositoryImpl();

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

export function useBudgetsController() {
  const [budgets, setBudgets] = useState<BudgetProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await repository.listWithProgress(currentMonth());
    setBudgets(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addBudget = useCallback(
    async (category: string, limit: number) => {
      await repository.create({ category, limit, month: currentMonth() });
      await load();
    },
    [load],
  );

  return { budgets, loading, addBudget, reload: load };
}
