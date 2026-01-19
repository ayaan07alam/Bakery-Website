import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error loading product", error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found.</div>;

    return (
        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm animate-fade-in-up">
            <div className="h-[400px] bg-gray-100 rounded-xl overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
                <span className="inline-block bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm font-bold w-fit mb-4">{product.category?.name}</span>
                <h1 className="text-4xl font-bold mb-4 font-display">{product.name}</h1>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{product.description}</p>

                <div className="flex items-center justify-between mb-8 border-t border-b border-gray-100 py-6">
                    <span className="text-4xl font-bold text-brand-red">₹{product.price}</span>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-lg">
                            <button className="px-4 py-2 hover:bg-gray-100">-</button>
                            <span className="px-4 font-bold">1</span>
                            <button className="px-4 py-2 hover:bg-gray-100">+</button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-gradient-brand text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-0.5"
                    >
                        Add to Cart
                    </button>
                    <button className="flex-1 bg-white border-2 border-brand-dark text-brand-dark py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
                        Order on WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
