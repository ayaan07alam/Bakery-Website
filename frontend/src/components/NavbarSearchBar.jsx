import React from 'react';
import { Search } from 'lucide-react';

const NavbarSearchBar = ({ onSearchClick }) => {
    return (
        <>
            {/* Desktop Search Bar - Full Width */}
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark" size={18} />
                <input
                    type="text"
                    placeholder="Search products..."
                    onClick={onSearchClick}
                    readOnly
                    className="w-72 pl-10 pr-4 py-2.5 bg-white text-brand-dark placeholder-gray-500 
                    rounded-full border-2 border-white hover:border-brand-yellow hover:bg-brand-yellow/10 
                    transition-all cursor-pointer focus:outline-none focus:border-brand-yellow shadow-md"
                />
            </div>

            {/* Mobile Search Icon */}
            <button
                onClick={onSearchClick}
                className="md:hidden h-10 w-10 flex items-center justify-center rounded-full bg-white text-brand-red hover:bg-brand-yellow hover:text-brand-dark transition-all"
            >
                <Search size={18} strokeWidth={2.5} />
            </button>
        </>
    );
};

export default NavbarSearchBar;
