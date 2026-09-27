import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileRepository } from '../../domain/repositories/user-profile.repository';
import { UserProfile } from '../../domain/entities/user-profile.entity';
import { UserProfileOrmEntity } from './user-profile.orm-entity';

@Injectable()
export class UserProfileRepositoryImpl extends UserProfileRepository {
  constructor(
    @InjectRepository(UserProfileOrmEntity)
    private readonly orm: Repository<UserProfileOrmEntity>,
  ) {
    super();
  }

  async get(): Promise<UserProfile | null> {
    const row = await this.orm.findOne({ where: {} });
    return row ? this.toDomain(row) : null;
  }

  async upsert(profile: UserProfile): Promise<UserProfile> {
    const row = this.orm.create({ ...profile });
    const saved = await this.orm.save(row);
    return this.toDomain(saved);
  }

  private toDomain(row: UserProfileOrmEntity): UserProfile {
    return new UserProfile(row.id, row.name, row.email);
  }
}
