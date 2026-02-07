import React, { useState } from 'react';
import { Phone, Clock, X } from 'lucide-react';
import './QuickCallbackWidget.css';

const API_URL = 'http://localhost:8080/api/callback-requests';

const QuickCallbackWidget = ({ sessionId, currentPage }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        preferredTime: 'Morning',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                phoneNumber: formData.phoneNumber,
                preferredTime: formData.preferredTime,
                visitorSessionId: sessionId,
                pageWhenRequested: currentPage,
                source: 'callback_widget',
                status: 'PENDING',
            };

            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            setSubmitted(true);
            setTimeout(() => {
                setIsExpanded(false);
                setSubmitted(false);
                setFormData({ phoneNumber: '', preferredTime: 'Morning' });
            }, 3000);
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="callback-widget"
            style={{
                position: 'fixed',
                bottom: '168px',
                right: '20px',
                zIndex: 9999
            }}
        >
            {!isExpanded ? (
                <button
                    className="callback-button"
                    onClick={() => setIsExpanded(true)}
                    aria-label="Request a Callback"
                >
                    <Phone size={24} />
                    <span>Request a Call</span>
                </button>
            ) : (
                <div className="callback-form-container">
                    <button
                        className="callback-close"
                        onClick={() => setIsExpanded(false)}
                    >
                        <X size={20} />
                    </button>

                    {!submitted ? (
                        <>
                            <h3 className="callback-title">
                                <Phone size={20} />
                                Request a Callback
                            </h3>

                            <form onSubmit={handleSubmit} className="callback-form">
                                <input
                                    type="tel"
                                    placeholder="Your Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    required
                                    pattern="[0-9]{10}"
                                    className="callback-input"
                                />

                                <div className="callback-time-selector">
                                    <Clock size={16} />
                                    <select
                                        value={formData.preferredTime}
                                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                        className="callback-select"
                                    >
                                        <option value="Morning">Morning (9AM - 12PM)</option>
                                        <option value="Afternoon">Afternoon (12PM - 4PM)</option>
                                        <option value="Evening">Evening (4PM - 8PM)</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="callback-submit"
                                >
                                    {isSubmitting ? 'Sending...' : 'Call Me Back'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="callback-success">
                            <div className="success-icon">✓</div>
                            <p>We'll call you soon!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuickCallbackWidget;
