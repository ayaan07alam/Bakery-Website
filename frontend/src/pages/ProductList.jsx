import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        // Load data
        const loadData = async () => {
            // In a real app, handle loading/errors
            const prodData = await fetchProducts();
            const catData = await fetchCategories();
            setProducts(prodData);
            setCategories(catData);
        };
        loadData();
    }, []);

    const filteredProducts = activeCategory
        ? products.filter(p => p.category?.id === activeCategory)
        : products;

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-brand-dark mb-4 md:mb-0">Our Menu</h1>

                {/* Categories Filter */}
                <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium ${!activeCategory ? 'bg-gradient-brand text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium ${activeCategory === cat.id ? 'bg-gradient-brand text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up">
                {filteredProducts.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group border border-gray-100">
                        <div className="h-48 overflow-hidden bg-gray-100 relative">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            {/* Quick Add or Badge could go here */}
                        </div>
                        <div className="p-4">
                            <div className="text-sm text-brand-blue font-semibold mb-1 uppercase tracking-wide">{product.category?.name}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-brand-red transition-colors">{product.name}</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-brand-dark">₹{product.price}</span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(product);
                                    }}
                                    className="text-sm bg-gray-50 hover:bg-gradient-sunshine hover:text-brand-dark text-gray-700 px-4 py-2 rounded-lg transition-all font-medium shadow-sm"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
