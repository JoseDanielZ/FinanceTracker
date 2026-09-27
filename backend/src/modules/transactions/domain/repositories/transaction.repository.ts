import { Transaction, TransactionType } from '../entities/transaction.entity';

export interface TransactionFilter {
  type?: TransactionType;
  /** Formato 'YYYY-MM' */
  month?: string;
}

// Puerto (interfaz) del dominio. La capa de aplicación depende SOLO
// de esto, nunca de TypeORM directamente. La implementación real
// vive en infrastructure/persistence.
export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<Transaction>;
  abstract findAll(filter?: TransactionFilter): Promise<Transaction[]>;
}
