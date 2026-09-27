import { apiClient } from '../api/apiClient';
import { BudgetProgress } from '../../domain/entities/Budget';
import { BudgetRepository, CreateBudgetInput } from '../../domain/repositories/BudgetRepository';

export class BudgetRepositoryImpl implements BudgetRepository {
  async create(input: CreateBudgetInput): Promise<void> {
    await apiClient.post('/budgets', input);
  }

  async listWithProgress(month: string): Promise<BudgetProgress[]> {
    return apiClient.get<BudgetProgress[]>(`/budgets?month=${month}`);
  }
}
