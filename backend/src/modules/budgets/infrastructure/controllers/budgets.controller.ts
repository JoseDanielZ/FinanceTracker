import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateBudgetUseCase } from '../../application/use-cases/create-budget.use-case';
import { ListBudgetsWithProgressUseCase } from '../../application/use-cases/list-budgets-with-progress.use-case';
import { CreateBudgetDto } from '../../application/dto/create-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(
    private readonly createBudget: CreateBudgetUseCase,
    private readonly listWithProgress: ListBudgetsWithProgressUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateBudgetDto) {
    return this.createBudget.execute(dto);
  }

  @Get()
  list(@Query('month') month: string) {
    return this.listWithProgress.execute(month);
  }
}
