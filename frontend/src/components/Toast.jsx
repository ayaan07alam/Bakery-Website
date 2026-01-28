import React, { useState, useEffect } from 'react';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to finish
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle size={20} className="text-green-600 flex-shrink-0" />,
        error: <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
    };

    const bgColors = {
        success: 'bg-white border-l-4 border-green-500',
        error: 'bg-white border-l-4 border-red-500'
    };

    return (
        <div className={`fixed iphone-bottom right-4 z-[9999] transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
            <div className={`${bgColors[type]} shadow-ultra rounded-xl p-4 pr-12 flex items-start gap-3 min-w-[280px] max-w-md gpu-accelerate`}>
                {icons[type]}
                <p className="text-sm font-medium text-gray-800 flex-1">{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

// Toast Container Component
export const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        // Listen for custom toast events
        const handleToast = (event) => {
            const { message, type } = event.detail;
            const id = Date.now();
            setToasts(prev => [...prev, { id, message, type }]);
        };

        window.addEventListener('showToast', handleToast);
        return () => window.removeEventListener('showToast', handleToast);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <div className="fixed bottom-safe right-0 z-[9999] pointer-events-none">
            <div className="flex flex-col gap-3 p-4 pointer-events-auto">
                {toasts.map((toast, index) => (
                    <div
                        key={toast.id}
                        style={{
                            transform: `translateY(${-index * 10}px)`,
                            zIndex: 9999 - index
                        }}
                    >
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => removeToast(toast.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper function to show toast
export const showToast = (message, type = 'success') => {
    window.dispatchEvent(new CustomEvent('showToast', {
        detail: { message, type }
    }));
};

export default Toast;
