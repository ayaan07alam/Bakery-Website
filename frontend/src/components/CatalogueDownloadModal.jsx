import React, { useState } from 'react';
import { X, Download, CheckCircle } from 'lucide-react';
import axios from 'axios';

const CatalogueDownloadModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('http://localhost:8080/api/catalogue/download', formData);
            setSuccess(true);

            // Trigger PDF download (you'll need to add a real PDF later)
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = '/catalogue.pdf'; // Place your PDF in public folder
                link.download = 'Saha-Bakery-Catalogue.pdf';
                link.click();

                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setFormData({ name: '', email: '' });
                }, 1500);
            }, 1000);
        } catch (error) {
            alert('Failed to process request.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl transform animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                    <X size={24} className="text-gray-600" />
                </button>

                <div className="relative p-8 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white text-center">
                    <Download size={56} className="mx-auto mb-4 drop-shadow-lg" />
                    <h2 className="text-3xl font-display mb-2">Download Our Full Catalogue</h2>
                    <p className="text-white/90">Browse 100+ premium bakery items!</p>
                </div>

                <div className="p-8">
                    {success ? (
                        <div className="text-center py-6">
                            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Download Starting...</h3>
                            <p className="text-gray-600">Check your downloads folder!</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-600 text-center mb-6">
                                Enter your details to get instant access to our complete product catalogue
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                                >
                                    <Download size={20} />
                                    <span>{loading ? 'Processing...' : 'Download Catalogue'}</span>
                                </button>

                                <p className="text-xs text-gray-500 text-center">
                                    By downloading, you agree to receive updates from us. Unsubscribe anytime.
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogueDownloadModal;
