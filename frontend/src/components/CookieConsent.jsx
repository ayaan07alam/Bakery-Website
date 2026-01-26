import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setTimeout(() => setIsVisible(true), 2000);
        }
    }, []);

    const handleAcceptAll = () => {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('cookie_consent', JSON.stringify(consent));
        setIsVisible(false);
    };

    const handleAcceptSelected = () => {
        const consent = {
            ...preferences,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('cookie_consent', JSON.stringify(consent));
        setIsVisible(false);
    };

    const handleReject = () => {
        const consent = {
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('cookie_consent', JSON.stringify(consent));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-overlay">
            <div className="cookie-consent-container">
                <button className="cookie-close" onClick={handleReject}>
                    <X size={20} />
                </button>

                <div className="cookie-header">
                    <Cookie size={32} className="cookie-icon" />
                    <h3>We Value Your Privacy</h3>
                </div>

                <p className="cookie-description">
                    We use cookies to enhance your browsing experience, track visitor behavior,
                    and improve our services. You can customize your preferences below.
                </p>

                {showDetails && (
                    <div className="cookie-details">
                        <div className="cookie-option">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={preferences.necessary}
                                    disabled
                                />
                                <div>
                                    <strong>Necessary Cookies (Required)</strong>
                                    <p>Essential for the website to function properly. Cannot be disabled.</p>
                                </div>
                            </label>
                        </div>

                        <div className="cookie-option">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={preferences.analytics}
                                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                />
                                <div>
                                    <strong>Analytics Cookies</strong>
                                    <p>Help us understand how visitors interact with our website.</p>
                                </div>
                            </label>
                        </div>

                        <div className="cookie-option">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={preferences.marketing}
                                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                />
                                <div>
                                    <strong>Marketing Cookies</strong>
                                    <p>Used to track visitor behavior and show personalized content.</p>
                                </div>
                            </label>
                        </div>
                    </div>
                )}

                <div className="cookie-actions">
                    {!showDetails ? (
                        <>
                            <button onClick={() => setShowDetails(true)} className="cookie-btn-secondary">
                                Customize
                            </button>
                            <button onClick={handleAcceptAll} className="cookie-btn-primary">
                                Accept All
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleReject} className="cookie-btn-secondary">
                                Reject Optional
                            </button>
                            <button onClick={handleAcceptSelected} className="cookie-btn-primary">
                                Save Preferences
                            </button>
                        </>
                    )}
                </div>

                <p className="cookie-privacy-link">
                    Read our <a href="/privacy-policy">Privacy Policy</a> for more information.
                </p>
            </div>
        </div>
    );
};

export default CookieConsent;
