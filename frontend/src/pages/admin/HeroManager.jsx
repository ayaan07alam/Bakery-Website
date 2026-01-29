import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Upload, X, Save, Image as ImageIcon } from 'lucide-react';

const HeroManager = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        imageUrl: '',
        ctaText: 'Order Now',
        ctaLink: '/shop',
        active: true,
        displayOrder: 0
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const response = await axios.get(`${API_URL}/hero-slides`);
            setSlides(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching slides:', error);
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        setUploading(true);
        try {
            const response = await axios.post(`${API_URL}/hero-slides/upload`, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ ...formData, imageUrl: `${API_URL.replace('/api', '')}${response.data}` });
            setUploading(false);
        } catch (error) {
            alert('Image upload failed');
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSlide) {
                await axios.put(`${API_URL}/hero-slides/${editingSlide.id}`, formData);
            } else {
                await axios.post(`${API_URL}/hero-slides`, formData);
            }
            fetchSlides();
            closeModal();
        } catch (error) {
            alert('Failed to save slide');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this slide?')) return;
        try {
            await axios.delete(`${API_URL}/hero-slides/${id}`);
            fetchSlides();
        } catch (error) {
            alert('Failed to delete slide');
        }
    };

    const openModal = (slide = null) => {
        if (slide) {
            setEditingSlide(slide);
            setFormData(slide);
        } else {
            setEditingSlide(null);
            setFormData({
                title: '',
                subtitle: '',
                imageUrl: '',
                ctaText: 'Order Now',
                ctaLink: '/shop',
                active: true,
                displayOrder: slides.length
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingSlide(null);
        setFormData({
            title: '',
            subtitle: '',
            imageUrl: '',
            ctaText: 'Order Now',
            ctaLink: '/shop',
            active: true,
            displayOrder: 0
        });
    };

    if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-xl">Loading...</div></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-display text-brand-dark mb-2">Hero Slides</h1>
                        <p className="text-gray-600">Manage your homepage carousel</p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="bg-brand-red hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl flex items-center space-x-2 transition-all shadow-md"
                    >
                        <Plus size={20} />
                        <span>Add Slide</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {slides.map((slide) => (
                        <div key={slide.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all">
                            <div className="h-48 bg-gray-200 relative">
                                {slide.imageUrl ? (
                                    <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                {!slide.active && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                                        Inactive
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg mb-2 text-gray-800 truncate">{slide.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{slide.subtitle}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Order: {slide.displayOrder}</span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openModal(slide)}
                                            className="p-2 bg-blue-50 text-brand-blue rounded-lg hover:bg-blue-100 transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(slide.id)}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {editingSlide ? 'Edit Slide' : 'Add New Slide'}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Slide Image</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                        {formData.imageUrl ? (
                                            <div className="relative">
                                                <img src={formData.imageUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                                                <label className="cursor-pointer bg-brand-yellow hover:bg-yellow-400 text-brand-dark font-bold py-3 px-6 rounded-xl inline-flex items-center space-x-2 transition-all">
                                                    <span>{uploading ? 'Uploading...' : 'Choose Image'}</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                        disabled={uploading}
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* Subtitle */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                                    <textarea
                                        value={formData.subtitle}
                                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                    />
                                </div>

                                {/* CTA */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Button Text</label>
                                        <input
                                            type="text"
                                            value={formData.ctaText}
                                            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Button Link</label>
                                        <input
                                            type="text"
                                            value={formData.ctaLink}
                                            onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Display Order & Active */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                                        <input
                                            type="number"
                                            value={formData.displayOrder}
                                            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                                        <label className="flex items-center space-x-3 mt-3">
                                            <input
                                                type="checkbox"
                                                checked={formData.active}
                                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                                className="w-5 h-5 text-brand-red rounded focus:ring-2 focus:ring-brand-yellow"
                                            />
                                            <span className="text-gray-700">Active</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
                                >
                                    <Save size={20} />
                                    <span>{editingSlide ? 'Update Slide' : 'Create Slide'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroManager;
