import { useCallback, useEffect, useState } from 'react';
import { CreditCard } from '../../domain/entities/CreditCard';
import { CreateCreditCardInput } from '../../domain/repositories/CreditCardRepository';
import { CreditCardRepositoryImpl } from '../../data/repositories/CreditCardRepositoryImpl';

const repository = new CreditCardRepositoryImpl();

export function useCreditCardsController() {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.list();
      setCards(data);
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

  const addCard = useCallback(
    async (input: CreateCreditCardInput) => {
      await repository.create(input);
      await load();
    },
    [load],
  );

  const totalDebt = cards.reduce((sum, c) => sum + c.balanceOwed, 0);

  return { cards, loading, error, totalDebt, addCard, reload: load };
}
