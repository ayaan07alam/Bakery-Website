import React, { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        if (!isOpen) {
            setQuery('');
            setResults([]);
            setHasSearched(false);
        }
    }, [isOpen]);

    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        setLoading(true);
        const timer = setTimeout(async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/search?q=${encodeURIComponent(query)}`);
                console.log('Search results:', response.data);
                setResults(response.data);
                setHasSearched(true);
            } catch (error) {
                console.error('Search API failed:', error);
                console.error('Error details:', error.response?.data || error.message);
                setResults([]);
                setHasSearched(true); // Show "no results" instead of default message
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search products, categories..."
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-brand-red focus:bg-white transition-all outline-none text-lg"
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-brand-red hover:text-white transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[500px] overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-red border-t-transparent"></div>
                        </div>
                    ) : hasSearched && results.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingBag className="mx-auto mb-4 text-gray-300" size={64} />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                            <p className="text-gray-500">Try searching with different keywords</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {results.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleProductClick(product.id)}
                                    className="flex gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-brand-yellow hover:shadow-lg transition-all cursor-pointer group"
                                >
                                    <img
                                        src={product.imageUrl || 'https://placehold.co/100x100?text=Product'}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-brand-dark group-hover:text-brand-red transition-colors">{product.name}</h4>
                                        {product.category && (
                                            <span className="inline-block mt-1 px-2 py-1 bg-brand-yellow/20 text-brand-dark text-xs font-semibold rounded-full">
                                                {product.category.name}
                                            </span>
                                        )}
                                        <p className="text-brand-red font-bold mt-2">₹{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <SearchIcon className="mx-auto mb-4" size={64} />
                            <p className="text-lg">Start typing to search products...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
