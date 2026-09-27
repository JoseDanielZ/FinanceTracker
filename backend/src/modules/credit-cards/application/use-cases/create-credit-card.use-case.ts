import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreditCardRepository } from '../../domain/repositories/credit-card.repository';
import { CreditCard } from '../../domain/entities/credit-card.entity';
import { CreateCreditCardDto } from '../dto/create-credit-card.dto';

@Injectable()
export class CreateCreditCardUseCase {
  constructor(private readonly cards: CreditCardRepository) {}

  async execute(dto: CreateCreditCardDto): Promise<CreditCard> {
    const card = new CreditCard(
      randomUUID(),
      dto.issuer,
      dto.balanceOwed,
      dto.statementDay,
      dto.paymentDueDay,
      dto.creditLimit,
      dto.note,
    );
    return this.cards.create(card);
  }
}
