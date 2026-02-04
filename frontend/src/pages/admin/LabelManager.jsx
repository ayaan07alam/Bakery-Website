import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, Save, X, Tag } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';

const LabelManager = () => {
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLabel, setCurrentLabel] = useState({ name: '', color: '#ef4444', textColor: '#ffffff' });
    const [message, setMessage] = useState({ type: '', text: '' });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    const fetchLabels = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/product-labels`);
            setLabels(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching labels:', error);
            setMessage({ type: 'error', text: 'Failed to fetch labels' });
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchLabels();
    }, [fetchLabels]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/product-labels`, currentLabel);
            setMessage({ type: 'success', text: 'Label saved successfully!' });
            setIsModalOpen(false);
            setCurrentLabel({ name: '', color: '#ef4444', textColor: '#ffffff' });
            fetchLabels();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save label' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this label?')) return;
        try {
            await axios.delete(`${API_URL}/product-labels/${id}`);
            setMessage({ type: 'success', text: 'Label deleted successfully!' });
            fetchLabels();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete label' });
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="flex-1 overflow-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-800">Product Labels</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-brand-red text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2 font-bold shadow-lg"
                    >
                        <Plus size={20} />
                        Add New Label
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
                        {labels.map(label => (
                            <div key={label.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="px-4 py-1.5 rounded-full text-sm font-bold shadow-sm"
                                        style={{ backgroundColor: label.color, color: label.textColor }}
                                    >
                                        {label.name}
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Bg: {label.color}</p>
                                        <p className="text-gray-500 text-xs">Text: {label.textColor}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(label.id)}
                                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Create Label</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Label Name</label>
                                    <input
                                        type="text"
                                        value={currentLabel.name}
                                        onChange={(e) => setCurrentLabel({ ...currentLabel, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                                        placeholder="e.g. Trending, Sale"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Background Color</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={currentLabel.color}
                                                onChange={(e) => setCurrentLabel({ ...currentLabel, color: e.target.value })}
                                                className="h-10 w-10 rounded cursor-pointer border-0"
                                            />
                                            <span className="text-sm text-gray-500">{currentLabel.color}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Text Color</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={currentLabel.textColor}
                                                onChange={(e) => setCurrentLabel({ ...currentLabel, textColor: e.target.value })}
                                                className="h-10 w-10 rounded cursor-pointer border-0"
                                            />
                                            <span className="text-sm text-gray-500">{currentLabel.textColor}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-center">
                                    <span
                                        className="px-4 py-1.5 rounded-full text-sm font-bold shadow-sm"
                                        style={{ backgroundColor: currentLabel.color, color: currentLabel.textColor }}
                                    >
                                        {currentLabel.name || 'Preview'}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Save Label
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LabelManager;
