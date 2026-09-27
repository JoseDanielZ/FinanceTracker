import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('credit_cards')
export class CreditCardOrmEntity {
  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'text' })
  issuer: string;

  @Column({ type: 'float' })
  balanceOwed: number;

  @Column({ type: 'int' })
  statementDay: number;

  @Column({ type: 'int' })
  paymentDueDay: number;

  @Column({ type: 'float', nullable: true })
  creditLimit?: number;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
