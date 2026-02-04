import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

const SiteSettings = () => {
    const [settings, setSettings] = useState({
        siteName: '',
        tagline: '',
        phone: '',
        email: '',
        address: '',
        openingHours: '',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/site-settings');
            setSettings(response.data);
            setLoading(false);
        } catch {
            console.error('Error fetching settings');
            setMessage({ type: 'error', text: 'Failed to load settings' });
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            await axios.put('http://localhost:8080/api/site-settings', settings);
            setMessage({ type: 'success', text: 'Settings saved successfully!' });
        } catch {
            setMessage({ type: 'error', text: 'Failed to save settings' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-display text-brand-dark mb-2">Site Settings</h1>
                        <p className="text-gray-600">Manage your website's core information</p>
                    </div>

                    {message.text && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}>
                            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span>{message.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* General Info */}
                        <div className="border-b pb-6">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">General Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Site Name</label>
                                    <input
                                        type="text"
                                        name="siteName"
                                        value={settings.siteName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tagline</label>
                                    <input
                                        type="text"
                                        name="tagline"
                                        value={settings.tagline}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="border-b pb-6">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={settings.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={settings.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Opening Hours</label>
                                    <input
                                        type="text"
                                        name="openingHours"
                                        value={settings.openingHours}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                                    <textarea
                                        name="address"
                                        value={settings.address}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Social Media Links</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Facebook</label>
                                    <input
                                        type="url"
                                        name="facebookUrl"
                                        value={settings.facebookUrl}
                                        onChange={handleChange}
                                        placeholder="https://facebook.com/..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Instagram</label>
                                    <input
                                        type="url"
                                        name="instagramUrl"
                                        value={settings.instagramUrl}
                                        onChange={handleChange}
                                        placeholder="https://instagram.com/..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Twitter</label>
                                    <input
                                        type="url"
                                        name="twitterUrl"
                                        value={settings.twitterUrl}
                                        onChange={handleChange}
                                        placeholder="https://twitter.com/..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            <Save size={20} />
                            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SiteSettings;
