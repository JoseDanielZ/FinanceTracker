import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionRepository, TransactionFilter } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionOrmEntity } from './transaction.orm-entity';

@Injectable()
export class TransactionRepositoryImpl extends TransactionRepository {
  constructor(
    @InjectRepository(TransactionOrmEntity)
    private readonly orm: Repository<TransactionOrmEntity>,
  ) {
    super();
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const row = this.orm.create({ ...transaction });
    const saved = await this.orm.save(row);
    return this.toDomain(saved);
  }

  async findAll(filter?: TransactionFilter): Promise<Transaction[]> {
    const qb = this.orm.createQueryBuilder('t').orderBy('t.date', 'DESC');
    if (filter?.type) qb.andWhere('t.type = :type', { type: filter.type });
    if (filter?.month) qb.andWhere("strftime('%Y-%m', t.date) = :month", { month: filter.month });
    const rows = await qb.getMany();
    return rows.map(this.toDomain);
  }

  private toDomain(row: TransactionOrmEntity): Transaction {
    return new Transaction(row.id, row.type, row.category, row.amount, new Date(row.date), row.note);
  }
}
