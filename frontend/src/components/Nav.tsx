import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiMenu, FiX } from 'react-icons/fi';

const Nav: React.FC = () => {

    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

return (
<nav className="bg-white shadow-md fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <FiTrendingUp className="h-8 w-8 text-blue-600" />
                                <span className="ml-2 text-xl font-bold text-gray-900">WealthWise</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/expenses" className="text-gray-600 hover:text-blue-600">Expenses</Link>
                            <Link to="/goals" className="text-gray-600 hover:text-blue-600">Goals</Link>
                            <Link to="/advice" className="text-gray-600 hover:text-blue-600">Advice</Link>
                            <Link to="/dashboard" 
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Dashboard
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-600 hover:text-blue-600">
                                {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link to="/dashboard" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">
                                Dashboard
                            </Link>
                            <Link to="/goals" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">
                                Goals
                            </Link>
                            <Link to="/expenses" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">
                                Expenses
                            </Link>
                            <Link to="/advice" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">
                                Advice
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

    )}

export default Nav;