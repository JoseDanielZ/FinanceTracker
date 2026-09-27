import { AccountType } from '../../config/accountTypes';

export interface BankAccount {
  id: string;
  bankName: string;
  accountType: AccountType;
  balance: number;
  note?: string;
}
