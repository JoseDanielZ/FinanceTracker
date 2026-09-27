import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { BankAccount } from '../../domain/entities/bank-account.entity';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';

@Injectable()
export class CreateBankAccountUseCase {
  constructor(private readonly accounts: BankAccountRepository) {}

  async execute(dto: CreateBankAccountDto): Promise<BankAccount> {
    const account = new BankAccount(randomUUID(), dto.bankName, dto.accountType, dto.balance, dto.note);
    return this.accounts.create(account);
  }
}
