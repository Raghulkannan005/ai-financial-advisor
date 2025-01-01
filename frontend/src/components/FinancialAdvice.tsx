import React, { useState, useEffect } from 'react';
import { getFinancialAdvice } from '../api/huggingface';
import { FinancialAdvice as FinancialAdviceType } from '../types';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

const FinancialAdvice: React.FC = () => {
  const [advice, setAdvice] = useState<FinancialAdviceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const savedAdvice = getFromLocalStorage('financial-advice');
    if (savedAdvice) setAdvice(savedAdvice);
  }, []);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const generatedAdvice = await getFinancialAdvice(selectedCategory);
      
      const newAdvice: FinancialAdviceType = {
        id: Date.now().toString(),
        advice: generatedAdvice,
        category: selectedCategory,
        timestamp: new Date().toISOString(),
      };
      
      const updatedAdvice = [...advice, newAdvice];
      setAdvice(updatedAdvice);
      saveToLocalStorage('financial-advice', updatedAdvice);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch advice');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setAdvice([]);
    saveToLocalStorage('financial-advice', []);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Financial Advice</h2>
      
      <div className="mb-4 flex gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Topics</option>
          <option value="Saving">Saving</option>
          <option value="Investing">Investing</option>
          <option value="Budgeting">Budgeting</option>
          <option value="Debt">Debt Management</option>
        </select>
        
        <button 
          onClick={fetchAdvice}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Getting Advice...' : 'Get Advice'}
        </button>

        <button 
          onClick={clearHistory}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear History
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4 flex flex-col-reverse">
        {advice.map((item) => (
          <div key={item.id} className="p-4 border rounded bg-gray-50">
            <p className="font-medium mb-2">{item.advice}</p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{item.category}</span>
              <span>{new Date(item.timestamp).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialAdvice;