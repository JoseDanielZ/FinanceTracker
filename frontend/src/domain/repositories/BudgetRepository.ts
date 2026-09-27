import { BudgetProgress } from '../entities/Budget';

export interface CreateBudgetInput {
  category: string;
  limit: number;
  month: string;
}

export interface BudgetRepository {
  create(input: CreateBudgetInput): Promise<void>;
  listWithProgress(month: string): Promise<BudgetProgress[]>;
}
