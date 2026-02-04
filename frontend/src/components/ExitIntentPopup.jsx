import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import axios from 'axios';

const ExitIntentPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Check if user has seen this popup
        const hasSeenExitPopup = sessionStorage.getItem('hasSeenExitPopup');
        if (hasSeenExitPopup) return;

        // Track if user has scrolled or interacted (wait 5 seconds)
        let hasInteracted = false;
        const timer = setTimeout(() => { hasInteracted = true; }, 5000);

        const handleBeforeUnload = (e) => {
            if (hasInteracted && !sessionStorage.getItem('hasSeenExitPopup')) {
                // Show popup by setting state
                setIsVisible(true);
                sessionStorage.setItem('hasSeenExitPopup', 'true');

                // Prevent the browser's default dialog
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

        try {
            await axios.post(`${API_URL}/newsletter/subscribe`, { email });
            setSuccess(true);
            setTimeout(() => setIsVisible(false), 2000);
        } catch {
            console.error('Failed to post callback request');
        } finally {
            setLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl transform animate-slideUp">
                {/* Close Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                    <X size={24} className="text-gray-600" />
                </button>

                {/* Content */}
                <div className="relative p-8 bg-gradient-to-br from-brand-red via-red-500 to-brand-yellow text-white">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                            <Gift size={48} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-display text-center mb-2">Wait! Don't Leave Yet! 🎉</h2>
                    <p className="text-center text-white/90 text-lg">Get 10% OFF your first order!</p>
                </div>

                <div className="p-8">
                    {success ? (
                        <div className="text-center">
                            <div className="text-green-600 text-5xl mb-3">✓</div>
                            <h3 className="text-xl font-bold text-gray-800">You're In!</h3>
                            <p className="text-gray-600">Check your email for the discount code</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-brand hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                            >
                                <span>{loading ? 'Claiming...' : 'Claim My 10% Discount'}</span>
                            </button>
                            <p className="text-xs text-gray-500 text-center">We respect your privacy. Unsubscribe anytime.</p>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-sm text-center text-gray-700">
                                    🏢 <span className="font-semibold">Interested in Franchise Ownership?</span><br />
                                    <a href="/contact" className="text-brand-red hover:text-brand-dark underline">
                                        Contact us for franchise opportunities
                                    </a>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExitIntentPopup;
