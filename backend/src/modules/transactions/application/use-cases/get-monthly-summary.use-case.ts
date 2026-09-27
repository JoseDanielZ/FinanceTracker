import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

// Regla de negocio simple: sumar ingresos y gastos del mes y sacar
// el balance. Vive aquí (application), no en el controller ni en el
// repositorio, para que sea reutilizable y fácil de testear.
@Injectable()
export class GetMonthlySummaryUseCase {
  constructor(private readonly transactions: TransactionRepository) {}

  async execute(month: string): Promise<MonthlySummary> {
    const items = await this.transactions.findAll({ month });
    const income = items.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = items.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { month, income, expense, balance: income - expense };
  }
}
