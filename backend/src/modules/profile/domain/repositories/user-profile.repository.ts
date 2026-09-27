import { UserProfile } from '../entities/user-profile.entity';

// Puerto (interfaz) del dominio. La capa de aplicación depende SOLO
// de esto, nunca de TypeORM directamente.
export abstract class UserProfileRepository {
  abstract get(): Promise<UserProfile | null>;
  abstract upsert(profile: UserProfile): Promise<UserProfile>;
}
