import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login for now
        navigate('/admin');
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-center text-brand-dark">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" placeholder="admin" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" placeholder="••••••" />
                </div>
                <button type="submit" className="w-full bg-brand-dark text-white py-2 rounded-lg font-bold hover:bg-black transition">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
