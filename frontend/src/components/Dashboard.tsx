import React from 'react';
import Expenses from './Expenses';
import GoalTracker from './GoalTracker';
import FinancialAdvice from './FinancialAdvice';
import { useState, useEffect } from 'react';
import { Expense } from '../types';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

const Dashboard: React.FC = () => {
    
    const [expenses, setExpenses] = useState<Expense[]>([]);
    
    useEffect(() => {
        const savedExpenses = getFromLocalStorage('expenses');
        if (savedExpenses) setExpenses(savedExpenses);
    }, []);
    
    const deleteExpense = (id: string) => {
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(updatedExpenses);
        saveToLocalStorage('expenses', updatedExpenses);

    };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
      <Expenses 
        expenses={expenses}
        onDeleteExpense={deleteExpense}
      />
        <GoalTracker />
        <FinancialAdvice />
      </div>
    </div>
  );
};

export default Dashboard;