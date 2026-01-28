import React from 'react';

const PremiumLoader = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 animate-fade-in">
            <div className="relative w-16 h-16">
                {/* Outer Ring - Red */}
                <div className="absolute inset-0 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin"></div>

                {/* Inner Ring - Yellow */}
                <div className="absolute inset-3 border-4 border-brand-yellow/20 border-b-brand-yellow rounded-full animate-spin-reverse"></div>

                {/* Center Dot */}
                <div className="absolute inset-[26px] bg-brand-red rounded-full animate-pulse-slow"></div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <span className="font-logo text-2xl text-brand-red tracking-wide">Saha Bakery</span>
                <span className="text-sm font-sans text-brand-dark/60 font-medium tracking-widest uppercase">Baking Happiness...</span>
            </div>
        </div>
    );
};

export default PremiumLoader;
