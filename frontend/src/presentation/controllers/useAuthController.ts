import { useCallback, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

// Controller de la pantalla de Bienvenida: sabe CÓMO autenticar
// (Face ID / Touch ID vía expo-local-authentication) pero no sabe
// nada de cómo se ve la pantalla — eso es responsabilidad de la View.
export function useAuthController(onSuccess: () => void) {
  const [error, setError] = useState<string | null>(null);

  const authenticateWithBiometrics = useCallback(async () => {
    setError(null);
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !isEnrolled) {
      setError('Face ID no está configurado en este dispositivo.');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Ingresa a FinanceTracker',
    });
    if (result.success) onSuccess();
    else setError('No se pudo verificar tu identidad.');
  }, [onSuccess]);

  return { authenticateWithBiometrics, error };
}
