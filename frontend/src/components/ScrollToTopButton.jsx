import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-6 right-5 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="bg-gradient-to-br from-brand-yellow to-yellow-500 text-brand-dark rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-yellow-500/50 border border-white/20 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-fade-in group"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={28} className="group-hover:animate-bounce" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
