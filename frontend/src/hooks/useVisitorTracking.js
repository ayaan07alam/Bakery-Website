import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:8080/api/visitor-sessions';

export const useVisitorTracking = () => {
    const [sessionId, setSessionId] = useState(null);
    const [sessionData, setSessionData] = useState({
        pagesViewed: [],
        productsViewed: [],
        timeOnSite: 0,
        deviceInfo: '',
        referralSource: '',
        ipAddress: '',
    });

    // Initialize session on first load
    useEffect(() => {
        let existingSessionId = localStorage.getItem('visitor_session_id');

        if (!existingSessionId) {
            existingSessionId = uuidv4();
            localStorage.setItem('visitor_session_id', existingSessionId);
        }

        setSessionId(existingSessionId);

        // Collect device info
        const deviceInfo = `${navigator.userAgent} | ${navigator.platform}`;
        const referralSource = document.referrer || 'direct';

        setSessionData(prev => ({
            ...prev,
            deviceInfo,
            referralSource,
        }));
    }, []);

    // Track time on site
    useEffect(() => {
        const startTime = Date.now();

        const interval = setInterval(() => {
            const currentTime = Math.floor((Date.now() - startTime) / 1000);
            setSessionData(prev => ({
                ...prev,
                timeOnSite: prev.timeOnSite + 30, // Update every 30 seconds
            }));
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    // Track page views
    const trackPageView = useCallback((pagePath) => {
        setSessionData(prev => {
            const updatedPages = [...prev.pagesViewed, {
                path: pagePath,
                timestamp: new Date().toISOString(),
            }];
            return {
                ...prev,
                pagesViewed: updatedPages,
            };
        });
    }, []);

    // Track product views
    const trackProductView = useCallback((productId, productName) => {
        setSessionData(prev => {
            const updatedProducts = [...prev.productsViewed, {
                id: productId,
                name: productName,
                timestamp: new Date().toISOString(),
            }];
            return {
                ...prev,
                productsViewed: updatedProducts,
            };
        });
    }, []);

    // Send session data to backend
    const sendSessionData = useCallback(async () => {
        if (!sessionId) return;

        try {
            const payload = {
                sessionId,
                pagesViewed: JSON.stringify(sessionData.pagesViewed),
                productsViewed: JSON.stringify(sessionData.productsViewed),
                timeOnSite: sessionData.timeOnSite,
                deviceInfo: sessionData.deviceInfo,
                referralSource: sessionData.referralSource,
            };

            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            console.error('Failed to send session data:', error);
        }
    }, [sessionId, sessionData]);

    // Send data periodically
    useEffect(() => {
        if (!sessionId) return;

        // Send immediately on init
        sendSessionData();

        // Send every 30 seconds
        const interval = setInterval(sendSessionData, 30000);

        // Send on page unload
        const handleBeforeUnload = () => {
            sendSessionData();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearInterval(interval);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [sessionId, sendSessionData]);

    return {
        sessionId,
        trackPageView,
        trackProductView,
        sessionData,
    };
};
