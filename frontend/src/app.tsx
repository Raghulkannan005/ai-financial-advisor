import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ExpenseTracker from './components/ExpenseTracker';
import FinancialAdvice from './components/FinancialAdvice';
import Home from './components/Home';
import Nav from './components/Nav';
import CreateGoal from './components/CreateGoal';
import { Goal } from './types/index';
import { saveToLocalStorage, getFromLocalStorage } from './utils/storage';

const App: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = getFromLocalStorage('goals');
    return savedGoals || [];
  });

  const handleCreateGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString()
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    saveToLocalStorage('goals', updatedGoals);
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
            <Route path="/advice" element={<FinancialAdvice goals={goals} expenses={[]} />} />
            <Route path="/goals" element={<CreateGoal onCreateGoal={handleCreateGoal} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

