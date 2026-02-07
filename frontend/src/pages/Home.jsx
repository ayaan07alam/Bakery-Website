import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Sparkles, Award, Truck, Wheat, ChefHat } from 'lucide-react';
import axios from 'axios';
import VideoGallery from '../components/VideoGallery';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import SEO from '../components/SEO';

const Home = () => {
    // Hero Slider State
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([
        {
            imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            title: 'Exquisite Berry Cakes',
            subtitle: 'Layers of fresh cream and hand-picked berries for pure indulgence.',
            ctaText: 'Order Now',
            ctaLink: '/shop'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            title: 'Heritage Sweets & Pastries',
            subtitle: 'Authentic treats crafted with passion and traditional recipes.',
            ctaText: 'View Pastries',
            ctaLink: '/shop'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            title: 'Celebration Masterpieces',
            subtitle: 'Make your special moments unforgettable with our signature custom cakes.',
            ctaText: 'Book a Cake',
            ctaLink: '/contact'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            title: 'The Ultimate Chocolate',
            subtitle: 'Rich, moist, and decadent chocolate cakes made from premium cocoa.',
            ctaText: 'Indulge Today',
            ctaLink: '/shop'
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            title: 'Delicate Tea Cakes',
            subtitle: 'Light, fluffy, and perfect for your evening conversations.',
            ctaText: 'Our Story',
            ctaLink: '/about'
        }
    ]);

    // Categories State
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    // Products State for Trending Section
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    const fetchHeroSlides = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/hero-slides/active`);
            if (response.data && response.data.length > 0) {
                setSlides(response.data);
            }
        } catch (error) {
            console.error('Error fetching hero slides:', error);
        }
    }, [API_URL]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            if (response.data && response.data.length > 0) {
                setCategories(response.data);
            }
            setCategoriesLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategoriesLoading(false);
        }
    }, [API_URL]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            if (response.data && response.data.length > 0) {
                setProducts(response.data);
            }
            setProductsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProductsLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchHeroSlides();
        fetchCategories();
        fetchProducts();
    }, [fetchHeroSlides, fetchCategories, fetchProducts]);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [slides]);

    const nextSlide = () => setCurrentSlide((currentSlide + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

    return (
        <div className="relative overflow-hidden min-h-screen page-transition">
            <SEO
                title="Best Bakery in Berhampore Since 1978"
                description="Authentic baked goods and traditional Bengali sweets since 1978. Fresh cakes, pastries, cookies, and handcrafted delicacies in Berhampore, West Bengal. Visit Saha Bakery for premium quality baked products."
                keywords="Saha Bakery, Bakery Berhampore, Best Bakery Kolkata, Fresh Baked Goods, Bengali Sweets, Birthday Cakes, Pastries, Cookies, Berhampore Bakery, Traditional Bakery, Murshidabad Bakery"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "Bakery",
                    "name": "Saha Bakery",
                    "image": "https://sahabakery.com/logo-transparent.png",
                    "description": "Premium bakery serving authentic baked goods and traditional Bengali sweets since 1978.",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Khagra Road",
                        "addressLocality": "Berhampore",
                        "addressRegion": "West Bengal",
                        "postalCode": "742101",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 24.1027,
                        "longitude": 88.2535
                    },
                    "telephone": "+91-XXXXXXXXXX",
                    "priceRange": "₹₹",
                    "openingHoursSpecification": [
                        {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                            "opens": "08:00",
                            "closes": "21:00"
                        }
                    ],
                    "servesCuisine": "Bakery, Bengali Sweets",
                    "foundingDate": "1978",
                    "url": "https://sahabakery.com"
                }}
            />
            {/* === FULLSCREEN HERO SLIDER === */}
            <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {/* Hero Image with Premium Treatment */}
                        <div className="absolute inset-0 will-animate">
                            <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className={`w-full h-full object-cover transition-all duration-[10000ms] ${index === currentSlide ? 'scale-110' : 'scale-100'
                                    }`}
                            />
                        </div>

                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

                        {/* Content with Stagger Animation */}
                        <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20 xl:px-32 pt-28 md:pt-32">
                            <div className="max-w-4xl space-y-6 md:space-y-8">
                                <div className="flex items-center gap-4 mb-2 animate-fade-in-up">
                                    <div className="h-px w-12 bg-brand-yellow"></div>
                                    <span className="inline-block font-sans text-xs md:text-sm lg:text-base text-white/95 tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium drop-shadow-sm">
                                        Welcome to Saha Bakery
                                    </span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold drop-shadow-2xl animate-fade-in-up delay-100 leading-[1.1] text-white tracking-tight text-balance">
                                    {slide.title}
                                </h1>

                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-light tracking-wide animate-fade-in-up delay-200 text-white/90 drop-shadow-lg leading-relaxed pl-1">
                                    {slide.subtitle}
                                </p>

                                <div className="animate-fade-in-up delay-300 pt-6 sm:pt-8">
                                    <Link
                                        to={slide.ctaLink || '/shop'}
                                        className="btn-premium-gold btn-shimmer group relative inline-flex items-center gap-3 sm:gap-4 py-4 sm:py-5 px-8 sm:px-12 rounded-full transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,237,0,0.3)] transform hover:-translate-y-1 hover:pr-16 shadow-luxury btn-press"
                                    >
                                        <span className="relative z-10 text-base sm:text-lg uppercase tracking-widest font-display font-bold text-brand-dark">
                                            {slide.ctaText || 'Order Now'}
                                        </span>
                                        <div className="bg-white/20 rounded-full p-2.5 sm:p-3 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110 relative z-10 shadow-sm border border-white/20">
                                            <ArrowRight size={20} className="sm:hidden text-brand-dark" />
                                            <ArrowRight size={24} className="hidden sm:block text-brand-dark" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Premium Scroll Indicator */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce-slow opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">Scroll</span>
                            <div className="w-[1px] h-12 bg-gradient-to-b from-brand-yellow to-transparent"></div>
                        </div>

                        {/* Navigation Controls - Premium Style */}
                        {slides.length > 1 && index === currentSlide && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 glass text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/30 backdrop-blur-md"
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeft size={28} strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 glass text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/30 backdrop-blur-md"
                                    aria-label="Next slide"
                                >
                                    <ChevronRight size={28} strokeWidth={2.5} />
                                </button>

                                {/* Slide Indicators - Premium Dots */}
                                <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                                    {slides.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentSlide(idx)}
                                            className={`transition-all duration-500 rounded-full ${idx === currentSlide
                                                ? 'w-12 md:w-16 h-2.5 bg-white shadow-lg'
                                                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/75 hover:scale-125'
                                                }`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </section>

            {/* === PREMIUM MARQUEE BANNER === */}
            <div className="relative overflow-hidden bg-gradient-to-r from-brand-red via-red-600 to-brand-red py-6 md:py-8 shadow-luxury">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJWMTRoMnYyMHptLTYgMEgyMFYxNGgydjIwem02LTZ2LTJoLTJ2Mmgyem0tNiAwdi0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
                <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
                    {[...Array(12)].map((_, i) => (
                        <React.Fragment key={i}>
                            <span className="text-2xl md:text-3xl font-display font-bold text-white tracking-wider flex items-center gap-4">
                                <Sparkles className="text-brand-yellow" size={28} />
                                FRESHLY BAKED DAILY
                            </span>
                            <span className="text-2xl md:text-3xl font-display font-bold text-white tracking-wider flex items-center gap-4">
                                <Award className="text-brand-yellow" size={28} />
                                100% EGGLESS
                            </span>
                            <span className="text-2xl md:text-3xl font-display font-bold text-white tracking-wider flex items-center gap-4">
                                <Star className="text-brand-yellow fill-brand-yellow" size={28} />
                                ORGANIC INGREDIENTS
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* === TRUST SIGNALS - PREMIUM CARDS === */}
            <section className="px-4 md:px-6 lg:px-8 xl:px-12 pt-8 relative z-30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                icon: <Wheat size={48} strokeWidth={1.5} />,
                                title: 'Premium Ingredients',
                                desc: 'Sourced from the finest local farms for exceptional quality.'
                            },
                            {
                                icon: <ChefHat size={48} strokeWidth={1.5} />,
                                title: 'Master Bakers',
                                desc: 'Crafted with passion and decades of expertise.'
                            },
                            {
                                icon: <Truck size={48} strokeWidth={1.5} />,
                                title: 'Fresh Delivery',
                                desc: 'From our oven straight to your door, always fresh.'
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-white rounded-3xl p-8 md:p-10 shadow-soft hover:shadow-luxury transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-brand-yellow/30 animate-scale-in will-animate gpu-accelerate"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="mb-6 text-brand-dark group-hover:text-brand-yellow group-hover:scale-110 transition-all duration-500 animate-float">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-3 text-brand-dark group-hover:text-brand-red transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === VIDEO GALLERY SECTION === */}
            {/* TODO: Uncomment when videos are ready */}
            {/* <VideoGallery /> */}

            {/* === FEATURED PRODUCTS - PREMIUM SHOWCASE === */}
            <section className="px-4 md:px-6 lg:px-8 xl:px-12 py-24 md:py-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:mb-20 space-y-4 animate-fade-in-up">
                        <span className="inline-block text-brand-red font-bold tracking-[0.3em] text-sm uppercase bg-red-50 px-6 py-2 rounded-full">
                            Customer Favorites
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-red-950 text-balance">
                            Trending Now
                            <Sparkles className="inline-block ml-4 text-brand-yellow animate-pulse" size={40} />
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-brand-red to-brand-yellow rounded-full mx-auto mt-4"></div>
                    </div>

                    {productsLoading ? (
                        // Loading skeleton for 12 products
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="h-[450px] bg-gray-200 animate-pulse rounded-3xl"></div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        // Empty state
                        <div className="text-center py-20">
                            <p className="text-amber-900/60 text-lg">No products available yet. Add products in the admin panel!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                            {products.slice(0, 12).map((item, idx) => (
                                <Link
                                    key={item.id || idx}
                                    to={`/product/${item.id}`}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-700 cursor-pointer border border-gray-100 hover-lift will-animate animate-scale-in"
                                    style={{ animationDelay: `${idx * 0.05}s` }}
                                >
                                    {/* Image Container with Gradient Overlay */}
                                    <div className="relative h-80 overflow-hidden bg-gray-100">
                                        <img
                                            src={item.imageUrl || 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=800&fit=crop'}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Rating Badge (if available) */}
                                        {item.rating && (
                                            <div className="absolute top-4 right-4 glass text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg backdrop-blur-md">
                                                <Star size={16} className="text-brand-yellow fill-brand-yellow" />
                                                <span>{item.rating}</span>
                                            </div>
                                        )}

                                        {/* Quick View Button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <button className="bg-white text-brand-dark h-16 w-16 rounded-full flex items-center justify-center font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 shadow-2xl">
                                                <ArrowRight size={28} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6 md:p-8 space-y-4">
                                        <h3 className="font-display font-bold text-2xl md:text-3xl text-yellow-950 group-hover:text-brand-red transition-colors duration-300 leading-tight line-clamp-2">
                                            {item.name}
                                        </h3>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-xs text-amber-900/60 font-bold uppercase tracking-wider mb-1">
                                                    Price
                                                </p>
                                                <span className="text-3xl font-bold text-red-900">₹{item.price}</span>
                                            </div>
                                            <button className="bg-gray-50 hover:bg-brand-yellow text-brand-dark h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-sm hover:shadow-md">
                                                <span className="text-2xl font-bold">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-16 animate-fade-in-up delay-500">
                        <Link
                            to="/shop"
                            className="group inline-flex items-center gap-3 text-brand-dark font-bold text-lg border-b-3 border-brand-red pb-2 transition-all duration-300 hover:gap-5 hover:text-brand-red"
                        >
                            <span>View Full Menu</span>
                            <ArrowRight
                                size={20}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </section>

            {/* === CATEGORIES - DYNAMIC PREMIUM GRID === */}
            <section className="px-4 md:px-6 lg:px-8 xl:px-12 py-16 md:py-24">
                <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-red-950">
                        Our Specialties
                    </h2>
                    <p className="text-amber-900/80 text-lg max-w-2xl mx-auto leading-relaxed">
                        Discover the diverse range of freshly baked goods we offer daily.
                    </p>
                </div>

                {categoriesLoading ? (
                    // Loading skeleton
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[300px] bg-gray-200 animate-pulse rounded-3xl"></div>
                        ))}
                    </div>
                ) : categories.length === 0 ? (
                    // Empty state
                    <div className="text-center py-20">
                        <p className="text-amber-900/60 text-lg">No categories available yet.</p>
                    </div>
                ) : (
                    // Dynamic Grid Layout
                    <div className={`grid gap-8 ${categories.length === 1 ? 'grid-cols-1' :
                        categories.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                            categories.length === 3 ? 'grid-cols-1 md:grid-cols-2' :
                                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                        {categories.map((category, index) => {
                            // First category is large if there are exactly 3 categories
                            const isLargeCard = categories.length === 3 && index === 0;

                            return (
                                <Link
                                    key={category.id}
                                    to={`/shop?category=${category.id}`}
                                    className={`
                                        relative rounded-3xl overflow-hidden group cursor-pointer 
                                        shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] 
                                        transition-all duration-700 
                                        animate-scale-in
                                        border-4 border-transparent hover:border-brand-yellow/50
                                        ${isLargeCard ? 'md:row-span-2 h-[450px]' : 'h-[300px] md:h-[207px]'}
                                        ${categories.length === 3 && index === 0 ? 'md:row-span-2' : ''}
                                    `}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Image with parallax effect */}
                                    <img
                                        src={category.imageUrl || 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000'}
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-3"
                                        alt={category.name}
                                        loading="lazy"
                                    />

                                    {/* Gradient Overlay - More dramatic */}
                                    <div className={`
                                        absolute inset-0 transition-all duration-500
                                        ${isLargeCard
                                            ? 'bg-gradient-to-t from-black/95 via-black/60 to-transparent group-hover:from-brand-red/90 group-hover:via-black/70'
                                            : 'bg-gradient-to-br from-black/70 via-black/50 to-transparent group-hover:from-brand-red/80 group-hover:via-black/60'
                                        }
                                    `}></div>

                                    {/* Premium animated border glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/20 via-brand-red/20 to-brand-yellow/20 animate-pulse"></div>
                                    </div>

                                    {isLargeCard ? (
                                        // Large card layout (for first of 3) - Premium styling
                                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                            {/* Decorative line */}
                                            <div className="w-16 h-1 bg-brand-yellow mb-4 transform origin-left group-hover:w-32 transition-all duration-700"></div>

                                            <h3 className="text-4xl md:text-6xl font-display font-black text-white mb-3 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:text-brand-yellow drop-shadow-2xl">
                                                {category.name}
                                            </h3>
                                            {category.description && (
                                                <p className="text-white/95 text-lg md:text-xl mb-6 font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 max-w-md backdrop-blur-sm bg-black/20 p-3 rounded-xl">
                                                    {category.description}
                                                </p>
                                            )}
                                            <div className="inline-flex items-center gap-2 text-brand-yellow font-bold uppercase tracking-[0.2em] text-sm group-hover:gap-4 transition-all duration-300 bg-brand-yellow/10 backdrop-blur-md px-6 py-3 rounded-full w-fit border-2 border-brand-yellow/50 group-hover:bg-brand-yellow group-hover:text-brand-dark">
                                                Explore Series
                                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    ) : (
                                        // Standard card layout - Premium styling
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center px-6 relative">
                                                {/* Glassmorphism background */}
                                                <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>

                                                {/* Decorative corner accent */}
                                                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>

                                                <h3 className="text-3xl md:text-5xl font-display font-black text-white tracking-wide transform group-hover:scale-110 transition-all duration-500 drop-shadow-2xl relative z-10 group-hover:text-brand-yellow">
                                                    {category.name}
                                                </h3>
                                                {category.description && (
                                                    <p className="text-white/90 text-sm md:text-base mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 relative z-10 font-semibold">
                                                        {category.description}
                                                    </p>
                                                )}

                                                {/* Arrow indicator */}
                                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 relative z-10">
                                                    <ArrowRight className="mx-auto text-brand-yellow animate-bounce" size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>
            {/* Testimonials Section */}
            <Testimonials />

            {/* Newsletter Section */}
            <Newsletter />
        </div>
    );
};

export default Home;
