import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCreditCardUseCase } from '../../application/use-cases/create-credit-card.use-case';
import { ListCreditCardsUseCase } from '../../application/use-cases/list-credit-cards.use-case';
import { CreateCreditCardDto } from '../../application/dto/create-credit-card.dto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(
    private readonly createCreditCard: CreateCreditCardUseCase,
    private readonly listCreditCards: ListCreditCardsUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCreditCardDto) {
    return this.createCreditCard.execute(dto);
  }

  @Get()
  list() {
    return this.listCreditCards.execute();
  }
}
