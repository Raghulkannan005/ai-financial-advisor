import React, { useState, useEffect } from 'react';

import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';
import Expenses from './Expenses';

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    amount: 0,
    category: '',
    description: '',
  });

  useEffect(() => {
    const savedExpenses = getFromLocalStorage('expenses');
    if (savedExpenses) setExpenses(savedExpenses);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expense: Expense = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...newExpense,
    };
    setExpenses([...expenses, expense]);
    saveToLocalStorage('expenses', [...expenses, expense]);
    setNewExpense({ amount: 0, category: '', description: '' });
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveToLocalStorage('expenses', updatedExpenses);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>

      <Expenses 
        expenses={expenses}
        onDeleteExpense={deleteExpense}
      />
    </div>
  );
};

export default ExpenseTracker;