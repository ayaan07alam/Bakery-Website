import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
            <div className="absolute inset-y-0 right-0 max-w-full flex transition-transform transform translate-x-0 pt-20">
                <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
                    <div className="flex items-center justify-between px-4 py-6 bg-gray-50 border-b">
                        <h2 className="text-lg font-medium text-red-950 flex items-center">
                            <ShoppingBag className="mr-2" size={20} />
                            My Wishlist
                        </h2>
                        <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-500">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {cart.length === 0 ? (
                            <div className="text-center py-20">
                                <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500">Your wishlist is empty.</p>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="mt-4 text-brand-red font-medium hover:underline"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {cart.map(item => (
                                    <li key={item.id} className="py-6 flex">
                                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="ml-4 flex-1 flex flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-red-950">
                                                    <h3>{item.name}</h3>
                                                    <p className="ml-4">₹{item.price * item.quantity}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-yellow-950/60">{item.category?.name}</p>
                                            </div>
                                            <div className="flex-1 flex items-end justify-between text-sm">
                                                <div className="flex items-center border rounded">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100"><Minus size={16} /></button>
                                                    <span className="px-2 font-medium">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100"><Plus size={16} /></button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="font-medium text-brand-red hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="border-t border-gray-200 px-4 py-6 bg-gray-50">
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                <p>Subtotal</p>
                                <p>₹{cartTotal}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                            <button
                                onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-red hover:bg-red-700"
                            >
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
