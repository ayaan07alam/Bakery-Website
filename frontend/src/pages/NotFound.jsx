import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-yellow-50/30 to-white px-4 page-transition">
            <SEO title="404 - Page Not Found" description="The page you're looking for doesn't exist." />

            <div className="max-w-2xl w-full text-center animate-scale-in">
                {/* Animated Illustration */}
                <div className="mb-8 relative">
                    <div className="text-[200px] font-display font-bold text-brand-red/10 leading-none animate-pulse">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-yellow to-yellow-400 flex items-center justify-center shadow-2xl animate-float">
                            <span className="text-6xl">🧁</span>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4 animate-fade-in-up">
                    Oops! Page Not Found
                </h1>
                <p className="text-lg text-gray-600 mb-8 animate-fade-in-up delay-100">
                    Looks like this page crumbled away... But don't worry, we have plenty of other delicious options!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
                    <Link
                        to="/"
                        className="group bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-2 transform hover:-translate-y-1"
                    >
                        <Home size={20} />
                        <span>Back to Home</span>
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        to="/shop"
                        className="group bg-gradient-to-r from-brand-yellow to-yellow-400 hover:from-yellow-400 hover:to-brand-yellow text-brand-dark font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-2 transform hover:-translate-y-1"
                    >
                        <Search size={20} />
                        <span>Browse Menu</span>
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="mt-12 flex justify-center gap-4 text-4xl opacity-50 animate-fade-in delay-300">
                    <span className="animate-float" style={{ animationDelay: '0ms' }}>🍰</span>
                    <span className="animate-float" style={{ animationDelay: '100ms' }}>🥐</span>
                    <span className="animate-float" style={{ animationDelay: '200ms' }}>🍪</span>
                    <span className="animate-float" style={{ animationDelay: '300ms' }}>🎂</span>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
