// Entidad de dominio: una tarjeta de crédito del usuario. La deuda se
// edita a mano, no se calcula sumando transacciones. statementDay y
// paymentDueDay son el día del mes (1-31), igual a como los bancos
// los comunican: "tu corte es el 20, pagas el 5".
export class CreditCard {
  constructor(
    public readonly id: string,
    public readonly issuer: string,
    public readonly balanceOwed: number,
    public readonly statementDay: number,
    public readonly paymentDueDay: number,
    public readonly creditLimit?: number,
    public readonly note?: string,
  ) {}
}
