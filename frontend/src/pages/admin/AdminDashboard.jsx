import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct, createProduct, fetchCategories } from '../../services/api';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    // Form State for Product
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        imageUrl: ''
    });

    // Form State for Category
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const prods = await fetchProducts();
        const cats = await fetchCategories();
        setProducts(prods);
        setCategories(cats);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            loadData();
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            categoryId: product.category?.id || '',
            imageUrl: product.imageUrl || ''
        });
        setEditId(product.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: '', categoryId: '', imageUrl: '' });
        setIsEditing(false);
        setEditId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            id: editId, // Include ID for update
            category: categories.find(c => c.id == formData.categoryId)
        };

        await createProduct(payload);

        resetForm();
        loadData();
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        if (!categoryName) return;

        await fetch('http://localhost:8080/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: categoryName })
        });

        setCategoryName('');
        setShowCategoryForm(false);
        loadData();
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowCategoryForm(!showCategoryForm)}
                        className="flex items-center space-x-2 bg-gray-100 text-brand-dark px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        <Plus size={20} />
                        <span>Add Category</span>
                    </button>
                    <button
                        onClick={() => { resetForm(); setShowForm(!showForm); }}
                        className="flex items-center space-x-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                    >
                        <Plus size={20} />
                        <span>{showForm ? 'Close Form' : 'Add Product'}</span>
                    </button>
                </div>
            </div>

            {/* Category Form */}
            {showCategoryForm && (
                <div className="mb-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4 text-brand-dark">Add New Category</h2>
                    <form onSubmit={handleCategorySubmit} className="flex gap-4">
                        <input
                            type="text" placeholder="Category Name" required
                            className="flex-1 p-2 border rounded"
                            value={categoryName} onChange={e => setCategoryName(e.target.value)}
                        />
                        <button type="submit" className="bg-brand-yellow text-brand-dark font-bold px-6 py-2 rounded hover:bg-yellow-400">Add</button>
                    </form>
                </div>
            )}

            {/* Product Form */}
            {showForm && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                        <button onClick={resetForm} className="text-gray-500 hover:text-red-500"><X size={20} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text" placeholder="Product Name" required
                            className="p-2 border rounded"
                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            type="number" placeholder="Price" required
                            className="p-2 border rounded"
                            value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                        <select
                            className="p-2 border rounded" required
                            value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <input
                            type="text" placeholder="Image URL"
                            className="p-2 border rounded"
                            value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                        <textarea
                            placeholder="Description" className="md:col-span-2 p-2 border rounded" rows="3"
                            value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                        <div className="md:col-span-2 flex space-x-2">
                            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center space-x-2">
                                <Save size={18} />
                                <span>{isEditing ? 'Update Product' : 'Save Product'}</span>
                            </button>
                            {isEditing && (
                                <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium">
                                    <div className="flex items-center space-x-3">
                                        <img src={product.imageUrl || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded object-cover" />
                                        <span>{product.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-500">{product.category?.name}</td>
                                <td className="p-4 font-bold">₹{product.price}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800 p-1 bg-blue-50 rounded"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 p-1 bg-red-50 rounded"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No products found. Start by adding one!</div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
