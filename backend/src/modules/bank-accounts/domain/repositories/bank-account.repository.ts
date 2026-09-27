import { BankAccount } from '../entities/bank-account.entity';

// Puerto (interfaz) del dominio. La capa de aplicación depende SOLO
// de esto, nunca de TypeORM directamente.
export abstract class BankAccountRepository {
  abstract create(account: BankAccount): Promise<BankAccount>;
  abstract findAll(): Promise<BankAccount[]>;
}
