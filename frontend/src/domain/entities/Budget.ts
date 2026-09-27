export interface BudgetProgress {
  id: string;
  category: string;
  limit: number;
  month: string;
  spent: number;
  percent: number;
  status: 'ok' | 'warning' | 'over';
}
