import { Expense, Goal } from '../types';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-pro";

// Simple cache implementation
const adviceCache = new Map();
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes
const MAX_CACHE_SIZE = 50;

export const getFinancialAdvice = async (category: string = 'All', goals: Goal[] = [], expenses: Expense[] = []) => {
  try {
    // Validate inputs
    const safeGoals = Array.isArray(goals) ? goals : [];
    const safeExpenses = Array.isArray(expenses) ? expenses : [];
    
    // Create cache key
    const cacheKey = `${category}-${JSON.stringify(safeGoals.slice(0, 5))}-${JSON.stringify(safeExpenses.slice(0, 10))}`;
    
    // Check cache
    const cachedResult = adviceCache.get(cacheKey);
    if (cachedResult && (Date.now() - cachedResult.timestamp < CACHE_EXPIRY)) {
      return cachedResult.advice;
    }

    // Prepare data for the API
    const goalsSummary = safeGoals.length > 0
      ? safeGoals.slice(0, 5).map(goal => 
          `Goal: ${goal.name}, Current: Rs.${goal.currentAmount}, Target: Rs.${goal.targetAmount}, Deadline: ${new Date(goal.deadline).toLocaleDateString('en-IN')}`).join('; ') 
      : 'No goals set.';
    
    // Format expense data clearly
    const expensesSummary = safeExpenses.length > 0 
      ? safeExpenses.slice(0, 10).map(expense => 
          `${expense.category}: Rs.${expense.amount} on ${new Date(expense.date).toLocaleDateString('en-IN')}`).join('; ') 
      : 'No recent expenses.';

    const prompt = category === 'All' 
      ? 'general financial advice' 
      : `advice about ${category}`;

    const fullPrompt = `As a financial advisor with expertise in personal finance, give practical and actionable ${prompt}. 
Here are the current goals: ${goalsSummary}. 
Here are the recent expenses: ${expensesSummary}. 
Focus on specific advice that can help improve financial situation based on this data. 
Keep the advice concise (maximum 3-4 paragraphs), practical and specific.
Do not ask questions or request more information - work with the data you have.
Format your response in simple paragraphs without numbered lists.`;

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      generationConfig: {
        temperature: 0.2, // Lower temperature for more focused advice
        maxOutputTokens: 300,
        topP: 0.8,
        topK: 40
      }
    });

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    // Process the response to ensure quality
    const processedText = text
      .replace(/\bRs\.Value\/Value\b/g, "the amounts shown")  // Fix any remaining formatting issues
      .replace(/please provide|could you clarify|i need more information/gi, "Consider") // Replace requests for more info
      .replace(/^\d+\.\s/gm, "") // Remove numbered lists if they appear
      .trim();

    if (adviceCache.size >= MAX_CACHE_SIZE) {
      const oldestKey = Array.from(adviceCache.keys())[0];
      adviceCache.delete(oldestKey);
    }

    // Store the processed text in cache
    adviceCache.set(cacheKey, {
      advice: processedText,
      timestamp: Date.now()
    });

    return processedText;

  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    console.error('Error fetching advice from Gemini:', error);
    
    // Handle specific errors
    if (error.message?.includes('429') || error.message?.includes('rate limit')) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    throw new Error(`Failed to get financial advice: ${errorMessage}`);
  }
};