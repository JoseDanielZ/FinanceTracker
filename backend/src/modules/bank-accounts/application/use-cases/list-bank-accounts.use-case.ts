import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { BankAccount } from '../../domain/entities/bank-account.entity';

@Injectable()
export class ListBankAccountsUseCase {
  constructor(private readonly accounts: BankAccountRepository) {}

  async execute(): Promise<BankAccount[]> {
    return this.accounts.findAll();
  }
}
