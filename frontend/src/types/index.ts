
export interface Expense {
    id: string;
    amount: number;
    category: string;
    date: string;
    description: string;
  }
  
  export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
  }
  
  export interface FinancialAdvice {
    id: string;
    advice: string;
    category: string;
    timestamp: string;
  }