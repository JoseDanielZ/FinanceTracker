import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccountRepository } from '../../domain/repositories/bank-account.repository';
import { BankAccount } from '../../domain/entities/bank-account.entity';
import { BankAccountOrmEntity } from './bank-account.orm-entity';

@Injectable()
export class BankAccountRepositoryImpl extends BankAccountRepository {
  constructor(
    @InjectRepository(BankAccountOrmEntity)
    private readonly orm: Repository<BankAccountOrmEntity>,
  ) {
    super();
  }

  async create(account: BankAccount): Promise<BankAccount> {
    const row = this.orm.create({ ...account });
    const saved = await this.orm.save(row);
    return this.toDomain(saved);
  }

  async findAll(): Promise<BankAccount[]> {
    const rows = await this.orm.find({ order: { bankName: 'ASC' } });
    return rows.map(this.toDomain);
  }

  private toDomain(row: BankAccountOrmEntity): BankAccount {
    return new BankAccount(row.id, row.bankName, row.accountType, row.balance, row.note);
  }
}
