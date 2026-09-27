import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../../domain/repositories/user-profile.repository';
import { UserProfile } from '../../domain/entities/user-profile.entity';
import { UpdateProfileDto } from '../dto/update-profile.dto';

const PROFILE_ID = 'me';

@Injectable()
export class UpdateProfileUseCase {
  constructor(private readonly profile: UserProfileRepository) {}

  async execute(dto: UpdateProfileDto): Promise<UserProfile> {
    const profile = new UserProfile(PROFILE_ID, dto.name, dto.email);
    return this.profile.upsert(profile);
  }
}
