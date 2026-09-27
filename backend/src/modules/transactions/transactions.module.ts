import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './infrastructure/controllers/transactions.controller';
import { TransactionOrmEntity } from './infrastructure/persistence/transaction.orm-entity';
import { TransactionRepositoryImpl } from './infrastructure/persistence/transaction.repository.impl';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { ListTransactionsUseCase } from './application/use-cases/list-transactions.use-case';
import { GetMonthlySummaryUseCase } from './application/use-cases/get-monthly-summary.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionOrmEntity])],
  controllers: [TransactionsController],
  exports: [TransactionRepository],
  providers: [
    CreateTransactionUseCase,
    ListTransactionsUseCase,
    GetMonthlySummaryUseCase,
    // Aquí se "conecta" el puerto de dominio con su implementación real.
    { provide: TransactionRepository, useClass: TransactionRepositoryImpl },
  ],
})
export class TransactionsModule {}
