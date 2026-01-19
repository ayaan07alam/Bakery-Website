import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ChevronRight, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative mt-24">

            {/* Top Decoration: White Icing Drip (Connecting White Page to Red Footer) */}
            <div className="absolute top-0 left-0 right-0 -mt-16 w-full overflow-hidden leading-[0] z-10">
                <svg className="relative block w-[calc(100%+1.3px)] h-[70px] transform rotate-180" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-brand-red"></path>
                </svg>
            </div>

            <div className="bg-brand-red text-white pt-16 pb-10 relative z-0">
                {/* Texture Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10 pointer-events-none"></div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-red-400/30 pb-12">
                        {/* Brand */}
                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-2xl inline-block shadow-lg transform -rotate-2">
                                <img src="/logo.png" alt="Saha Bakery" className="h-16 object-contain" />
                            </div>
                            <p className="text-red-100 leading-relaxed text-sm font-medium">
                                "The heart of Kolkata's baking tradition. Authentic tastes, pure ingredients, and a whole lot of love."
                            </p>
                            <div className="flex space-x-3 pt-2">
                                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                    <a key={i} href="#" className="h-10 w-10 rounded-full bg-white text-brand-red flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-all transform hover:scale-110 shadow-sm">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="text-2xl font-logo text-brand-yellow mb-6 drop-shadow-sm">Explore</h4>
                            <ul className="space-y-3">
                                {['Our Story', 'Menu', 'Special Offers', 'Locations'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-white hover:text-brand-yellow transition-colors flex items-center text-sm group font-medium">
                                            <ChevronRight size={16} className="mr-2 text-brand-yellow group-hover:translate-x-1 transition-transform" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-2xl font-logo text-brand-yellow mb-6 drop-shadow-sm">Visit Us</h4>
                            <ul className="space-y-4 text-sm text-white font-medium">
                                <li className="flex items-start space-x-3 bg-red-700/30 p-3 rounded-xl">
                                    <MapPin size={18} className="text-brand-yellow mt-0.5 shrink-0" />
                                    <span>123 Bakery Street, Park Street,<br />Kolkata, WB 700016</span>
                                </li>
                                <li className="flex items-center space-x-3 bg-red-700/30 p-3 rounded-xl">
                                    <Phone size={18} className="text-brand-yellow shrink-0" />
                                    <span>+91 98765 43210</span>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-2xl font-logo text-brand-yellow mb-6 drop-shadow-sm">Fresh Updates</h4>
                            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                                <p className="text-red-100 text-sm mb-4">Get sweet deals right in your inbox!</p>
                                <form className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full bg-white border-2 border-transparent rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-yellow transition-all shadow-inner"
                                    />
                                    <button className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-dark font-bold py-3 rounded-xl text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2">
                                        <span>Subscribe</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-red-200 font-medium">
                        <p>&copy; {new Date().getFullYear()} Saha Bakery. Baked with ❤️ in Kolkata.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
