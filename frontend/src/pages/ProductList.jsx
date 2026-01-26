import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Search, Filter, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category?.id === parseInt(selectedCategory);
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch && product.available;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-logo text-brand-dark animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-red-50/30 via-yellow-50/20 to-white">
            <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
                {/* PREMIUM Gradient Header */}
                <div className="sticky top-20 z-30 -mx-4 md:-mx-6 lg:-mx-8 xl:-mx-12 px-4 md:px-6 lg:px-8 xl:px-12 py-6 mb-10 bg-white/95 backdrop-blur-xl shadow-luxury border-y-4 border-brand-yellow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Title & Count */}
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-4xl font-logo font-bold text-red-950 drop-shadow-sm flex items-center gap-3">
                                    Our Menu
                                    <span className="text-sm font-bold text-white bg-brand-red px-4 py-1.5 rounded-full shadow-lg animate-pulse">
                                        {filteredProducts.length} items
                                    </span>
                                </h1>
                                <p className="text-amber-900/80 text-sm font-medium mt-1">Freshly baked with love ❤️</p>
                            </div>
                        </div>

                        {/* Search & Filters */}
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 flex-1 lg:flex-initial lg:min-w-[600px]">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search delicious treats..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition-all text-sm shadow-inner text-brand-dark"
                                />
                            </div>

                            {/* Category Pills */}
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-md ${selectedCategory === 'all'
                                        ? 'bg-brand-red text-white scale-105 shadow-lg ring-2 ring-red-200'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-brand-red hover:border-brand-red'
                                        }`}
                                >
                                    All
                                </button>
                                {categories.slice(0, 5).map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id.toString())}
                                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-md ${selectedCategory === cat.id.toString()
                                            ? 'bg-brand-red text-white scale-105 shadow-lg ring-2 ring-red-200'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-brand-red hover:border-brand-red'
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 animate-fade-in">
                        <div className="inline-block p-8 bg-white rounded-3xl shadow-luxury border-2 border-gray-100">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {filteredProducts.map((product, idx) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-brand-yellow hover:-translate-y-2 animate-scale-in"
                                style={{ animationDelay: `${(idx % 10) * 0.05}s` }}
                            >
                                <Link to={`/product/${product.id}`} className="block">
                                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img
                                            src={product.imageUrl || `https://images.unsplash.com/photo-${['1578985545062-69928b1d9587', '1486427944299-d1955d23c990', '1558961363-fa8fdf82db35', '1557925923-34b7179877a7'][idx % 4]}?w=500&q=80`}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80';
                                            }}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-red/80 via-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {product.rating && (
                                            <div className="absolute top-3 right-3 bg-gradient-to-r from-brand-yellow to-yellow-400 text-brand-dark px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                                                <Star size={12} className="fill-current" />
                                                {product.rating}
                                            </div>
                                        )}

                                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(product);
                                                }}
                                                className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-dark py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105"
                                            >
                                                <ShoppingCart size={16} />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </Link>

                                <div className="p-4 space-y-2">
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="font-logo text-lg font-bold text-yellow-950 group-hover:text-brand-red transition-colors duration-300 line-clamp-2 leading-tight">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center justify-between pt-1">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold text-red-800">₹{product.price}</span>
                                            {product.category && (
                                                <span className="text-xs text-amber-900/60 font-medium">{product.category.name}</span>
                                            )}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center group-hover:bg-brand-yellow/20 transition-colors">
                                            <ShoppingCart size={18} className="text-brand-red" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
