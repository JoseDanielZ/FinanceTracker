import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('budgets')
export class BudgetOrmEntity {
  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'float' })
  limit: number;

  @Column({ type: 'text' })
  month: string;
}
