import { Injectable } from '@nestjs/common';
import { BudgetRepository } from '../../domain/repositories/budget.repository';
import { TransactionRepository } from '../../../transactions/domain/repositories/transaction.repository';

export interface BudgetProgress {
  id: string;
  category: string;
  limit: number;
  month: string;
  spent: number;
  percent: number;
  status: 'ok' | 'warning' | 'over';
}

// Caso de uso "fundamental" que ya cruza los dos módulos: trae los
// presupuestos del mes y, para cada uno, suma los gastos reales de
// esa categoría — exactamente lo que la pantalla de Presupuestos
// del mockup necesita mostrar (barra + "72%" / "Excedido").
@Injectable()
export class ListBudgetsWithProgressUseCase {
  constructor(
    private readonly budgets: BudgetRepository,
    private readonly transactions: TransactionRepository,
  ) {}

  async execute(month: string): Promise<BudgetProgress[]> {
    const [budgetList, expenses] = await Promise.all([
      this.budgets.findByMonth(month),
      this.transactions.findAll({ type: 'expense', month }),
    ]);

    return budgetList.map((budget) => {
      const spent = expenses
        .filter((e) => e.category === budget.category)
        .reduce((sum, e) => sum + e.amount, 0);
      const percent = Math.round((spent / budget.limit) * 100);
      const status: BudgetProgress['status'] = percent > 100 ? 'over' : percent >= 70 ? 'warning' : 'ok';
      return { id: budget.id, category: budget.category, limit: budget.limit, month: budget.month, spent, percent, status };
    });
  }
}
