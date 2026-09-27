import { Budget } from '../entities/budget.entity';

export abstract class BudgetRepository {
  abstract create(budget: Budget): Promise<Budget>;
  abstract findByMonth(month: string): Promise<Budget[]>;
}
