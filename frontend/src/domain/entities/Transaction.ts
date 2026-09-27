// Modelo de dominio (la "M" de MVC): no importa nada de React Native
// ni de la API. Las vistas y los repositorios hablan en términos de
// esta clase, nunca de la forma exacta del JSON que viaja por HTTP.
export type TransactionType = 'income' | 'expense';

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly type: TransactionType,
    public readonly category: string,
    public readonly amount: number,
    public readonly date: string, // ISO string
    public readonly note?: string,
  ) {}
}
