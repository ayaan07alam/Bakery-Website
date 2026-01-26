import React, { useState, useEffect } from 'react';
import { X, Phone, Gift } from 'lucide-react';
import './PhoneCollectorModal.css';

const API_URL = 'http://localhost:8080/api/callback-requests';

const PhoneCollectorModal = ({ sessionId, currentPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        name: '',
        whatsappOptIn: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Check if already shown
        const hasShown = sessionStorage.getItem('phone_modal_shown');
        if (hasShown) return;

        // Show after 30 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
            sessionStorage.setItem('phone_modal_shown', 'true');
        }, 30000);

        // Show on exit intent
        const handleMouseLeave = (e) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsOpen(true);
                sessionStorage.setItem('phone_modal_shown', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                phoneNumber: formData.phoneNumber,
                name: formData.name,
                whatsappOptIn: formData.whatsappOptIn,
                visitorSessionId: sessionId,
                pageWhenRequested: currentPage,
                source: 'phone_modal',
                status: 'PENDING',
            };

            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            setSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="phone-modal-overlay">
            <div className="phone-modal-container">
                <button className="phone-modal-close" onClick={() => setIsOpen(false)}>
                    <X size={24} />
                </button>

                {!submitted ? (
                    <>
                        <div className="phone-modal-icon">
                            <Gift size={48} className="gift-icon" />
                        </div>

                        <h2 className="phone-modal-title">Get 10% OFF Your First Order!</h2>
                        <p className="phone-modal-subtitle">
                            Enter your phone number and we'll send you an exclusive discount code
                        </p>

                        <form onSubmit={handleSubmit} className="phone-modal-form">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="phone-modal-input"
                            />

                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                required
                                pattern="[0-9]{10}"
                                className="phone-modal-input"
                            />

                            <label className="phone-modal-checkbox">
                                <input
                                    type="checkbox"
                                    checked={formData.whatsappOptIn}
                                    onChange={(e) => setFormData({ ...formData, whatsappOptIn: e.target.checked })}
                                />
                                <span>Send me updates on WhatsApp</span>
                            </label>

                            <button type="submit" disabled={isSubmitting} className="phone-modal-submit">
                                {isSubmitting ? 'Sending...' : 'Get My Discount'}
                            </button>
                        </form>

                        <p className="phone-modal-privacy">
                            We respect your privacy. Unsubscribe anytime.
                        </p>
                    </>
                ) : (
                    <div className="phone-modal-success">
                        <div className="success-checkmark">✓</div>
                        <h2>Thank You!</h2>
                        <p>We'll contact you shortly with your exclusive discount code!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhoneCollectorModal;
