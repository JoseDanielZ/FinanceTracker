import { apiClient } from '../api/apiClient';
import { CreditCard } from '../../domain/entities/CreditCard';
import { CreditCardRepository, CreateCreditCardInput } from '../../domain/repositories/CreditCardRepository';

export class CreditCardRepositoryImpl implements CreditCardRepository {
  async create(input: CreateCreditCardInput): Promise<CreditCard> {
    return apiClient.post<CreditCard>('/credit-cards', input);
  }

  async list(): Promise<CreditCard[]> {
    return apiClient.get<CreditCard[]>('/credit-cards');
  }
}
