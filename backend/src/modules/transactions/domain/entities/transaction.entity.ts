// Entidad de dominio: no sabe nada de NestJS, TypeORM ni HTTP.
// Es la representación pura de "un movimiento" (ingreso o gasto),
// igual al formato que ya usa el Atajo de iOS: fecha;tipo;categoria;monto.

export type TransactionType = 'income' | 'expense';

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly type: TransactionType,
    public readonly category: string,
    public readonly amount: number,
    public readonly date: Date,
    public readonly note?: string,
  ) {}
}
