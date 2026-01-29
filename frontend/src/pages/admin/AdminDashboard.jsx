import React from 'react';
import { Settings, Image, MessageSquare, Menu, ShoppingBag, Layers, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="bg-white rounded-xl shadow p-8 min-h-[80vh]">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your bakery website content and settings.</p>
            </div>

            {/* CMS Navigation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Hero Slides */}
                <Link to="/admin/hero-slides" className="group p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Image size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Hero Slides</h3>
                    <p className="text-gray-500 text-sm">Manage homepage carousel images and text.</p>
                </Link>

                {/* 2. Menu Manager */}
                <Link to="/admin/menu" className="group p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Menu size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Menu Manager</h3>
                    <p className="text-gray-500 text-sm">Organize website navigation links.</p>
                </Link>

                {/* 3. Products Manager (NEW) */}
                <Link to="/admin/products" className="group p-6 bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="h-12 w-12 bg-red-100 text-brand-red rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ShoppingBag size={24} />
                    </div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Products</h3>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">New</span>
                    </div>
                    <p className="text-gray-500 text-sm">Add, edit, or remove bakery items.</p>
                </Link>

                {/* 4. Categories Manager (NEW) */}
                <Link to="/admin/categories" className="group p-6 bg-gradient-to-br from-yellow-50 to-white border border-yellow-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="h-12 w-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Layers size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Categories</h3>
                    <p className="text-gray-500 text-sm">Manage product categories.</p>
                </Link>

                {/* 5. Leads */}
                <Link to="/admin/leads" className="group p-6 bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <MessageSquare size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Leads / Inquiries</h3>
                    <p className="text-gray-500 text-sm">View contact form submissions.</p>
                </Link>

                {/* 6. Settings */}
                <Link to="/admin/settings" className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="h-12 w-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Settings size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Site Settings</h3>
                    <p className="text-gray-500 text-sm">Configure basic site info.</p>
                </Link>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-gray-800">Need Help?</h4>
                    <p className="text-sm text-gray-500">Contact support if you need assistance managing your content.</p>
                </div>
                <a href="/" target="_blank" className="flex items-center space-x-2 text-brand-red font-bold hover:underline">
                    <span>View Live Site</span>
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
    );
};

export default AdminDashboard;
