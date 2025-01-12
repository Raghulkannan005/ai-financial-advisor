import axios from 'axios';
import { Expense, Goal } from '../types';

const API_URL = 'https://api-inference.huggingface.co/models/gpt2';
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

export const getFinancialAdvice = async (prompt: string, goals: Goal[] = [], expenses: Expense[] = []) => {
  try {
    const goalsSummary = goals.length > 0 ? goals.map(goal => `${goal.name}: Rs.${goal.currentAmount}/${goal.targetAmount} by ${goal.deadline}`).join('; ') : 'No goals set.';
    const expensesSummary = expenses.length > 0 ? expenses.map(expense => `${expense.category}: Rs.${expense.amount} on ${expense.date}`).join('; ') : 'No recent expenses.';

    const fullPrompt = `As a financial advisor, give advice about ${prompt}. Here are the current goals: ${goalsSummary}. Here are the recent expenses: ${expensesSummary}. Keep it practical and actionable.`;

    const response = await axios.post(
      API_URL,
      { 
        inputs: fullPrompt,
        parameters: {
          max_length: 150,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data[0].generated_text;
  } catch (error) {
    console.error('Error fetching advice:', error);
    throw error;
  }
};