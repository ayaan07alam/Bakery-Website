import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Plus, Trash2, Save, X, Star, Upload, Image as ImageIcon } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';

const ReviewManager = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState({
        customerName: '',
        rating: 5,
        comment: '',
        imageUrl: '',
        active: true
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    const fetchReviews = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/reviews/all`);
            setReviews(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setMessage({ type: 'error', text: 'Failed to fetch reviews' });
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleImageUpload = async (file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setCurrentReview(prev => ({ ...prev, imageUrl: response.data }));
            setUploading(false);
        } catch (error) {
            console.error('Image upload failed:', error);
            setMessage({ type: 'error', text: 'Image upload failed' });
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentReview.id) {
                await axios.put(`${API_URL}/reviews/${currentReview.id}`, currentReview);
            } else {
                await axios.post(`${API_URL}/reviews`, currentReview);
            }
            setMessage({ type: 'success', text: 'Review saved successfully!' });
            setIsModalOpen(false);
            setCurrentReview({ customerName: '', rating: 5, comment: '', imageUrl: '', active: true });
            setImageFile(null);
            fetchReviews();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save review' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await axios.delete(`${API_URL}/reviews/${id}`);
            setMessage({ type: 'success', text: 'Review deleted successfully!' });
            fetchReviews();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete review' });
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 overflow-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-800">Customer Reviews</h1>
                    <button
                        onClick={() => {
                            setCurrentReview({ customerName: '', rating: 5, comment: '', imageUrl: '', active: true });
                            setIsModalOpen(true);
                        }}
                        className="bg-brand-red text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2 font-bold shadow-lg"
                    >
                        <Plus size={20} />
                        Add New Review
                    </button>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-xl mb-6 ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message.text}
                    </div>
                )}

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map(review => (
                            <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full relative">
                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={review.imageUrl || '/default-avatar.png'}
                                        alt={review.customerName}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-brand-yellow"
                                    />
                                    <div>
                                        <h3 className="font-bold text-gray-800">{review.customerName}</h3>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm italic flex-1">"{review.comment}"</p>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                    <span className={`px-2 py-1 rounded-full ${review.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {review.active ? 'Active' : 'Hidden'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {currentReview.id ? 'Edit Review' : 'Add New Review'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Customer Name</label>
                                    <input
                                        type="text"
                                        value={currentReview.customerName}
                                        onChange={(e) => setCurrentReview({ ...currentReview, customerName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setCurrentReview({ ...currentReview, rating: star })}
                                                className={`text-2xl transition-transform hover:scale-110 ${star <= currentReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Review Comment</label>
                                    <textarea
                                        value={currentReview.comment}
                                        onChange={(e) => setCurrentReview({ ...currentReview, comment: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                                        rows="4"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Customer Photo</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                                        {currentReview.imageUrl ? (
                                            <div className="relative inline-block">
                                                <img
                                                    src={currentReview.imageUrl}
                                                    alt="Preview"
                                                    className="h-24 w-24 rounded-full object-cover mx-auto"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setCurrentReview({ ...currentReview, imageUrl: '' })}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer block">
                                                <div className="flex flex-col items-center">
                                                    <Upload className="text-gray-400 mb-2" size={32} />
                                                    <span className="text-sm text-gray-500 font-medium">Click to upload photo</span>
                                                    <p className="text-xs text-brand-blue font-semibold mt-2">📐 Recommended: 400x400px (Square)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleImageUpload(e.target.files[0])}
                                                    className="hidden"
                                                    accept="image/*"
                                                />
                                            </label>
                                        )}
                                        {uploading && <p className="text-sm text-brand-blue mt-2 font-bold animate-pulse">Uploading...</p>}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        checked={currentReview.active}
                                        onChange={(e) => setCurrentReview({ ...currentReview, active: e.target.checked })}
                                        className="h-5 w-5 text-brand-red rounded focus:ring-brand-red border-gray-300"
                                    />
                                    <label htmlFor="active" className="text-gray-700 font-medium select-none cursor-pointer">Show this review on website</label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Save Review
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewManager;
