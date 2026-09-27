import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ACCOUNT_TYPES, AccountType } from '../../../../shared/constants/account-types';

export class CreateBankAccountDto {
  @IsString()
  bankName: string;

  @IsIn(ACCOUNT_TYPES)
  accountType: AccountType;

  @IsNumber()
  balance: number;

  @IsOptional()
  @IsString()
  note?: string;
}
