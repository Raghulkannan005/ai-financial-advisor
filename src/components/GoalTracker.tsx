import { useState } from 'react';
import { Goal } from "../types/index";
import { calculateGoalProgress } from '../utils/calculations';
import { saveToLocalStorage } from '../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget, FiTrendingUp, FiCalendar, FiDollarSign, FiTrash2, FiEdit2 } from 'react-icons/fi';


interface GoalTrackerProps {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({
  goals = [],
  setGoals
}) => {
  const [sortBy, setSortBy] = useState('deadline');
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<string>('');

  const totalTargetAmount = goals?.reduce((sum, goal) => sum + goal.targetAmount, 0) ?? 0;
  const totalCurrentAmount = goals?.reduce((sum, goal) => sum + goal.currentAmount, 0) ?? 0;
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  const sortedGoals = [...(goals || [])].sort((a, b) => {
    if (sortBy === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    if (sortBy === 'progress') {
      return calculateGoalProgress(b) - calculateGoalProgress(a);
    }
    return 0;
  });

  const updateProgress = (goalId: string, amount: number) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, currentAmount: amount };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    saveToLocalStorage('goals', updatedGoals);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
  };

  const handleUpdateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal) return;

    const updatedGoals = goals.map(goal => 
      goal.id === editingGoal.id ? editingGoal : goal
    );
    setGoals(updatedGoals);
    saveToLocalStorage('goals', updatedGoals);
    setEditingGoal(null);
  };

  const confirmDelete = (goalId: string) => {
    setGoalToDelete(goalId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    deleteGoal(goalToDelete);
    setShowDeleteModal(false);
    setGoalToDelete('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Goals Value</p>
              <p className="text-2xl font-bold">Rs.{totalTargetAmount.toFixed(2)}</p>
            </div>
            <FiTarget className="text-3xl opacity-80" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Current Progress</p>
              <p className="text-2xl font-bold">Rs.{totalCurrentAmount.toFixed(2)}</p>
            </div>
            <FiTrendingUp className="text-3xl opacity-80" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Overall Progress</p>
              <p className="text-2xl font-bold">{overallProgress.toFixed(1)}%</p>
            </div>
            <div className="w-16 h-16">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeDasharray={`${overallProgress}, 100`}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Goals</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="deadline">Sort by Deadline</option>
            <option value="progress">Sort by Progress</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {sortedGoals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{goal.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <FiCalendar className="inline" />
                      {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="text-blue-500 hover:text-blue-700 p-1"
                      title="Edit goal"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => confirmDelete(goal.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete goal"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FiDollarSign /> Target
                    </span>
                    <span className="font-semibold">Rs.{goal.targetAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FiTrendingUp /> Current
                    </span>
                    <span className="font-semibold">Rs.{goal.currentAmount.toFixed(2)}</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{calculateGoalProgress(goal).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(calculateGoalProgress(goal), 100)}%` }}
                        className="bg-blue-600 h-2.5 rounded-full"
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      type="number"
                      defaultValue={goal.currentAmount}
                      onChange={(e) => updateProgress(goal.id, parseFloat(e.target.value))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                      placeholder="Update progress..."
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {editingGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Edit Goal</h3>
            <form onSubmit={handleUpdateGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Goal Name</label>
                <input
                  type="text"
                  value={editingGoal.name}
                  onChange={(e) => setEditingGoal({...editingGoal, name: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Amount</label>
                <input
                  type="number"
                  value={editingGoal.targetAmount}
                  onChange={(e) => setEditingGoal({...editingGoal, targetAmount: parseFloat(e.target.value)})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deadline</label>
                <input
                  type="date"
                  value={editingGoal.deadline}
                  onChange={(e) => setEditingGoal({...editingGoal, deadline: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingGoal(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full"
          >
            <h3 className="text-xl font-bold mb-4">Delete Goal</h3>
            <p className="mb-6">Are you sure you want to delete this goal?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;