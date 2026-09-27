import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './infrastructure/controllers/profile.controller';
import { UserProfileOrmEntity } from './infrastructure/persistence/user-profile.orm-entity';
import { UserProfileRepositoryImpl } from './infrastructure/persistence/user-profile.repository.impl';
import { UserProfileRepository } from './domain/repositories/user-profile.repository';
import { GetProfileUseCase } from './application/use-cases/get-profile.use-case';
import { UpdateProfileUseCase } from './application/use-cases/update-profile.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileOrmEntity])],
  controllers: [ProfileController],
  providers: [
    GetProfileUseCase,
    UpdateProfileUseCase,
    { provide: UserProfileRepository, useClass: UserProfileRepositoryImpl },
  ],
})
export class ProfileModule {}
