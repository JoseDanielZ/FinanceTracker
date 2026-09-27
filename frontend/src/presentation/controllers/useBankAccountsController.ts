import { useCallback, useEffect, useState } from 'react';
import { BankAccount } from '../../domain/entities/BankAccount';
import { CreateBankAccountInput } from '../../domain/repositories/BankAccountRepository';
import { BankAccountRepositoryImpl } from '../../data/repositories/BankAccountRepositoryImpl';

const repository = new BankAccountRepositoryImpl();

export function useBankAccountsController() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.list();
      setAccounts(data);
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

  const addAccount = useCallback(
    async (input: CreateBankAccountInput) => {
      await repository.create(input);
      await load();
    },
    [load],
  );

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return { accounts, loading, error, totalBalance, addAccount, reload: load };
}
