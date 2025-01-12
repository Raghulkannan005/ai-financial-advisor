
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiTarget, FiDollarSign, FiCheck, FiUser } from 'react-icons/fi';

const Home: React.FC = () => {
   
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}

            {/* Hero Section */}
            <div className="pt-16">
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                            <div className="mb-12 lg:mb-0">
                                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                                    Master Your Finances with AI
                                </h1>
                                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                                    Smart expense tracking, personalized financial advice, and goal setting tools 
                                    powered by artificial intelligence.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/dashboard" 
                                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent 
                                        text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                                    >
                                        Get Started
                                    </Link>
                                    <a href="#features" 
                                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent 
                                        text-base font-medium rounded-md text-white bg-blue-500 bg-opacity-60 hover:bg-opacity-70 
                                        md:py-4 md:text-lg md:px-10"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                            <div className="relative">
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600">1K+</div>
                                <div className="mt-2 text-gray-600">Financial Goals Set</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600">24/7</div>
                                <div className="mt-2 text-gray-600">AI Support</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div id="features" className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Everything you need to manage your finances
                            </h2>
                            <p className="mt-4 text-xl text-gray-600">
                                Powerful features to help you track, save, and grow your wealth
                            </p>
                        </div>

                        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <div key={index} className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="text-blue-600 mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="col-span-2">
                                <div className="flex items-center mb-4">
                                    <FiTrendingUp className="h-8 w-8 text-blue-500" />
                                    <span className="ml-2 text-xl font-bold">WealthWise</span>
                                </div>
                                <p className="text-gray-400">
                                    Your AI-powered financial companion. Making wealth management 
                                    simple and accessible for everyone.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><Link to="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                                    <li><Link to="/goals" className="text-gray-400 hover:text-white">Goals</Link></li>
                                    <li><Link to="/expenses" className="text-gray-400 hover:text-white">Expenses</Link></li>
                                    <li><Link to="/advice" className="text-gray-400 hover:text-white">Advice</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>raghulkannan005@gmail.com.com</li>
                                    <li>9677605417</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                            <p>&copy; 2025 WealthWise. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

const features = [
    {
        icon: <FiDollarSign className="h-8 w-8" />,
        title: "Expense Tracking",
        description: "Track and categorize your expenses automatically. Get insights into your spending habits."
    },
    {
        icon: <FiTarget className="h-8 w-8" />,
        title: "Goal Setting",
        description: "Set financial goals and track your progress. Stay motivated with visual progress tracking."
    },
    {
        icon: <FiTrendingUp className="h-8 w-8" />,
        title: "AI-Powered Advice",
        description: "Get personalized financial advice based on your spending patterns and goals."
    },
    {
        icon: <FiCheck className="h-8 w-8" />,
        title: "Budget Planning",
        description: "Create and manage budgets easily. Get alerts when you're close to your limits."
    },
    {
        icon: <FiUser className="h-8 w-8" />,
        title: "Personalized Dashboard",
        description: "View all your financial information in one place with a customizable dashboard."
    },
    {
        icon: <FiTrendingUp className="h-8 w-8" />,
        title: "Investment Tracking",
        description: "Track your investments and get AI-powered investment suggestions."
    }
];

export default Home;