import { CreditCard } from '../entities/credit-card.entity';

// Puerto (interfaz) del dominio. La capa de aplicación depende SOLO
// de esto, nunca de TypeORM directamente.
export abstract class CreditCardRepository {
  abstract create(card: CreditCard): Promise<CreditCard>;
  abstract findAll(): Promise<CreditCard[]>;
}
