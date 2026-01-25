import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';

const Home = () => {
    // Hero Slider State
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([
        // Fallback default slides
        {
            imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=2380',
            title: 'Artisanal Excellence',
            subtitle: 'Baking happiness with traditional recipes since 1978.',
            ctaText: 'Order Now',
            ctaLink: '/shop'
        }
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHeroSlides();
    }, []);

    const fetchHeroSlides = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/hero-slides/active');
            if (response.data && response.data.length > 0) {
                setSlides(response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching hero slides:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides]);

    const nextSlide = () => setCurrentSlide((currentSlide + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

    return (
        <div className="pb-20 relative overflow-x-hidden min-h-screen">
            {/* Decorative Side Art - Bakery Theme - Left (Visible on Desktop) */}
            <div className="hidden lg:block absolute top-[15%] left-4 w-40 h-auto opacity-15 pointer-events-none z-0 transform -rotate-12">
                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-dark">
                    <path d="M50 150 Q100 100 150 50 M140 40 L160 60 M40 140 L60 160" /> {/* Rolling Pin */}
                    <path d="M100 120 C80 140 60 140 40 120 M160 60 C180 80 180 100 160 120" /> {/* Dough Curves */}
                    <path d="M80 50 Q100 20 120 50 T160 50" />
                </svg>
            </div>
            {/* Decorative Side Art - Bakery Theme - Right (Visible on Desktop) */}
            <div className="hidden lg:block absolute top-[15%] right-4 w-40 h-auto opacity-15 pointer-events-none z-0 transform rotate-12">
                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-dark">
                    <path d="M60 40 L60 100 Q60 150 100 150 Q140 150 140 100 L140 40" /> {/* Whisk Wires */}
                    <path d="M80 40 L80 100 M100 40 L100 110 M120 40 L120 100" />
                    <rect x="90" y="20" width="20" height="20" rx="5" /> {/* Handle */}
                </svg>
            </div>

            {/* Main Content Wrapper */}
            <div>
                {/* Floating Hero Slider - Adjusted for NO CROP (Aspect Ratio) */}
                <section className="relative w-full max-w-[95%] mx-auto mt-28 rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5 aspect-[16/9] md:aspect-[21/9] min-h-[500px]">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-100"
                                style={{ backgroundImage: `url('${slide.imageUrl}')` }}
                            ></div>
                            {/* Gradient Overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

                            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 text-left max-w-6xl">
                                <span className="font-logo text-4xl md:text-5xl mb-4 animate-fade-in-up text-brand-yellow drop-shadow-md tracking-wide">Welcome to Saha Bakery</span>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 drop-shadow-2xl animate-fade-in-up delay-100 leading-tight text-white tracking-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-10 max-w-2xl font-light tracking-wide animate-fade-in-up delay-200 text-white/90 drop-shadow-md leading-relaxed border-l-4 border-brand-yellow pl-6">
                                    {slide.subtitle}
                                </p>
                                <div>
                                    <Link to={slide.ctaLink || '/shop'} className="group relative inline-flex items-center space-x-4 bg-white text-brand-dark font-bold py-4 px-10 rounded-full overflow-hidden transition-all hover:shadow-[0_20px_50px_-10px_rgba(255,255,255,0.3)] animate-fade-in-up delay-300 transform hover:-translate-y-1 hover:scale-105">
                                        <span className="relative z-10 text-lg uppercase tracking-widest">{slide.ctaText || 'Order Now'}</span>
                                        <div className="bg-brand-yellow rounded-full p-2 group-hover:translate-x-1 transition-transform">
                                            <ArrowRight size={20} className="text-brand-dark" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Infinite Marquee - Visual "Wow" Factor */}
                <div className="bg-brand-red py-6 overflow-hidden relative shadow-xl mx-4 md:mx-8 my-12 rounded-[2rem] ring-4 ring-white border-y-4 border-brand-yellow z-30">
                    <div className="animate-marquee whitespace-nowrap flex space-x-16 items-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <React.Fragment key={i}>
                                <span className="text-3xl font-display font-bold text-white tracking-wider flex items-center">
                                    <span className="text-brand-yellow mr-4">★</span> FRESHLY BAKED
                                </span>
                                <span className="text-3xl font-display font-bold text-white tracking-wider flex items-center">
                                    <span className="text-brand-yellow mr-4">✦</span> 100% EGGLESS
                                </span>
                                <span className="text-3xl font-display font-bold text-white tracking-wider flex items-center">
                                    <span className="text-brand-yellow mr-4">☀</span> ORGANIC INGREDIENTS
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-20">
                    {/* Trust Signals Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-10 rounded-3xl shadow-soft">
                        {[
                            { icon: '🌾', title: 'Premium Ingredients', desc: 'Sourced from the finest local farms.' },
                            { icon: '👨‍🍳', title: 'Master Bakers', desc: 'Crafted with passion and expertise.' },
                            { icon: '🚚', title: 'Fresh Delivery', desc: 'From our oven straight to your door.' }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group p-6 rounded-2xl hover:bg-gradient-soft transition-colors duration-300">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 animate-float">{item.icon}</div>
                                <h3 className="text-xl font-display font-bold mb-2 text-brand-dark">{item.title}</h3>
                                <p className="text-gray-500 font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <section className="mt-24 relative">
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 -z-10 opacity-5 pointer-events-none">
                            <img src="/logo.png" className="w-96 h-96 object-contain rotate-12" alt="" />
                        </div>

                        <div className="flex flex-col items-center text-center mb-16">
                            <span className="text-brand-red font-bold tracking-widest text-sm uppercase mb-2 font-sans bg-red-50 px-4 py-1 rounded-full">Customer Favorites</span>
                            <h2 className="text-4xl md:text-6xl font-logo font-bold text-transparent bg-clip-text bg-gradient-brand mb-4 tracking-wide relative">
                                Trending Now
                                <span className="absolute -top-6 -right-8 animate-bounce text-4xl">🔥</span>
                            </h2>
                            <div className="w-24 h-1 bg-gradient-sunshine rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
                            {[
                                { name: 'Black Forest Cake', price: 450, rating: 4.8, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop' },
                                { name: 'Gourmet Chicken Puff', price: 45, rating: 4.5, img: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&h=800&fit=crop' },
                                { name: 'Red Velvet Supreme', price: 600, rating: 4.9, img: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&h=800&fit=crop' },
                                { name: 'Fresh Fruit Tart', price: 120, rating: 4.7, img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 group cursor-pointer border border-gray-100 transform hover:-translate-y-2 hover:rotate-1">
                                    <div className="h-72 overflow-hidden relative">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold shadow-md flex items-center">
                                            <Star size={14} className="text-brand-yellow fill-brand-yellow mr-1" />
                                            {item.rating}
                                        </div>
                                        {/* Quick Add Overlay - Circular Button */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button className="bg-white text-brand-dark h-14 w-14 rounded-full flex items-center justify-center font-medium transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-red hover:text-white shadow-xl">
                                                <ArrowRight size={24} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-logo text-3xl mb-2 group-hover:text-brand-red transition-colors tracking-wide leading-tight">{item.name}</h3>
                                        <div className="flex justify-between items-end mt-4">
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Price</p>
                                                <span className="text-2xl font-bold text-brand-dark">₹{item.price}</span>
                                            </div>
                                            <button className="bg-gray-50 hover:bg-brand-yellow text-brand-dark h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                                                <span className="text-xl font-bold">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link to="/shop" className="inline-block border-b-2 border-brand-red text-transparent bg-clip-text bg-gradient-brand font-bold text-lg hover:text-brand-dark hover:border-brand-dark transition-all pb-1">View Full Menu</Link>
                        </div>
                    </section>

                    {/* Categories - Masonry/Grid Feel */}
                    <section className="mt-32">
                        <div className="flex flex-col items-center text-center mb-16">
                            <h2 className="text-4xl md:text-6xl font-logo font-bold text-brand-dark mb-4 tracking-wide">Our Specialties</h2>
                            <p className="text-gray-500 max-w-2xl">Discover the diverse range of freshly baked goods we offer daily.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" alt="Cakes" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-3xl font-display font-bold text-white mb-2">Signature Cakes</h3>
                                    <p className="text-white/80 mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">Perfect for weddings, birthdays, and anniversaries.</p>
                                    <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Explore Series &rarr;</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                {[
                                    { title: 'Artisan Breads', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000' },
                                    { title: 'Savory Pastries', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000' }
                                ].map((cat, idx) => (
                                    <div key={idx} className="relative h-[184px] rounded-3xl overflow-hidden group cursor-pointer">
                                        <img src={cat.img} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" alt={cat.title} />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                                            <h3 className="text-2xl font-display font-bold text-white tracking-wide">{cat.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;
