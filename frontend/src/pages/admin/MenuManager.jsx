import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, X } from 'lucide-react';

const MenuManager = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        displayOrder: 0,
        visible: true,
        openInNewTab: false,
        parent: null
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(`${API_URL}/menu-items/admin`);
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await axios.put(`${API_URL}/menu-items/${editingItem.id}`, formData);
            } else {
                await axios.post(`${API_URL}/menu-items`, formData);
            }
            fetchMenuItems();
            closeModal();
        } catch (error) {
            alert('Failed to save menu item');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this menu item?')) return;
        try {
            await axios.delete(`${API_URL}/menu-items/${id}`);
            fetchMenuItems();
        } catch (error) {
            alert('Failed to delete menu item');
        }
    };

    const toggleVisibility = async (item) => {
        try {
            await axios.put(`${API_URL}/menu-items/${item.id}`, {
                ...item,
                visible: !item.visible
            });
            fetchMenuItems();
        } catch (error) {
            alert('Failed to toggle visibility');
        }
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                link: item.link,
                displayOrder: item.displayOrder,
                visible: item.visible,
                openInNewTab: item.openInNewTab,
                parent: item.parent
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                link: '',
                displayOrder: menuItems.length,
                visible: true,
                openInNewTab: false,
                parent: null
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({ name: '', link: '', displayOrder: 0, visible: true, openInNewTab: false, parent: null });
    };

    const initializeMenu = async () => {
        try {
            await axios.post(`${API_URL}/menu-items/initialize`);
            fetchMenuItems();
            alert('Menu initialized with default items');
        } catch (error) {
            alert('Failed to initialize menu');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-display text-brand-dark mb-2">Menu Manager</h1>
                        <p className="text-gray-600">Customize your website navigation menu</p>
                    </div>
                    <div className="flex space-x-3">
                        {menuItems.length === 0 && (
                            <button
                                onClick={initializeMenu}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                            >
                                Initialize Default Menu
                            </button>
                        )}
                        <button
                            onClick={() => openModal()}
                            className="flex items-center space-x-2 bg-brand-red hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                        >
                            <Plus size={20} />
                            <span>Add Menu Item</span>
                        </button>
                    </div>
                </div>

                {/* Menu Items Table */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="text-left p-4 font-bold">Order</th>
                                <th className="text-left p-4 font-bold">Name</th>
                                <th className="text-left p-4 font-bold">Link</th>
                                <th className="text-left p-4 font-bold">Children</th>
                                <th className="text-left p-4 font-bold">Status</th>
                                <th className="text-left p-4 font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {menuItems.map(item => (
                                <React.Fragment key={item.id}>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-4 font-bold">{item.displayOrder}</td>
                                        <td className="p-4 font-semibold">{item.name}</td>
                                        <td className="p-4 text-gray-600">{item.link}</td>
                                        <td className="p-4">
                                            {item.children?.length > 0 && (
                                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                                                    {item.children.length} items
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => toggleVisibility(item)}
                                                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold ${item.visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {item.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                                                <span>{item.visible ? 'Visible' : 'Hidden'}</span>
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openModal(item)}
                                                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Child items */}
                                    {item.children?.map(child => (
                                        <tr key={child.id} className="bg-gray-50/50 hover:bg-gray-100">
                                            <td className="p-4 pl-12 text-sm">↳ {child.displayOrder}</td>
                                            <td className="p-4 text-sm">{child.name}</td>
                                            <td className="p-4 text-sm text-gray-600">{child.link}</td>
                                            <td className="p-4"></td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${child.visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {child.visible ? 'Visible' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openModal(child)}
                                                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(child.id)}
                                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-lg w-full p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        placeholder="Home, About, Contact..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Link/URL *</label>
                                    <input
                                        type="text"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        placeholder="/, /shop, /contact, https://..."
                                    />
                                </div>

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
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Parent (Optional)</label>
                                        <select
                                            value={formData.parent?.id || ''}
                                            onChange={(e) => {
                                                const parentId = e.target.value;
                                                const parent = parentId ? menuItems.find(m => m.id === parseInt(parentId)) : null;
                                                setFormData({ ...formData, parent });
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        >
                                            <option value="">None (Top Level)</option>
                                            {menuItems.map(item => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.visible}
                                            onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                                            className="w-5 h-5 text-brand-yellow rounded"
                                        />
                                        <span className="text-sm font-bold">Visible</span>
                                    </label>

                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.openInNewTab}
                                            onChange={(e) => setFormData({ ...formData, openInNewTab: e.target.checked })}
                                            className="w-5 h-5 text-brand-yellow rounded"
                                        />
                                        <span className="text-sm font-bold">Open in new tab</span>
                                    </label>
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-brand-red hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                                    >
                                        {editingItem ? 'Update' : 'Create'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all"
                                    >
                                        Cancel
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

export default MenuManager;
