import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly transactions: TransactionRepository) {}

  async execute(dto: CreateTransactionDto): Promise<Transaction> {
    const transaction = new Transaction(
      randomUUID(),
      dto.type,
      dto.category,
      dto.amount,
      dto.date ? new Date(dto.date) : new Date(),
      dto.note,
    );
    return this.transactions.create(transaction);
  }
}
