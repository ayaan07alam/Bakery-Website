import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const outlineRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Use refs for position to avoid re-renders on every mouse move
    const cursorPos = useRef({ x: 0, y: 0 });
    const outlinePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e) => {
            setIsVisible(true);
            cursorPos.current = { x: e.clientX, y: e.clientY };

            // Move dot immediately
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
        };

        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);

        const onHoverStart = () => document.body.classList.add('hovering');
        const onHoverEnd = () => document.body.classList.remove('hovering');

        // Add event listeners
        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseenter', onMouseEnter);
        document.body.addEventListener('mouseleave', onMouseLeave);

        const onMouseOver = (e) => {
            const target = e.target;
            const interactive = target.closest('a, button, input, textarea, select, .cursor-pointer');
            if (interactive) {
                onHoverStart();
            } else {
                onHoverEnd();
            }
        };

        document.addEventListener('mouseover', onMouseOver);

        // Animation loop for smooth outline
        let requestRef;
        const animateOutline = () => {
            const dx = cursorPos.current.x - outlinePos.current.x;
            const dy = cursorPos.current.y - outlinePos.current.y;

            // Smooth easing
            outlinePos.current.x += dx * 0.15;
            outlinePos.current.y += dy * 0.15;

            if (outlineRef.current) {
                outlineRef.current.style.left = `${outlinePos.current.x}px`;
                outlineRef.current.style.top = `${outlinePos.current.y}px`;
            }

            requestRef = requestAnimationFrame(animateOutline);
        };
        requestRef = requestAnimationFrame(animateOutline);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseenter', onMouseEnter);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(requestRef);
            document.body.classList.remove('hovering');
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="cursor-dot"
                style={{ opacity: isVisible ? 1 : 0 }}
            >
                {/* Premium Golden Croissant Icon */}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-icon"
                >
                    <path d="M4.6 13.11l5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81" />
                    <path d="M15.11 3.09l5.8 3.22a3.04 3.04 0 0 1 1 5.77L13.1 27.9" />
                    <path d="M15 3a3.03 3.03 0 0 0-2.81 3.9" />
                    <path d="M2.09 15.11l3.22 5.8a3.04 3.04 0 0 0 5.77 1l1.79-8.8" />
                    {/* Simplified Croissant Shape */}
                    <path d="m2.3 8.3 2.9-1.7a9.72 9.72 0 0 1 13.5 13.5l-1.7 2.9a2.04 2.04 0 0 1-2.8.5l-11.4-6.6a2.04 2.04 0 0 1-.5-2.8Z" />
                    <path d="m14 8 2.3 4" />
                    <path d="m10.6 10 2.3 4" />
                    <path d="m7.3 12 2.3 4" />
                </svg>
            </div>
            <div
                ref={outlineRef}
                className="cursor-outline"
                style={{ opacity: isVisible ? 1 : 0 }}
            />
        </>
    );
};

export default CustomCursor;
