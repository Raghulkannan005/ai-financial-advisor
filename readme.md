# AI-Powered Financial Advisor

Welcome to the AI-Powered Financial Advisor project! This application is designed to help users manage their finances effectively by tracking expenses, setting financial goals, and receiving personalized financial advice.

## Aim

The aim of this project is to create a simple financial advisor app using free APIs and libraries to help users track expenses and get basic financial insights.

## Features

- **Manual Expense Tracking**: Easily add and manage your daily expenses.
- **Basic Expense Categorization**: Categorize your expenses for better insights.
- **Simple Charts and Analytics**: Visualize your spending patterns with charts.
- **Basic Financial Tips**: Receive practical financial advice based on your data.
- **Goal Setting Functionality**: Set and track your financial goals.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **APIs**: Hugging Face for financial advice
- **Libraries**: Chart.js, Axios, Framer Motion

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/yourusername/ai-financial-advisor.git
    cd ai-financial-advisor
    ```

2. **Install dependencies**:

    ```sh
    cd frontend
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the `frontend` directory and add your Hugging Face API key:

    ```env
    VITE_HUGGINGFACE_API_KEY=your_api_key_here
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

