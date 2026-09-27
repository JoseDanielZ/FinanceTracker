import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateCreditCardDto {
  @IsString()
  issuer: string;

  @IsNumber()
  @Min(0)
  balanceOwed: number;

  @IsInt()
  @Min(1)
  @Max(31)
  statementDay: number;

  @IsInt()
  @Min(1)
  @Max(31)
  paymentDueDay: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  creditLimit?: number;

  @IsOptional()
  @IsString()
  note?: string;
}
