import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        customerAddress: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const orderData = {
                ...formData,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };

            const response = await fetch('http://localhost:8080/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                clearCart();
                alert('Order Placed Successfully!');
                navigate('/');
            } else {
                alert('Failed to place order.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong.');
        }
    };

    if (cart.length === 0) return <div className="text-center py-20">Your cart is empty.</div>;

    return (
        <div className="min-h-screen py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-logo text-red-950 mb-4">Checkout</h1>
                    <p className="text-amber-900/80 text-lg">Detailed shipping info.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Form */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-premium border border-gray-100 animate-slide-in-left">
                        <h2 className="text-2xl font-bold font-display text-red-950 mb-6 flex items-center gap-3">
                            <span className="bg-brand-red text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                            Shipping Details
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                                <input
                                    type="text" required
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all outline-none"
                                    value={formData.customerName}
                                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone Number</label>
                                <input
                                    type="tel" required
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all outline-none"
                                    value={formData.customerPhone}
                                    onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Delivery Address</label>
                                <textarea
                                    required rows="4"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all outline-none resize-none"
                                    value={formData.customerAddress}
                                    onChange={e => setFormData({ ...formData, customerAddress: e.target.value })}
                                    placeholder="House number, Street, Area..."
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-brand-red text-white py-5 rounded-2xl font-bold text-lg uppercase tracking-wider hover:bg-brand-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg mt-4">
                                Confirm Order (COD)
                            </button>
                            <p className="text-center text-gray-400 text-sm mt-4">
                                * Payment will be collected upon delivery
                            </p>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1 animate-slide-in-right delay-200">
                        <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 sticky top-28">
                            <h2 className="text-2xl font-bold font-display text-red-950 mb-6 flex items-center gap-3">
                                <span className="bg-brand-yellow text-brand-dark w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Your Order
                            </h2>
                            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={item.imageUrl || 'https://via.placeholder.com/50'} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-yellow-950 text-sm">{item.name}</p>
                                                <p className="text-xs text-amber-900/60">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-red-900">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between text-2xl font-bold text-red-950 pt-3 border-t border-dashed border-gray-200">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
