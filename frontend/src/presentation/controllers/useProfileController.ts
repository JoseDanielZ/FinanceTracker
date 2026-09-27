import { useCallback, useEffect, useState } from 'react';
import { UserProfile } from '../../domain/entities/UserProfile';
import { UpdateProfileInput } from '../../domain/repositories/ProfileRepository';
import { ProfileRepositoryImpl } from '../../data/repositories/ProfileRepositoryImpl';

const repository = new ProfileRepositoryImpl();

export function useProfileController() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.get();
      setProfile(data);
      setError(null);
    } catch (e) {
      setError('No se pudo conectar con el backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveProfile = useCallback(
    async (input: UpdateProfileInput) => {
      await repository.update(input);
      await load();
    },
    [load],
  );

  return { profile, loading, error, saveProfile, reload: load };
}
