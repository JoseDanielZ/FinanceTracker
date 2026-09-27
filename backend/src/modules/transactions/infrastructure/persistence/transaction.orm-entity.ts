import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TransactionType } from '../../domain/entities/transaction.entity';

// Esquema real de la tabla SQLite. Separado de la entidad de dominio
// a propósito: si mañana cambias de SQLite a Postgres, o el ORM,
// solo se toca esta clase y su repositorio — el dominio no se entera.
@Entity('transactions')
export class TransactionOrmEntity {
  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'text' })
  type: TransactionType;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
