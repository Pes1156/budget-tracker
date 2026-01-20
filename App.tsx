
import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, BudgetStats } from './types';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('budget_data_ios');
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse stored transactions", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('budget_data_ios', JSON.stringify(transactions));
  }, [transactions]);

  const stats = useMemo<BudgetStats>(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.type === 'INCOME') {
        acc.income += curr.amount;
        acc.balance += curr.amount;
      } else {
        acc.expenses += curr.amount;
        acc.balance -= curr.amount;
      }
      return acc;
    }, { balance: 0, income: 0, expenses: 0 });
  }, [transactions]);

  const addTransaction = (description: string, amount: number, type: 'INCOME' | 'EXPENSE') => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      description,
      amount,
      type,
      date: Date.now(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen px-5 pb-10">
      <header className="py-6 mb-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Wallet</h1>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Riepilogo Finanziario</p>
      </header>

      <Dashboard stats={stats} />

      <main className="mt-8 space-y-8">
        <section>
          <h2 className="text-lg font-bold text-gray-400 uppercase tracking-widest text-[11px] mb-3 ml-1">Nuova Operazione</h2>
          <div className="ios-card p-4">
            <TransactionForm onAdd={addTransaction} />
          </div>
        </section>

        <section className="flex flex-col flex-1">
          <h2 className="text-lg font-bold text-gray-400 uppercase tracking-widest text-[11px] mb-3 ml-1">Attività Recente</h2>
          <TransactionList 
            transactions={transactions} 
            onDelete={deleteTransaction} 
          />
        </section>
      </main>
    </div>
  );
};

export default App;
