/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-red': '#E31E24',
                'brand-yellow': '#FFED00',
                'brand-blue': '#1D4596',
                // Aesthetic additions
                'bakery-cream': '#FFFDF7', // Warm off-white background
                'bakery-beige': '#F5E6D3', // Soft accent
                'bakery-text': '#4A4A4A', // Softer black
                'brand-light': '#FFFDF7', // Overriding default light with cream
                'brand-dark': '#2D2D2D', // Softer dark
            },
            backgroundImage: {
                'gradient-brand': 'linear-gradient(135deg, #E31E24 0%, #FF6B6B 100%)', // Rich Red Gradient
                'gradient-sunshine': 'linear-gradient(135deg, #FFED00 0%, #FFA500 100%)', // Yellow-Orange
                'gradient-ocean': 'linear-gradient(135deg, #1D4596 0%, #4facfe 100%)', // Blue Gradient
                'gradient-soft': 'linear-gradient(to bottom, #FFFDF7 0%, #FFF5E1 100%)', // Cream to soft beige
                'gradient-overlay': 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', // Dark overlay
            },
            fontFamily: {
                'sans': ['Outfit', 'sans-serif'], // Modern, rounded, friendly
                'display': ['Playfair Display', 'serif'], // Elegant headings
                'script': ['Dancing Script', 'cursive'], // Aesthetic accents
                'logo': ['Chewy', 'cursive'], // Brand consistency
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                'marquee': {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
                'marquee': 'marquee 25s linear infinite',
            }
        },
    },
    plugins: [],
}
