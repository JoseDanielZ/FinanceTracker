export const ACCOUNT_TYPES = ['ahorro', 'transaccional', 'poliza'] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  ahorro: 'Ahorro',
  transaccional: 'Transaccional',
  poliza: 'Inversión / Póliza',
};
