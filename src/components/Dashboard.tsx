import React, { useState, useEffect } from 'react';
import Expenses from './Expenses';
import GoalTracker from './GoalTracker';
import FinancialAdvice from './FinancialAdvice';
import { Goal, Expense } from '../types';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const savedExpenses = getFromLocalStorage('expenses');
    if (savedExpenses) setExpenses(savedExpenses);

    const savedGoals = getFromLocalStorage('goals');
    if (savedGoals) setGoals(savedGoals);
  }, []);

  const handleUpdateGoals = (newGoals: Goal[]) => {
    setGoals(newGoals);
    saveToLocalStorage('goals', newGoals);
  };
  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveToLocalStorage('expenses', updatedExpenses);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Financial Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Expenses</h2>
            <Expenses expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Goals</h2>
            <GoalTracker
          goals={goals}
          setGoals={handleUpdateGoals}
        />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Financial Advice</h2>
          <FinancialAdvice goals={goals} expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;