import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, Phone, MapPin, Clock, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import CatalogueDownloadModal from './CatalogueDownloadModal';

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [catalogueModalOpen, setCatalogueModalOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [siteSettings, setSiteSettings] = useState({
        phone: '+91 98765 43210',
        openingHours: '7:00 AM - 10:00 PM',
        tagline: 'Freshly Baked Happiness!'
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchSiteSettings();
        fetchMenuItems();
    }, []);

    const fetchSiteSettings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/site-settings');
            setSiteSettings(response.data);
        } catch (error) {
            console.error('Error fetching site settings:', error);
        }
    };

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/menu-items');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            console.log('Categories loaded:', response.data);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchSiteSettings();
        fetchMenuItems();
        fetchCategories();
    }, []);

    return (
        <header className="fixed w-full z-50 top-0 left-0 transition-all duration-300 font-sans">
            {/* Top Bar - Brand Blue for Contrast (Logo Palette) */}
            <div className="bg-brand-blue text-white py-2 text-xs md:text-sm font-medium tracking-wide relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                <div className="w-full px-6 md:px-12 flex justify-between items-center relative z-10">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center space-x-2"><Phone size={14} className="text-brand-yellow" /> <span>{siteSettings.phone}</span></span>
                        <span className="hidden md:flex items-center space-x-2"><Clock size={14} className="text-brand-yellow" /> <span>{siteSettings.openingHours}</span></span>
                    </div>
                    <span className="hidden md:block opacity-90 font-handwriting text-lg">{siteSettings.tagline}</span>
                </div>
            </div>

            {/* Main Navbar - PREMIUM RED GRADIENT */}
            <nav className={`w-full transition-all duration-300 relative z-20 bg-gradient-to-r from-brand-red via-red-500 to-brand-red ${scrolled ? 'py-2' : 'py-3'}`}>
                {/* Yellow Wave Decoration - Cinema Curtain Scallops */}
                <div className="absolute top-full left-0 right-0 w-full leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-6 md:h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 30" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#E31E24', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#E31E24', stopOpacity: 1 }} />
                            </linearGradient>
                            <filter id="gold-glow">
                                <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.3" />
                            </filter>
                        </defs>
                        {/* Red Drapes Background - Seamless Blend */}
                        <path d="M0,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 V-5 H0 Z" fill="url(#navGradient)"></path>

                        {/* Gold Fringe Trim - Yellow Stroke */}
                        <path d="M0,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0 q 30,25 60,0" fill="none" stroke="#FFED00" strokeWidth="3" strokeLinecap="round" filter="url(#gold-glow)"></path>
                    </svg>
                </div>

                <div className="w-full px-6 md:px-12 flex justify-between items-center relative z-10">

                    {/* Logo - Compact Height */}
                    <Link to="/" className="flex items-center group relative">
                        <img src="/logo.png" alt="Saha Bakery" className={`object-contain transition-all duration-300 drop-shadow-lg ${scrolled ? 'h-10' : 'h-12'}`} />
                    </Link>

                    {/* Desktop Menu - DYNAMIC */}
                    <div className="hidden md:flex items-center space-x-2">
                        {menuItems.length > 0 ? (
                            // Dynamic menu from database
                            menuItems.map(item => (
                                item.children && item.children.length > 0 ? (
                                    // Menu item with dropdown
                                    <div
                                        key={item.id}
                                        className="relative group"
                                        onMouseEnter={() => setActiveDropdown(item.id)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <Link
                                            to={item.link}
                                            target={item.openInNewTab ? '_blank' : '_self'}
                                            className="px-6 py-2 rounded-full text-white font-sans uppercase tracking-widest text-sm font-bold hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 relative inline-block"
                                        >
                                            <span className="relative z-10">{item.name}</span>
                                        </Link>

                                        {/* Dropdown */}
                                        <div className={`absolute top-full left-0 pt-2 transition-all duration-200 ${activeDropdown === item.id ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                                            <div className="bg-white rounded-2xl shadow-2xl border-2 border-brand-yellow p-6 w-80">
                                                <h3 className="text-lg font-bold text-brand-dark mb-4 border-b-2 border-brand-yellow pb-2">{item.name}</h3>
                                                <div className="space-y-2">
                                                    {item.children.map(child => (
                                                        <Link
                                                            key={child.id}
                                                            to={child.link}
                                                            target={child.openInNewTab ? '_blank' : '_self'}
                                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-yellow/20 transition-all group border border-transparent hover:border-brand-yellow"
                                                        >
                                                            <span className="font-semibold text-brand-dark group-hover:text-brand-red">{child.name}</span>
                                                            <span className="text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Simple menu link
                                    <Link
                                        key={item.id}
                                        to={item.link}
                                        target={item.openInNewTab ? '_blank' : '_self'}
                                        className="px-6 py-2 rounded-full text-white font-sans uppercase tracking-widest text-sm font-bold hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 relative group"
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                    </Link>
                                )
                            ))
                        ) : (
                            // Fallback menu when database is empty
                            <>
                                <Link to="/" className="px-6 py-2 rounded-full text-white font-sans uppercase tracking-widest text-sm font-bold hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 relative group">
                                    <span className="relative z-10">Home</span>
                                </Link>

                                {/* Our Menu with Categories Dropdown */}
                                <div
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown('ourMenu')}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        to="/shop"
                                        className="px-6 py-2 rounded-full text-white font-sans uppercase tracking-widest text-sm font-bold hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 relative inline-block"
                                    >
                                        <span className="relative z-10">Our Menu</span>
                                    </Link>

                                    {/* Dropdown */}
                                    <div className={`absolute top-full left-0 pt-2 transition-all duration-200 ${activeDropdown === 'ourMenu' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                                        <div className="bg-white rounded-2xl shadow-2xl border-2 border-brand-yellow p-6 w-80">
                                            <h3 className="text-lg font-bold text-brand-dark mb-4 border-b-2 border-brand-yellow pb-2">Browse by Category</h3>
                                            <div className="space-y-2">
                                                {categories.length > 0 ? (
                                                    categories.map(category => (
                                                        <Link
                                                            key={category.id}
                                                            to={`/shop?category=${category.id}`}
                                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-yellow/20 transition-all group border border-transparent hover:border-brand-yellow"
                                                        >
                                                            <span className="font-semibold text-brand-dark group-hover:text-brand-red">{category.name}</span>
                                                            <span className="text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-sm text-center py-4">Loading categories...</p>
                                                )}
                                            </div>
                                            <Link
                                                to="/shop"
                                                className="mt-4 block text-center bg-gradient-brand text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-all"
                                            >
                                                View All Products
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/contact" className="px-6 py-2 rounded-full text-white font-sans uppercase tracking-widest text-sm font-bold hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 relative group">
                                    <span className="relative z-10">Contact</span>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Icons - Premium White/Yellow Theme */}
                    <div className="flex items-center space-x-4">
                        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-brand-yellow hover:text-brand-dark transition-all">
                            <Search size={18} strokeWidth={2.5} />
                        </button>
                        <Link to="/admin" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-brand-yellow hover:text-brand-dark transition-all">
                            <User size={18} strokeWidth={2.5} />
                        </Link>

                        {/* Cart - Brand Yellow Pop */}
                        <div
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-yellow text-brand-dark border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-all relative"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart size={20} className="fill-current" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-white text-brand-red text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-brand-red animate-bounce shadow-sm">
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
