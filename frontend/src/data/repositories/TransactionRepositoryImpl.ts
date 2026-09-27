import { apiClient } from '../api/apiClient';
import { Transaction } from '../../domain/entities/Transaction';
import {
  TransactionRepository,
  TransactionFilter,
  CreateTransactionInput,
} from '../../domain/repositories/TransactionRepository';

export class TransactionRepositoryImpl implements TransactionRepository {
  async create(input: CreateTransactionInput): Promise<Transaction> {
    return apiClient.post<Transaction>('/transactions', input);
  }

  async list(filter?: TransactionFilter): Promise<Transaction[]> {
    const params = new URLSearchParams();
    if (filter?.type) params.set('type', filter.type);
    if (filter?.month) params.set('month', filter.month);
    const qs = params.toString();
    return apiClient.get<Transaction[]>(`/transactions${qs ? `?${qs}` : ''}`);
  }
}
