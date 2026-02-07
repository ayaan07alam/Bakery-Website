import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
            {/* Fixed positioning from top with proper spacing for navbar (top bar + main nav + wave) */}
            <div className="absolute top-32 bottom-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-6 bg-gradient-to-r from-red-50 to-yellow-50 border-b-2 border-brand-yellow">
                    <h2 className="text-xl font-display font-bold text-red-950 flex items-center gap-2">
                        <Heart className="text-brand-red fill-brand-red" size={24} />
                        My Wishlist
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white/50 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-20">
                            <Heart size={64} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-500 text-lg font-medium mb-2">Your wishlist is empty</p>
                            <p className="text-gray-400 text-sm mb-6">Save your favorite items here!</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-brand-red font-semibold hover:underline"
                            >
                                Start Browsing
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl border-2 border-gray-100 hover:border-brand-yellow transition-all p-4 group"
                                >
                                    <div className="flex gap-4">
                                        {/* Image */}
                                        <Link
                                            to={`/product/${item.id}`}
                                            onClick={() => setIsCartOpen(false)}
                                            className="flex-shrink-0"
                                        >
                                            <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        </Link>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                to={`/product/${item.id}`}
                                                onClick={() => setIsCartOpen(false)}
                                            >
                                                <h3 className="font-bold text-red-950 mb-1 hover:text-brand-red transition-colors line-clamp-2">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-500 mb-2">{item.category?.name}</p>
                                            <p className="text-2xl font-bold text-brand-red">₹{item.price}</p>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors self-start"
                                            title="Remove from wishlist"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {/* View Details Button */}
                                    <Link
                                        to={`/product/${item.id}`}
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-3 w-full bg-brand-yellow hover:bg-brand-red text-brand-dark hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {cart.length > 0 && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span className="font-medium">{cart.length} item{cart.length > 1 ? 's' : ''} saved</span>
                            <button
                                onClick={() => cart.forEach(item => removeFromCart(item.id))}
                                className="text-red-600 hover:text-red-800 font-medium"
                            >
                                Clear All
                            </button>
                        </div>

                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="w-full bg-gradient-to-r from-brand-red to-red-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all"
                        >
                            Continue Browsing
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
