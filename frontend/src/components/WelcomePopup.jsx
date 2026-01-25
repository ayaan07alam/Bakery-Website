import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import axios from 'axios';

const WelcomePopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Check if user has seen this popup
        const hasSeenWelcomePopup = sessionStorage.getItem('hasSeenWelcomePopup');
        if (hasSeenWelcomePopup) return;

        // Show after 30 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
            sessionStorage.setItem('hasSeenWelcomePopup', 'true');
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('http://localhost:8080/api/newsletter/subscribe', { email });
            setSuccess(true);
            setTimeout(() => setIsVisible(false), 2000);
        } catch (error) {
            alert('Failed to subscribe.');
        } finally {
            setLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setIsVisible(false)}
        >
            <div
                className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transform animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                    <X size={24} className="text-gray-600" />
                </button>

                {/* Header */}
                <div className="relative p-10 bg-gradient-to-br from-brand-yellow via-yellow-400 to-orange-400 text-brand-dark text-center">
                    <div className="flex justify-center mb-4">
                        <Sparkles size={56} className="text-white drop-shadow-lg" />
                    </div>
                    <h2 className="text-4xl font-logo mb-3">Welcome to Saha Bakery! 🍰</h2>
                    <p className="text-lg text-gray-800">Join our family & get exclusive weekly deals</p>
                </div>

                <div className="p-8">
                    {success ? (
                        <div className="text-center py-6">
                            <div className="text-green-600 text-6xl mb-4">✓</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Aboard!</h3>
                            <p className="text-gray-600">You'll receive our weekly specials newsletter</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="text-2xl">🎂</div>
                                    <p className="text-gray-700">Exclusive discounts on custom cakes</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-2xl">🍞</div>
                                    <p className="text-gray-700">Early access to new products</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-2xl">📧</div>
                                    <p className="text-gray-700">Weekly recipes & baking tips</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all text-lg"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-brand hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Subscribing...' : 'Get Exclusive Deals'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(false)}
                                    className="w-full text-gray-500 hover:text-gray-700 text-sm"
                                >
                                    No thanks, I'll pay full price
                                </button>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm text-center text-gray-700">
                                        <span className="font-semibold">💼 Looking for Franchise Opportunities?</span><br />
                                        <a href="/contact" className="text-purple-600 hover:text-purple-800 underline">
                                            Inquire about partnerships
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WelcomePopup;
