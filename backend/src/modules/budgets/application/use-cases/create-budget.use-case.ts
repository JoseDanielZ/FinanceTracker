import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BudgetRepository } from '../../domain/repositories/budget.repository';
import { Budget } from '../../domain/entities/budget.entity';
import { CreateBudgetDto } from '../dto/create-budget.dto';

@Injectable()
export class CreateBudgetUseCase {
  constructor(private readonly budgets: BudgetRepository) {}

  async execute(dto: CreateBudgetDto): Promise<Budget> {
    const budget = new Budget(randomUUID(), dto.category, dto.limit, dto.month);
    return this.budgets.create(budget);
  }
}
