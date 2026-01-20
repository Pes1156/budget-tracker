
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: number;
}

export interface BudgetStats {
  balance: number;
  income: number;
  expenses: number;
}
