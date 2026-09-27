import { AccountType } from '../../config/accountTypes';
import { BankAccount } from '../entities/BankAccount';

export interface CreateBankAccountInput {
  bankName: string;
  accountType: AccountType;
  balance: number;
  note?: string;
}

export interface BankAccountRepository {
  create(input: CreateBankAccountInput): Promise<BankAccount>;
  list(): Promise<BankAccount[]>;
}
