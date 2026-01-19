import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, Phone, MapPin, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed w-full z-50 top-0 left-0 transition-all duration-300 font-sans">
            {/* Top Bar - Brand Blue for Contrast (Logo Palette) */}
            <div className="bg-brand-blue text-white py-2 text-xs md:text-sm font-medium tracking-wide relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center space-x-2"><Phone size={14} className="text-brand-yellow" /> <span>+91 98765 43210</span></span>
                        <span className="hidden md:flex items-center space-x-2"><Clock size={14} className="text-brand-yellow" /> <span>7:00 AM - 10:00 PM</span></span>
                    </div>
                    <span className="hidden md:block opacity-90 font-handwriting text-lg">Freshly Baked Happiness!</span>
                </div>
            </div>

            {/* Main Navbar - Clean White with Brand Accents - COMPACT VERSION */}
            <nav className={`w-full transition-all duration-300 relative z-20 border-b-4 border-brand-yellow ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-1' : 'bg-white py-2'}`}>
                <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">

                    {/* Logo - Compact Height */}
                    <Link to="/" className="flex items-center group relative">
                        <img src="/logo.png" alt="Saha Bakery" className={`object-contain transition-all duration-300 ${scrolled ? 'h-10' : 'h-14'}`} />
                    </Link>

                    {/* Desktop Menu - Brand Red Chewy Font */}
                    <div className="hidden md:flex items-center space-x-4">
                        {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="px-5 py-2 rounded-xl text-brand-red font-logo text-xl tracking-wide hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Icons - Playful & Branded */}
                    <div className="flex items-center space-x-4">
                        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-red-50 text-brand-red hover:bg-brand-red hover:text-white transition-all">
                            <Search size={18} strokeWidth={2.5} />
                        </button>
                        <Link to="/admin" className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-brand-blue hover:bg-brand-blue hover:text-white transition-all">
                            <User size={18} strokeWidth={2.5} />
                        </Link>

                        {/* Cart - Brand Yellow Pop */}
                        <div
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-yellow text-brand-dark border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-all relative"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart size={20} className="fill-current" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        <button
                            className="md:hidden ml-2 text-brand-red"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu size={26} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-brand-dark/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}
            <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 transform transition-transform duration-300 shadow-2xl border-l-[6px] border-brand-yellow ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                        <span className="font-logo text-3xl text-brand-red">Menu</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="bg-gray-100 hover:bg-brand-red hover:text-white text-gray-500 rounded-full p-2 transition-colors">
                            X
                        </button>
                    </div>
                    <div className="flex flex-col space-y-3">
                        {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="text-2xl font-logo text-gray-700 hover:text-brand-red hover:pl-2 transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 w-full p-6 bg-brand-yellow/10">
                    <p className="text-brand-blue font-bold text-center">Have a sweet day! 🧁</p>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
