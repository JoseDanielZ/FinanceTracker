import { IsNumber, IsString, Matches, Min } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  category: string;

  @IsNumber()
  @Min(1)
  limit: number;

  @Matches(/^\d{4}-\d{2}$/, { message: 'month debe tener formato YYYY-MM' })
  month: string;
}
