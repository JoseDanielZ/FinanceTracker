import { Injectable } from '@nestjs/common';
import { CreditCardRepository } from '../../domain/repositories/credit-card.repository';
import { CreditCard } from '../../domain/entities/credit-card.entity';

@Injectable()
export class ListCreditCardsUseCase {
  constructor(private readonly cards: CreditCardRepository) {}

  async execute(): Promise<CreditCard[]> {
    return this.cards.findAll();
  }
}
