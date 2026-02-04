import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Layers,
    Tag,
    MessageSquare,
    Star,
    Settings,
    LogOut,
    Home,
    Menu,
    Image
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
        { name: 'Hero Slides', path: '/admin/hero-slides', icon: Image },
        { name: 'Menu', path: '/admin/menu', icon: Menu },
        { name: 'Categories', path: '/admin/categories', icon: Layers },
        { name: 'Products', path: '/admin/products', icon: ShoppingBag },
        { name: 'Labels', path: '/admin/labels', icon: Tag },
        { name: 'Reviews', path: '/admin/reviews', icon: Star },
        { name: 'Leads', path: '/admin/leads', icon: MessageSquare },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                <h2 className="font-display font-bold text-2xl text-brand-red">Admin<span className="text-brand-dark">Panel</span></h2>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? 'bg-brand-red text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-brand-dark'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-2">
                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-brand-blue font-medium transition-colors"
                >
                    <Home size={20} />
                    <span>View Site</span>
                </a>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors text-left"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
