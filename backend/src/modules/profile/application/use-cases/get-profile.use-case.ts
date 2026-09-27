import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../../domain/repositories/user-profile.repository';
import { UserProfile } from '../../domain/entities/user-profile.entity';

@Injectable()
export class GetProfileUseCase {
  constructor(private readonly profile: UserProfileRepository) {}

  async execute(): Promise<UserProfile | null> {
    return this.profile.get();
  }
}
