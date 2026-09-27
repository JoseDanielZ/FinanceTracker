import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from '../transactions/transactions.module';
import { BudgetsController } from './infrastructure/controllers/budgets.controller';
import { BudgetOrmEntity } from './infrastructure/persistence/budget.orm-entity';
import { BudgetRepositoryImpl } from './infrastructure/persistence/budget.repository.impl';
import { BudgetRepository } from './domain/repositories/budget.repository';
import { CreateBudgetUseCase } from './application/use-cases/create-budget.use-case';
import { ListBudgetsWithProgressUseCase } from './application/use-cases/list-budgets-with-progress.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([BudgetOrmEntity]),
    TransactionsModule, // para leer TransactionRepository y calcular "spent"
  ],
  controllers: [BudgetsController],
  providers: [
    CreateBudgetUseCase,
    ListBudgetsWithProgressUseCase,
    { provide: BudgetRepository, useClass: BudgetRepositoryImpl },
  ],
})
export class BudgetsModule {}
