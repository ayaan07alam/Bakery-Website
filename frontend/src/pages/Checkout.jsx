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
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text" required
                                className="w-full p-2 border rounded"
                                value={formData.customerName}
                                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel" required
                                className="w-full p-2 border rounded"
                                value={formData.customerPhone}
                                onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                required rows="3"
                                className="w-full p-2 border rounded"
                                value={formData.customerAddress}
                                onChange={e => setFormData({ ...formData, customerAddress: e.target.value })}
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-brand-red text-white py-3 rounded-lg font-bold hover:bg-red-700 transition">
                            Place Order (Cash on Delivery)
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-xl shadow h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <ul className="space-y-4 mb-4">
                        {cart.map(item => (
                            <li key={item.id} className="flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-medium">₹{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t pt-4 flex justify-between text-xl font-bold text-brand-dark">
                        <span>Total</span>
                        <span>₹{cartTotal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
