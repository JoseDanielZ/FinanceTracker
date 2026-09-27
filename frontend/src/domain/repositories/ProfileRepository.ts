import { UserProfile } from '../entities/UserProfile';

export interface UpdateProfileInput {
  name: string;
  email?: string;
}

export interface ProfileRepository {
  get(): Promise<UserProfile | null>;
  update(input: UpdateProfileInput): Promise<UserProfile>;
}
