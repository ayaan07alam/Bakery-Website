import React, { useState } from 'react';
import { Phone, X, Clock } from 'lucide-react';

const CallbackButton = ({ sessionId, currentPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [preferredTime, setPreferredTime] = useState('Morning');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8080/api/callback-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phoneNumber,
                    preferredTime,
                    visitorSessionId: sessionId,
                    pageWhenRequested: currentPage,
                    source: 'callback_button',
                    status: 'PENDING'
                })
            });

            if (response.ok) {
                setShowSuccess(true);
                setPhoneNumber('');
                setTimeout(() => {
                    setShowSuccess(false);
                    setIsOpen(false);
                }, 2500);
            }
        } catch (error) {
            console.error('Callback request failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fixed positioning styles - inline to ensure they're applied
    const buttonContainerStyle = {
        position: 'fixed',
        bottom: '168px',
        right: '20px',
        zIndex: 9999
    };

    return (
        <div style={buttonContainerStyle}>
            {!isOpen ? (
                // Main Button
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
                    aria-label="Request a callback"
                >
                    <Phone size={20} />
                    <span className="font-semibold">Request a Call</span>
                </button>
            ) : (
                // Form Popup
                <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <Phone size={20} />
                            <h3 className="font-bold text-lg">Request Callback</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {showSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-gray-700 font-medium">We'll call you soon!</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your number"
                                    pattern="[0-9]{10}"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Clock size={16} className="inline mr-1" />
                                    Preferred Time
                                </label>
                                <select
                                    value={preferredTime}
                                    onChange={(e) => setPreferredTime(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                >
                                    <option value="Morning">Morning (9AM - 12PM)</option>
                                    <option value="Afternoon">Afternoon (12PM - 4PM)</option>
                                    <option value="Evening">Evening (4PM - 8PM)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Call Me Back'}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default CallbackButton;
