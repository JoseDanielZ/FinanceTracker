export interface CreditCard {
  id: string;
  issuer: string;
  balanceOwed: number;
  statementDay: number;
  paymentDueDay: number;
  creditLimit?: number;
  note?: string;
}
