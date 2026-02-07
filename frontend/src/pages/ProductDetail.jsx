import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import PremiumLoader from '../components/PremiumLoader';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    const fetchProduct = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch {
            console.error('Error fetching product');
            setLoading(false);
        }
    }, [API_URL, id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        navigate('/shop');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <PremiumLoader />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-2xl text-gray-600 mb-6">Product not found</p>
                <button
                    onClick={() => navigate('/shop')}
                    className="px-6 py-3 bg-brand-red text-white rounded-full font-bold hover:bg-red-600 transition-colors"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 page-transition">
            {product && (
                <SEO
                    title={`${product.name} - ${product.category}`}
                    description={product.description || `Order ${product.name} from Saha Bakery. ${product.category} made fresh daily in Berhampore.`}
                    keywords={`${product.name}, ${product.category}, Buy ${product.name} Online, Saha Bakery ${product.category}`}
                    ogImage={product.imageUrl}
                    structuredData={{
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product.name,
                        "image": product.imageUrl,
                        "description": product.description || `${product.name} from Saha Bakery`,
                        "brand": {
                            "@type": "Brand",
                            "name": "Saha Bakery"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": product.price,
                            "priceCurrency": "INR",
                            "availability": product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                        }
                    }}
                />
            )}
            <div className="container mx-auto px-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/shop')}
                    className="flex items-center gap-2 text-brand-dark font-bold mb-8 hover:text-brand-red transition-colors group animate-fade-in-up"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Shop</span>
                </button>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div className="animate-scale-in">
                        <div className="relative rounded-3xl overflow-hidden shadow-luxury bg-gray-100 aspect-square">
                            <img
                                src={product.imageUrl || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.rating && (
                                <div className="absolute top-6 right-6 glass text-white px-4 py-2 rounded-full text-lg font-bold flex items-center gap-2 shadow-lg backdrop-blur-md">
                                    <Star size={20} className="text-brand-yellow fill-brand-yellow" />
                                    <span>{product.rating}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-center space-y-6 animate-fade-in-up delay-200">
                        <div>
                            <span className="inline-block bg-brand-red/10 text-brand-red px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                                {product.category?.name || 'Bakery'}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-red-950 mb-4">
                                {product.name}
                            </h1>
                            <p className="text-amber-900/80 text-lg leading-relaxed">
                                {product.description || 'Freshly baked with premium ingredients'}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <p className="text-sm text-amber-900/60 font-bold uppercase tracking-wider mb-2">Price</p>
                            <p className="text-5xl font-bold text-red-900">₹{product.price}</p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-4">Quantity</p>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-12 w-12 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="text-3xl font-bold text-brand-dark w-16 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="h-12 w-12 rounded-full bg-gray-100 hover:bg-brand-red hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="bg-gradient-to-r from-brand-red to-red-600 rounded-2xl p-6 text-white shadow-luxury">
                            <p className="text-sm font-bold uppercase tracking-wider mb-2 opacity-90">Total</p>
                            <p className="text-5xl font-bold">₹{product.price * quantity}</p>
                        </div>

                        {/* Add to Wishlist Button */}
                        <button
                            onClick={handleAddToCart}
                            className="group w-full bg-brand-yellow hover:bg-brand-red text-brand-dark hover:text-white font-bold py-6 px-8 rounded-full text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                        >
                            <ShoppingCart size={24} />
                            <span>Add to Wishlist</span>
                        </button>

                        {/* Product Info */}
                        {product.available && (
                            <div className="flex items-center gap-2 text-green-600 font-bold">
                                <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse"></div>
                                <span>Available Now</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
