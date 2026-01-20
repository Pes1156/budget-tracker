
import React from 'react';
import { BudgetStats } from '../types';

interface DashboardProps {
  stats: BudgetStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(val);
  };

  return (
    <div className="space-y-4">
      {/* Main Balance Card - iOS Wallet Style */}
      <div className="ios-card bg-black text-white p-6 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs font-semibold opacity-60 uppercase tracking-widest">Saldo Disponibile</span>
          <div className="text-4xl font-bold mt-1 tracking-tight">
            {formatCurrency(stats.balance)}
          </div>
        </div>
        {/* Subtle background abstract shape for native feel */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
      </div>

      {/* Grid for Income/Expense */}
      <div className="grid grid-cols-2 gap-4">
        <div className="ios-card p-4 flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Entrate</span>
          <span className="text-xl font-bold text-[#34C759]">
            {formatCurrency(stats.income)}
          </span>
        </div>
        <div className="ios-card p-4 flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Uscite</span>
          <span className="text-xl font-bold text-[#FF3B30]">
            {formatCurrency(stats.expenses)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
