import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBankAccountUseCase } from '../../application/use-cases/create-bank-account.use-case';
import { ListBankAccountsUseCase } from '../../application/use-cases/list-bank-accounts.use-case';
import { CreateBankAccountDto } from '../../application/dto/create-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(
    private readonly createBankAccount: CreateBankAccountUseCase,
    private readonly listBankAccounts: ListBankAccountsUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateBankAccountDto) {
    return this.createBankAccount.execute(dto);
  }

  @Get()
  list() {
    return this.listBankAccounts.execute();
  }
}
