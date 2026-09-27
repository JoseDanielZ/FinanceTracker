import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCardRepository } from '../../domain/repositories/credit-card.repository';
import { CreditCard } from '../../domain/entities/credit-card.entity';
import { CreditCardOrmEntity } from './credit-card.orm-entity';

@Injectable()
export class CreditCardRepositoryImpl extends CreditCardRepository {
  constructor(
    @InjectRepository(CreditCardOrmEntity)
    private readonly orm: Repository<CreditCardOrmEntity>,
  ) {
    super();
  }

  async create(card: CreditCard): Promise<CreditCard> {
    const row = this.orm.create({ ...card });
    const saved = await this.orm.save(row);
    return this.toDomain(saved);
  }

  async findAll(): Promise<CreditCard[]> {
    const rows = await this.orm.find({ order: { issuer: 'ASC' } });
    return rows.map(this.toDomain);
  }

  private toDomain(row: CreditCardOrmEntity): CreditCard {
    return new CreditCard(row.id, row.issuer, row.balanceOwed, row.statementDay, row.paymentDueDay, row.creditLimit, row.note);
  }
}
