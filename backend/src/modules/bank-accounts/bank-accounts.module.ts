import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountsController } from './infrastructure/controllers/bank-accounts.controller';
import { BankAccountOrmEntity } from './infrastructure/persistence/bank-account.orm-entity';
import { BankAccountRepositoryImpl } from './infrastructure/persistence/bank-account.repository.impl';
import { BankAccountRepository } from './domain/repositories/bank-account.repository';
import { CreateBankAccountUseCase } from './application/use-cases/create-bank-account.use-case';
import { ListBankAccountsUseCase } from './application/use-cases/list-bank-accounts.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountOrmEntity])],
  controllers: [BankAccountsController],
  providers: [
    CreateBankAccountUseCase,
    ListBankAccountsUseCase,
    { provide: BankAccountRepository, useClass: BankAccountRepositoryImpl },
  ],
})
export class BankAccountsModule {}
