import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardsController } from './infrastructure/controllers/credit-cards.controller';
import { CreditCardOrmEntity } from './infrastructure/persistence/credit-card.orm-entity';
import { CreditCardRepositoryImpl } from './infrastructure/persistence/credit-card.repository.impl';
import { CreditCardRepository } from './domain/repositories/credit-card.repository';
import { CreateCreditCardUseCase } from './application/use-cases/create-credit-card.use-case';
import { ListCreditCardsUseCase } from './application/use-cases/list-credit-cards.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCardOrmEntity])],
  controllers: [CreditCardsController],
  providers: [
    CreateCreditCardUseCase,
    ListCreditCardsUseCase,
    { provide: CreditCardRepository, useClass: CreditCardRepositoryImpl },
  ],
})
export class CreditCardsModule {}
