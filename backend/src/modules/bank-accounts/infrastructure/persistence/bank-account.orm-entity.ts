import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AccountType } from '../../../../shared/constants/account-types';

@Entity('bank_accounts')
export class BankAccountOrmEntity {
  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'text' })
  bankName: string;

  @Column({ type: 'text' })
  accountType: AccountType;

  @Column({ type: 'float' })
  balance: number;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
