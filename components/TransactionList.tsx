
import React from 'react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(val);
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-medium">Nessuna transazione</p>
      </div>
    );
  }

  return (
    <div className="ios-card overflow-hidden">
      {transactions.map((t, index) => (
        <div key={t.id}>
          <div className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'INCOME' ? 'bg-[#34C75915] text-[#34C759]' : 'bg-[#FF3B3015] text-[#FF3B30]'}`}>
                {t.type === 'INCOME' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">{t.description}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {new Date(t.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-sm font-bold ${t.type === 'INCOME' ? 'text-[#34C759]' : 'text-black'}`}>
                {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
              </span>
              
              <button
                onClick={() => onDelete(t.id)}
                className="w-7 h-7 flex items-center justify-center text-gray-300 active:text-[#FF3B30]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          {index < transactions.length - 1 && (
            <div className="ml-16 border-b border-gray-100"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
