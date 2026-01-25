import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import axios from 'axios';

const FloatingWhatsApp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [phone, setPhone] = useState('+919876543210');

    useEffect(() => {
        fetchPhoneNumber();
    }, []);

    const fetchPhoneNumber = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/site-settings');
            if (response.data.phone) {
                // Remove spaces and special chars for WhatsApp link
                setPhone(response.data.phone.replace(/[^0-9+]/g, ''));
            }
        } catch (error) {
            console.error('Error fetching phone:', error);
        }
    };

    const openWhatsApp = () => {
        const message = encodeURIComponent('Hello! I would like to inquire about your bakery products.');
        const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Main WhatsApp Button */}
            <button
                onClick={openWhatsApp}
                className="bg-[#25D366] hover:bg-[#20BA59] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse"
                aria-label="Contact us on WhatsApp"
            >
                <MessageCircle size={32} fill="white" />
            </button>

            {/* Tooltip */}
            <div className="absolute bottom-20 right-0 bg-white text-brand-dark px-4 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Chat with us!
            </div>
        </div>
    );
};

export default FloatingWhatsApp;
