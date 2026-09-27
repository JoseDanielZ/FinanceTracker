// Tipos de cuenta bancaria que maneja el usuario: ahorro, transaccional
// (cuenta corriente/de uso diario), o inversión con fondos en póliza.
export const ACCOUNT_TYPES = ['ahorro', 'transaccional', 'poliza'] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];
