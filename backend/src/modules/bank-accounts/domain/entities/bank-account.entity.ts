import { AccountType } from '../../../../shared/constants/account-types';

// Entidad de dominio: una cuenta bancaria del usuario (banco, tipo y saldo).
// El saldo se edita a mano, no se calcula sumando transacciones.
export class BankAccount {
  constructor(
    public readonly id: string,
    public readonly bankName: string,
    public readonly accountType: AccountType,
    public readonly balance: number,
    public readonly note?: string,
  ) {}
}
