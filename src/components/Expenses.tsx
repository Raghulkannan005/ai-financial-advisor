import React, { useState, useMemo } from 'react';
import { Expense } from '../types';
import { Bar } from 'react-chartjs-2';
import { FiSearch, FiCalendar, FiFilter, FiTrendingUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ExpensesProps {
  expenses: Expense[];
  onDeleteExpense?: (id: string) => void;
}

const Expenses: React.FC<ExpensesProps> = ({ expenses, onDeleteExpense }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const filteredAndSortedExpenses = useMemo(() => {
    return expenses
      .filter(expense => {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === 'amount') return b.amount - a.amount;
        return 0;
      });
  }, [expenses, searchTerm, selectedCategory, sortBy]);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {Object.keys(expensesByCategory).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Expenses</p>
              <p className="text-2xl font-bold">Rs.{totalExpenses.toFixed(2)}</p>
            </div>
            <FiTrendingUp className="text-3xl opacity-80" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Categories</p>
              <p className="text-2xl font-bold">{Object.keys(expensesByCategory).length}</p>
            </div>
            <FiFilter className="text-3xl opacity-80" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">This Month</p>
              <p className="text-2xl font-bold">
                Rs.{expenses
                  .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
                  .reduce((sum, e) => sum + e.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <FiCalendar className="text-3xl opacity-80" />
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Expense Distribution</h3>
        <div className="h-[300px]">
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          <AnimatePresence>
            {filteredAndSortedExpenses.map((expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg border transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{expense.description}</span>
                    <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      {expense.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(expense.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg">Rs.{expense.amount.toFixed(2)}</span>
                  {onDeleteExpense && (
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <motion.svg
                        whileHover={{ scale: 1.1 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </motion.svg>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Expenses;