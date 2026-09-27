import { CreditCard } from '../entities/CreditCard';

export interface CreateCreditCardInput {
  issuer: string;
  balanceOwed: number;
  statementDay: number;
  paymentDueDay: number;
  creditLimit?: number;
  note?: string;
}

export interface CreditCardRepository {
  create(input: CreateCreditCardInput): Promise<CreditCard>;
  list(): Promise<CreditCard[]>;
}
