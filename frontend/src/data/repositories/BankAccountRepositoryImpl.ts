import { apiClient } from '../api/apiClient';
import { BankAccount } from '../../domain/entities/BankAccount';
import { BankAccountRepository, CreateBankAccountInput } from '../../domain/repositories/BankAccountRepository';

export class BankAccountRepositoryImpl implements BankAccountRepository {
  async create(input: CreateBankAccountInput): Promise<BankAccount> {
    return apiClient.post<BankAccount>('/bank-accounts', input);
  }

  async list(): Promise<BankAccount[]> {
    return apiClient.get<BankAccount[]>('/bank-accounts');
  }
}
