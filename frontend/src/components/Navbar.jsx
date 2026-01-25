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

            {/* Main Navbar - WITH PREMIUM SVG WAVE DESIGN */}
            <nav className={`w-full transition-all duration-300 relative z-20 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-1' : 'bg-white py-2'}`}>
                <div className="w-full px-6 md:px-12 flex justify-between items-center">

                    {/* Logo - Compact Height */}
                    <Link to="/" className="flex items-center group relative">
                        <img src="/logo.png" alt="Saha Bakery" className={`object-contain transition-all duration-300 ${scrolled ? 'h-10' : 'h-14'}`} />
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
                                            className="px-6 py-2 rounded-full text-brand-dark font-logo text-xl tracking-wide hover:bg-brand-yellow/20 hover:text-brand-red transition-all duration-300 relative inline-block"
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
                                        className="px-6 py-2 rounded-full text-brand-dark font-logo text-xl tracking-wide hover:bg-brand-yellow/20 hover:text-brand-red transition-all duration-300 relative group"
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                    </Link>
                                )
                            ))
                        ) : (
                            // Fallback menu when database is empty
                            <>
                                <Link to="/" className="px-6 py-2 rounded-full text-brand-dark font-logo text-xl tracking-wide hover:bg-brand-yellow/20 hover:text-brand-red transition-all duration-300 relative group">
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
                                        className="px-6 py-2 rounded-full text-brand-dark font-logo text-xl tracking-wide hover:bg-brand-yellow/20 hover:text-brand-red transition-all duration-300 relative inline-block"
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

                                <Link to="/contact" className="px-6 py-2 rounded-full text-brand-dark font-logo text-xl tracking-wide hover:bg-brand-yellow/20 hover:text-brand-red transition-all duration-300 relative group">
                                    <span className="relative z-10">Contact</span>
                                </Link>
                            </>
                        )}
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

            {/* CLEAN SCALLOPED EDGE */}
            <div className="relative w-full h-2 bg-white">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0 Q15,6 30,0 T60,0 T90,0 T120,0 T150,0 T180,0 T210,0 T240,0 T270,0 T300,0 T330,0 T360,0 T390,0 T420,0 T450,0 T480,0 T510,0 T540,0 T570,0 T600,0 T630,0 T660,0 T690,0 T720,0 T750,0 T780,0 T810,0 T840,0 T870,0 T900,0 T930,0 T960,0 T990,0 T1020,0 T1050,0 T1080,0 T1110,0 T1140,0 T1170,0 T1200,0 L1200,8 L0,8 Z" className="fill-brand-yellow" />
                </svg>
            </div>

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
