import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
    const [siteSettings, setSiteSettings] = useState({
        phone: '+91 95631 71459',
        email: 'bakerysaha18@gmail.com',
        address: 'Gorabazar, Berhampore, West Bengal 742101',
        facebookUrl: '#',
        instagramUrl: '#',
        twitterUrl: '#'
    });
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterLoading, setNewsletterLoading] = useState(false);
    const [newsletterMessage, setNewsletterMessage] = useState('');

    useEffect(() => {
        fetchSiteSettings();
    }, []);

    const fetchSiteSettings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/site-settings');
            setSiteSettings(response.data);
        } catch (error) {
            console.error('Error fetching site settings:', error);
        }
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setNewsletterLoading(true);
        setNewsletterMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/newsletter/subscribe', {
                email: newsletterEmail
            });
            setNewsletterMessage(response.data.message || 'Successfully subscribed!');
            setNewsletterEmail('');
        } catch (error) {
            setNewsletterMessage('Failed to subscribe. Please try again.');
        } finally {
            setNewsletterLoading(false);
        }
    };

    return (
        <footer className="relative mt-20 font-sans">
            {/* Decorative Top Border */}
            <div className="h-1 w-full bg-gradient-to-r from-brand-red via-brand-yellow to-brand-red"></div>

            {/* Main Footer - Warm Cream Background */}
            <div className="bg-gradient-to-b from-[#FFF8F0] to-[#FFF5E8] text-gray-800 py-16 relative overflow-hidden">

                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-brand-red/5 rounded-full blur-3xl"></div>

                <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

                        {/* Brand Section */}
                        <div className="space-y-5">
                            <img src="/logo-transparent.png" alt="Saha Bakery" className="h-20 object-contain drop-shadow-md" />
                            <div>
                                <h3 className="font-display font-bold text-xl text-brand-red mb-2">Since 1978</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Crafting memories with every bite. Authentic flavors, pure ingredients, and recipes passed down through generations.
                                </p>
                            </div>
                            <div className="flex gap-3 pt-2">
                                {[
                                    { Icon: Facebook, url: siteSettings.facebookUrl },
                                    { Icon: Instagram, url: siteSettings.instagramUrl },
                                    { Icon: Twitter, url: siteSettings.twitterUrl }
                                ].map(({ Icon, url }, i) => (
                                    <a
                                        key={i}
                                        href={url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-red to-red-600 flex items-center justify-center text-white hover:from-brand-yellow hover:to-yellow-500 hover:text-brand-dark transition-all duration-300 transform hover:-translate-y-1 shadow-md"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-display font-bold text-lg text-brand-dark mb-6 relative inline-block">
                                Quick Links
                                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-brand-yellow"></span>
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Our Menu', path: '/shop' },
                                    { name: 'About Us', path: '/about' },
                                    { name: 'Contact', path: '/contact' },
                                    { name: 'Franchise Opportunities', path: '/contact' }
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-600 hover:text-brand-red transition-colors text-sm flex items-center group"
                                        >
                                            <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all text-brand-red transform group-hover:translate-x-1" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-display font-bold text-lg text-brand-dark mb-6 relative inline-block">
                                Visit Us
                                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-brand-yellow"></span>
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 group">
                                    <MapPin size={18} className="text-brand-red shrink-0 mt-0.5" />
                                    <span className="text-gray-600 text-sm leading-relaxed group-hover:text-brand-dark transition-colors">
                                        {siteSettings.address}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <Phone size={18} className="text-brand-red shrink-0" />
                                    <span className="text-gray-600 text-sm group-hover:text-brand-dark transition-colors">
                                        {siteSettings.phone}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <Mail size={18} className="text-brand-red shrink-0" />
                                    <span className="text-gray-600 text-sm group-hover:text-brand-dark transition-colors">
                                        {siteSettings.email}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="font-display font-bold text-lg text-brand-dark mb-6 relative inline-block">
                                Stay Connected 🧁
                                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-brand-yellow"></span>
                            </h4>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                Get exclusive offers and sweet updates delivered to your inbox.
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                                <input
                                    type="email"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    placeholder="Your email address"
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all shadow-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={newsletterLoading}
                                    className="w-full bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-semibold rounded-lg px-4 py-3 transition-all duration-300 shadow-ultra hover:shadow-ultra-hover transform disabled:opacity-50 text-sm btn-press"
                                >
                                    {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
                                </button>
                                {newsletterMessage && (
                                    <p className="text-xs text-green-600 text-center">{newsletterMessage}</p>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Certifications Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <ShieldCheck size={22} className="text-brand-red" />
                            <h5 className="font-display font-bold text-brand-dark text-lg">Licensed & Certified</h5>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            {/* FSSAI */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-gradient-to-br from-gray-50 to-white rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <img src="/fssai-logo.png" alt="FSSAI" className="h-8 sm:h-10 object-contain" />
                                <div className="flex flex-col text-center sm:text-left">
                                    <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">License No.</span>
                                    <span className="font-mono text-xs sm:text-sm font-bold text-gray-800">22820011000017</span>
                                </div>
                            </div>
                            {/* MSME */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-gradient-to-br from-gray-50 to-white rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="px-3 py-1.5 bg-gradient-to-br from-brand-red to-red-600 rounded-lg text-white text-xs font-bold shadow-sm">
                                    ZED
                                </div>
                                <div className="flex flex-col text-center sm:text-left">
                                    <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">MSME Reg.</span>
                                    <span className="font-mono text-xs sm:text-sm font-bold text-gray-800">06122025676423</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <p className="flex items-center gap-1">
                            © {new Date().getFullYear()} Saha Bakery. Crafted with <span className="text-brand-red">♥</span> in Kolkata.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy-policy" className="hover:text-brand-red transition-colors">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="hover:text-brand-red transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
