import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${API_URL}/reviews`);
                setReviews(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            }
        };

        fetchReviews();
    }, [API_URL]);

    if (loading || !reviews || reviews.length === 0) return null;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-red-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-red/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-red font-bold uppercase tracking-wider text-sm bg-red-50 px-4 py-1.5 rounded-full">Customer Love</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-4 mb-6">
                        Sweet Words from <span className="text-brand-red">Sweet People</span>
                    </h2>
                    <div className="h-1 w-24 bg-brand-yellow mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <div
                            key={review.id}
                            className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative border border-gray-100 group"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <Quote className="absolute top-6 right-6 text-brand-yellow/20" size={48} />

                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={review.imageUrl || `https://ui-avatars.com/api/?name=${review.customerName}&background=random`}
                                    alt={review.customerName}
                                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                                />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">{review.customerName}</h4>
                                    <div className="flex text-yellow-500 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                fill={i < review.rating ? "currentColor" : "none"}
                                                className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 italic leading-relaxed relative z-10">
                                "{review.comment}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
