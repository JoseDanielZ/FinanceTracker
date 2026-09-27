import { apiClient } from '../api/apiClient';
import { UserProfile } from '../../domain/entities/UserProfile';
import { ProfileRepository, UpdateProfileInput } from '../../domain/repositories/ProfileRepository';

export class ProfileRepositoryImpl implements ProfileRepository {
  async get(): Promise<UserProfile | null> {
    return apiClient.get<UserProfile | null>('/profile');
  }

  async update(input: UpdateProfileInput): Promise<UserProfile> {
    return apiClient.put<UserProfile>('/profile', input);
  }
}
