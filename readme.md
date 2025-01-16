# AI-Powered Financial Advisor

Welcome to the AI-Powered Financial Advisor project! This application is designed to help users manage their finances effectively by tracking expenses, setting financial goals, and receiving personalized financial advice.

## Table of Contents

1. [Aim](#aim)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Configuration](#environment-configuration)
5. [Usage](#usage)
6. [Future Enhancements](#future-enhancements)
7. [Conclusion](#conclusion)
8. [Appendix](#appendix)

## Aim

The aim of this project is to democratize access to financial advisory services through an intuitive, AI-driven platform. Our application addresses the growing need for accessible financial management tools while incorporating sophisticated analysis capabilities previously available only through traditional financial advisors.

## Features

- **Manual Expense Tracking**: Easily add and manage your daily expenses.
- **Expense Categorization**: Categorize your expenses for better insights.
- **Charts and Analytics**: Visualize your spending patterns with charts.
- **Personalized Financial Advice**: Receive practical financial advice based on your data.
- **Goal Setting Functionality**: Set and track your financial goals.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **APIs**: Hugging Face for financial advice
- **Libraries**: Chart.js, Axios, Framer Motion

## Getting Started

### Prerequisites

- Node.js (v14 or higher) and npm installed on your machine.
- Modern web browser.

### Installation

1. **Clone the repository**:

     ```sh
     git clone https://github.com/Raghulkannan005/ai-financial-advisor
     cd ai-financial-advisor
     ```

2. **Install dependencies**:

     ```sh
     npm install
     ```

### Environment Configuration

Create a `.env` file in the root directory and add your Hugging Face API key:

```env
VITE_HUGGINGFACE_API_KEY=your_api_key_here
VITE_API_URL=https://api-inference.huggingface.co/models/your-model
```

4. **Start the development server**:

     ```sh
     npm run dev
     ```

## Usage

1. **Track Expenses**:
     - Navigate to the "Expenses" page.
     - Add new expenses by filling out the form.
     - View and manage your expenses in the list.

2. **Set Financial Goals**:
     - Navigate to the "Goals" page.
     - Create new financial goals and track your progress.
     - Update or delete goals as needed.

3. **Get Financial Advice**:
     - Navigate to the "Advice" page.
     - Select a category and get personalized financial advice based on your expenses and goals.

4. **Dashboard**:
     - View a summary of your financial data on the dashboard.
     - See charts and analytics for a better understanding of your finances.

## Future Enhancements

We have identified several potential areas for future development:
1. Integration with banking APIs for real-time transaction tracking.
2. Advanced portfolio management capabilities.
3. Machine learning-powered expense predictions.
4. Enhanced visualization tools for financial analysis.
5. Mobile application development.

## Conclusion

The AI-Powered Financial Advisor represents a significant step forward in personal finance management. By combining modern technology with traditional financial principles, our application provides users with a powerful tool for achieving their financial goals. The modular architecture and extensive documentation ensure that the project can be maintained and expanded to meet future needs.

## Appendix

### Project Structure

```plaintext
ai-financial-advisor/
├── src/
│   ├── api/
│   ├── components/
│   ├── utils/
│   ├── types/
│   └── main.tsx
├── public/
├── .env
└── package.json
```
