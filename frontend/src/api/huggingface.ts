import axios from 'axios';

const API_URL = 'https://api-inference.huggingface.co/models/distilgpt2';
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

export const getFinancialAdvice = async (prompt: string) => {
  try {
    const response = await axios.post(
      API_URL,
      { 
        inputs: `As a financial advisor, give advice about ${prompt}. Keep it practical and actionable.`,
        parameters: {
          max_length: 100,
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