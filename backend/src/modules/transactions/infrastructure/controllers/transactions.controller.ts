import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTransactionUseCase } from '../../application/use-cases/create-transaction.use-case';
import { ListTransactionsUseCase } from '../../application/use-cases/list-transactions.use-case';
import { GetMonthlySummaryUseCase } from '../../application/use-cases/get-monthly-summary.use-case';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { TransactionType } from '../../domain/entities/transaction.entity';

// El "Controller" del patrón MVC en el backend: solo traduce
// HTTP <-> casos de uso. No tiene lógica de negocio.
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransaction: CreateTransactionUseCase,
    private readonly listTransactions: ListTransactionsUseCase,
    private readonly getMonthlySummary: GetMonthlySummaryUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.createTransaction.execute(dto);
  }

  @Get()
  list(@Query('type') type?: TransactionType, @Query('month') month?: string) {
    return this.listTransactions.execute({ type, month });
  }

  @Get('summary')
  summary(@Query('month') month: string) {
    return this.getMonthlySummary.execute(month);
  }
}
