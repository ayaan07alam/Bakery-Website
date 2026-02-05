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
                {/* Premium Cake Icon */}
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-icon"
                >
                    {/* Cake layers */}
                    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                    <path d="M4 16s.5-1 2-1 2.5 1 4 1 2.5-1 4-1 2.5 1 4 1 2 1 2 1" />
                    <path d="M2 21h20" />
                    {/* Cream Top */}
                    <path d="M7 8v2" />
                    <path d="M12 8v2" />
                    <path d="M17 8v2" />
                    {/* Candle / Flame */}
                    <path d="M7 4h10" />
                    <path d="M12 4V2.5" />
                    <path d="M12 2a.5.5 0 0 1 .5.5v.5h-1v-.5a.5.5 0 0 1 .5-.5Z fill-current" />
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
