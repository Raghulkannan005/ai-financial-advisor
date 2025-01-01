import { Expense, Goal } from '../types';

  export const calculateTotalExpenses = (expenses: Expense[]): number => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };
  
  export const calculateGoalProgress = (goal: Goal): number => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  export const saveToLocalStorage = (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getFromLocalStorage = (key: string): any => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
 
