import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ExpenseTracker from './components/ExpenseTracker';
import FinancialAdvice from './components/FinancialAdvice';
import Home from './components/Home';
import Nav from './components/Nav';
import CreateGoal from './components/CreateGoal';
import { Expense, Goal } from './types';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  const handleCreateGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = { ...goal, id: Date.now().toString() };
    setGoals([...goals, newGoal]);
  };

  return (
    <Router>
      <div>
        <Nav />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpenseTracker />} />
            <Route path="/advice" element={<FinancialAdvice goals={goals} expenses={expenses} />} />
            <Route path="/goals" element={<CreateGoal onCreateGoal={handleCreateGoal} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;