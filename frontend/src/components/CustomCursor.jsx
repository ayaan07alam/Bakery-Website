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

        // Add hover effects for interactive elements
        // We defer this slightly to ensure DOM is ready? 
        // Actually, delegating via mouseover on document is more performant for dynamic content
        const onMouseOver = (e) => {
            const target = e.target;
            // Check if target or parent is interactive
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

            // Smooth easing (0.15 factor usually feels nice)
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

    // Don't render on mobile/touch logic could be done here too via matchMedia, 
    // but CSS handles display:none. We can just return null if we want to save resources.
    // simpler to let CSS handle it for now.

    return (
        <>
            <div
                ref={dotRef}
                className="cursor-dot"
                style={{ opacity: isVisible ? 1 : 0 }}
            />
            <div
                ref={outlineRef}
                className="cursor-outline"
                style={{ opacity: isVisible ? 1 : 0 }}
            />
        </>
    );
};

export default CustomCursor;
