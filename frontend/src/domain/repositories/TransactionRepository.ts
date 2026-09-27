import { Transaction, TransactionType } from '../entities/Transaction';

export interface TransactionFilter {
  type?: TransactionType;
  month?: string; // 'YYYY-MM'
}

export interface CreateTransactionInput {
  type: TransactionType;
  category: string;
  amount: number;
  date?: string;
}

// Puerto de dominio. La pantalla (View) y el controller nunca hablan
// directo con fetch/axios: hablan con esta interfaz. Así, cambiar de
// REST a GraphQL el día de mañana no toca ni una sola pantalla.
export interface TransactionRepository {
  create(input: CreateTransactionInput): Promise<Transaction>;
  list(filter?: TransactionFilter): Promise<Transaction[]>;
}
