import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Upload, X, Save, Search, Image as ImageIcon } from 'lucide-react';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [labels, setLabels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: null,
        label: null,
        available: true
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
            setLoading(false);
        } catch {
            console.error('Error fetching products');
            setLoading(false);
        }
    }, [API_URL]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            setCategories(response.data);
        } catch {
            console.error('Error fetching categories');
        }
    }, [API_URL]);

    const fetchLabels = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/product-labels`);
            setLabels(response.data);
        } catch {
            console.error('Error fetching labels');
        }
    }, [API_URL]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchLabels();
    }, [fetchProducts, fetchCategories, fetchLabels]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        setUploading(true);
        try {
            const response = await axios.post(`${API_URL}/products/upload`, formDataUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Ensure full URL is stored if backend returns relative path
            const url = response.data.startsWith('http') ? response.data : `${API_URL.replace('/api', '')}${response.data}`;
            setFormData({ ...formData, imageUrl: url });
            setUploading(false);
        } catch {
            alert('Image upload failed');
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (editingProduct) {
                await axios.put(`${API_URL}/products/${editingProduct.id}`, payload);
            } else {
                await axios.post(`${API_URL}/products`, payload);
            }
            fetchProducts();
            closeModal();
        } catch (error) {
            console.error(error);
            alert('Failed to save product');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this product?')) return;
        try {
            await axios.delete(`${API_URL}/products/${id}`);
            fetchProducts();
        } catch {
            alert('Failed to delete product');
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                imageUrl: product.imageUrl,
                category: product.category,
                label: product.label,
                available: product.available !== undefined ? product.available : true
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                imageUrl: '',
                category: categories.length > 0 ? categories[0] : null,
                label: null,
                available: true
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            imageUrl: '',
            category: null,
            label: null,
            available: true
        });
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-xl">Loading...</div></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-display text-brand-dark mb-2">Product Manager</h1>
                        <p className="text-gray-600">Manage your bakery items</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow w-full md:w-64"
                            />
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="bg-brand-red hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl flex items-center space-x-2 transition-all shadow-md whitespace-nowrap"
                        >
                            <Plus size={20} />
                            <span>Add Product</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all group">
                            <div className="h-48 bg-gray-100 relative overflow-hidden">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold text-brand-dark shadow-sm">
                                    ₹{product.price}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="mb-3">
                                    <span className="text-xs font-bold text-brand-red uppercase tracking-wider bg-red-50 px-2 py-1 rounded-md">
                                        {product.category?.name || 'Uncategorized'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800 truncate">{product.name}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className={`text-xs font-bold flex items-center gap-1 ${product.available !== false ? 'text-green-600' : 'text-red-500'}`}>
                                        <span className={`w-2 h-2 rounded-full ${product.available !== false ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {product.available !== false ? 'In Stock' : 'Unavailable'}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openModal(product)}
                                            className="p-2 bg-blue-50 text-brand-blue rounded-lg hover:bg-blue-100 transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
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
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-brand-yellow transition-colors bg-gray-50">
                                        {formData.imageUrl ? (
                                            <div className="relative inline-block">
                                                <img src={formData.imageUrl} alt="Preview" className="max-h-48 rounded-lg shadow-md" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                                                <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded-lg inline-flex items-center space-x-2 transition-all shadow-sm">
                                                    <span>{uploading ? 'Uploading...' : 'Upload Photo'}</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                        disabled={uploading}
                                                    />
                                                </label>
                                                <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 5MB</p>
                                                <p className="text-xs text-brand-blue font-semibold mt-1">📐 Recommended: 800x800px (Square)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-shadow"
                                            required
                                            placeholder="e.g. Chocolate Truffle"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                        <select
                                            value={formData.category?.id || ''}
                                            onChange={(e) => {
                                                const catId = e.target.value;
                                                const cat = categories.find(c => c.id === parseInt(catId));
                                                setFormData({ ...formData, category: cat });
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white"
                                            required
                                        >
                                            <option value="" disabled>Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-shadow"
                                                required
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Label</label>
                                        <select
                                            value={formData.label?.id || ''}
                                            onChange={(e) => {
                                                const labelId = e.target.value;
                                                const label = labels.find(l => l.id === parseInt(labelId));
                                                setFormData({ ...formData, label: label || null });
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent bg-white"
                                        >
                                            <option value="">No Label</option>
                                            {labels.map(lbl => (
                                                <option key={lbl.id} value={lbl.id}>{lbl.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Availability</label>
                                        <div className="flex items-center space-x-4 mt-3">
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={formData.available !== false}
                                                    onChange={() => setFormData({ ...formData, available: true })}
                                                    className="text-brand-yellow focus:ring-brand-yellow"
                                                />
                                                <span className="text-gray-700">In Stock</span>
                                            </label>
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    checked={formData.available === false}
                                                    onChange={() => setFormData({ ...formData, available: false })}
                                                    className="text-red-500 focus:ring-red-500"
                                                />
                                                <span className="text-gray-700">Out of Stock</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-shadow resize-none"
                                        placeholder="Describe the taste, ingredients, etc."
                                    />
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-brand-red hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <Save size={20} />
                                        <span>{editingProduct ? 'Update Product' : 'Create Product'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductManager;

