import { Injectable } from '@nestjs/common';
import { TransactionRepository, TransactionFilter } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class ListTransactionsUseCase {
  constructor(private readonly transactions: TransactionRepository) {}

  async execute(filter?: TransactionFilter): Promise<Transaction[]> {
    return this.transactions.findAll(filter);
  }
}
