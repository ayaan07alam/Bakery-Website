import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Upload, X, Save, Search, Image as ImageIcon } from 'lucide-react';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        imageUrl: ''
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
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
            const response = await axios.post(`${API_URL}/categories/upload`, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const url = response.data.startsWith('http') ? response.data : `${API_URL.replace('/api', '')}${response.data}`;
            setFormData({ ...formData, imageUrl: url });
            setUploading(false);
        } catch (error) {
            alert('Image upload failed');
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await axios.put(`${API_URL}/categories/${editingCategory.id}`, formData);
            } else {
                await axios.post(`${API_URL}/categories`, formData);
            }
            fetchCategories();
            closeModal();
        } catch (error) {
            alert('Failed to save category');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this category? Products in this category might lose their association.')) return;
        try {
            await axios.delete(`${API_URL}/categories/${id}`);
            fetchCategories();
        } catch (error) {
            alert('Failed to delete category');
        }
    };

    const openModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                imageUrl: category.imageUrl || '' // Handle if imageUrl didn't exist before
            });
        } else {
            setEditingCategory(null);
            setFormData({ name: '', imageUrl: '' });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        setFormData({ name: '', imageUrl: '' });
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-xl">Loading...</div></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-display text-brand-dark mb-2">Category Manager</h1>
                        <p className="text-gray-600">Organize your products</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow w-64"
                            />
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="bg-brand-red hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl flex items-center space-x-2 transition-all shadow-md"
                        >
                            <Plus size={20} />
                            <span>Add Category</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((category) => (
                        <div key={category.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all flex items-center p-4 gap-4">
                            <div className="h-20 w-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {category.imageUrl ? (
                                    <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <ImageIcon size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-gray-800">{category.name}</h3>
                                <p className="text-xs text-gray-500">ID: {category.id}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openModal(category)}
                                    className="p-2 bg-blue-50 text-brand-blue rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
                            <div className="p-6 border-b flex justify-between items-center bg-white rounded-t-2xl">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category Image (Optional)</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-brand-yellow transition-colors bg-gray-50">
                                        {formData.imageUrl ? (
                                            <div className="relative inline-block">
                                                <img src={formData.imageUrl} alt="Preview" className="max-h-32 rounded-lg shadow-md" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-md"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                                                <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded-lg inline-flex items-center space-x-2 transition-all shadow-sm">
                                                    <span>{uploading ? 'Uploading...' : 'Upload Icon'}</span>
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

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-shadow"
                                        required
                                        placeholder="e.g. Cakes"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    <Save size={20} />
                                    <span>{editingCategory ? 'Update Category' : 'Create Category'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryManager;
