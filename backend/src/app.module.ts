import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';
import { CreditCardsModule } from './modules/credit-cards/credit-cards.module';
import { ProfileModule } from './modules/profile/profile.module';
import { TransactionOrmEntity } from './modules/transactions/infrastructure/persistence/transaction.orm-entity';
import { BudgetOrmEntity } from './modules/budgets/infrastructure/persistence/budget.orm-entity';
import { BankAccountOrmEntity } from './modules/bank-accounts/infrastructure/persistence/bank-account.orm-entity';
import { CreditCardOrmEntity } from './modules/credit-cards/infrastructure/persistence/credit-card.orm-entity';
import { UserProfileOrmEntity } from './modules/profile/infrastructure/persistence/user-profile.orm-entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // SQLite: cero configuración para correr local. Para producción,
    // cambia "type" a "postgres" y agrega host/usuario/clave por env.
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH ?? 'financetracker.sqlite',
      entities: [TransactionOrmEntity, BudgetOrmEntity, BankAccountOrmEntity, CreditCardOrmEntity, UserProfileOrmEntity],
      synchronize: true, // OK en desarrollo; usar migraciones en producción
    }),
    TransactionsModule,
    BudgetsModule,
    BankAccountsModule,
    CreditCardsModule,
    ProfileModule,
  ],
})
export class AppModule {}
