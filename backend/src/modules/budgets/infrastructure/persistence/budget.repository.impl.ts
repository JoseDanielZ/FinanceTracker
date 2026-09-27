import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BudgetRepository } from '../../domain/repositories/budget.repository';
import { Budget } from '../../domain/entities/budget.entity';
import { BudgetOrmEntity } from './budget.orm-entity';

@Injectable()
export class BudgetRepositoryImpl extends BudgetRepository {
  constructor(
    @InjectRepository(BudgetOrmEntity)
    private readonly orm: Repository<BudgetOrmEntity>,
  ) {
    super();
  }

  async create(budget: Budget): Promise<Budget> {
    const row = this.orm.create({ ...budget });
    const saved = await this.orm.save(row);
    return this.toDomain(saved);
  }

  async findByMonth(month: string): Promise<Budget[]> {
    const rows = await this.orm.find({ where: { month } });
    return rows.map(this.toDomain);
  }

  private toDomain(row: BudgetOrmEntity): Budget {
    return new Budget(row.id, row.category, row.limit, row.month);
  }
}
