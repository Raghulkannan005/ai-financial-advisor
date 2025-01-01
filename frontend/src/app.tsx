import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ExpenseTracker from './components/ExpenseTracker';
import FinancialAdvice from './components/FinancialAdvice';
import GoalTracker from './components/GoalTracker';
import Home from './components/Home';
import Nav from './components/Nav';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Nav />
                <div className="pt-16">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/expenses" element={<ExpenseTracker />} />
                    <Route path="/advice" element={<FinancialAdvice />} />
                    <Route path="/goals" element={<GoalTracker />} />
                </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;