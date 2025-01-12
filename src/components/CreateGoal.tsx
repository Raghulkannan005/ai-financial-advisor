import { useState } from 'react';
import { Goal } from '../types/index';
import { FiTarget } from 'react-icons/fi';
import { motion } from 'framer-motion';
import GoalTracker from './GoalTracker';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const CreateGoal: React.FC<CreateGoalProps> = ({ onCreateGoal }) => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = getFromLocalStorage('goals');
    return savedGoals || [];
  });
  
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    category: 'savings'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateGoal(newGoal);
    
    // Create new goal with ID
    const goalWithId = {
      ...newGoal,
      id: Date.now().toString()
    };
    
    // Update local state
    const updatedGoals = [...goals, goalWithId];
    setGoals(updatedGoals);
    saveToLocalStorage('goals', updatedGoals);
    
    // Reset form
    setNewGoal({ name: '', targetAmount: 0, currentAmount: 0, deadline: '', category: 'savings' });
  };
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FiTarget className="mr-2" /> Add New Goal
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Goal Name</label>
          <input
            type="text"
            value={newGoal.name}
            onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder='goal'
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Target Amount (Rs.)</label>
          <input
            type="number"
            value={newGoal.targetAmount}
            onChange={(e) => setNewGoal({...newGoal, targetAmount: parseFloat(e.target.value)})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder='0'
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Current Amount (Rs.)</label>
          <input
            type="number"
            value={newGoal.currentAmount}
            onChange={(e) => setNewGoal({...newGoal, currentAmount: parseFloat(e.target.value)})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Target Date</label>
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder='dd/mm/yyyy'
          />
        </div>
        
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 
            transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FiTarget /> Create Goal
          </button>
        </div>
      </form>
    </motion.div>
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GoalTracker goals={goals} setGoals={setGoals} />
      </motion.div>
    </div>
  );
};
export default CreateGoal;