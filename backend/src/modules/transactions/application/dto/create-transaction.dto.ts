import { IsIn, IsNumber, IsOptional, IsString, IsDateString, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsIn(['income', 'expense'])
  type: 'income' | 'expense';

  @IsString()
  category: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
