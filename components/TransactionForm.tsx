
import React, { useState } from 'react';
import { TransactionType } from '../types.ts';

interface TransactionFormProps {
  onAdd: (description: string, amount: number, type: TransactionType) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('EXPENSE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || parseFloat(amount) <= 0) return;

    onAdd(description, parseFloat(amount), type);
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrizione"
            className="w-full py-2 bg-transparent border-b border-gray-100 focus:border-[#007AFF] outline-none transition-colors text-lg"
            required
          />
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Importo €"
            className="w-full py-2 bg-transparent border-b border-gray-100 focus:border-[#007AFF] outline-none transition-colors text-lg font-medium"
            required
          />
        </div>
      </div>

      <div className="flex bg-[#F2F2F7] p-1 rounded-lg">
        <button
          type="button"
          onClick={() => setType('INCOME')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
            type === 'INCOME' 
            ? 'bg-white text-[#34C759] shadow-sm' 
            : 'text-gray-400'
          }`}
        >
          ENTRATA
        </button>
        <button
          type="button"
          onClick={() => setType('EXPENSE')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
            type === 'EXPENSE' 
            ? 'bg-white text-[#FF3B30] shadow-sm' 
            : 'text-gray-400'
          }`}
        >
          USCITA
        </button>
      </div>

      <button
        type="submit"
        className="w-full ios-btn bg-[#007AFF] text-white"
      >
        Salva Transazione
      </button>
    </form>
  );
};

export default TransactionForm;
