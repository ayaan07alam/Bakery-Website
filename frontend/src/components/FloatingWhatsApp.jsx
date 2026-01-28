import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import axios from 'axios';

const FloatingWhatsApp = ({ currentPage = '', productName = '' }) => {
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
        let message = 'Hello! I would like to inquire about your bakery products.';

        // Customize message based on context
        if (productName) {
            message = `Hello! I'm interested in "${productName}". Could you provide more details?`;
        } else if (currentPage) {
            message = `Hello! I was browsing ${currentPage} and would like to know more.`;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="fixed bottom-24 right-5 z-50">
            {/* Main WhatsApp Button */}
            <button
                onClick={openWhatsApp}
                className="bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-green-500/50 border border-white/20 hover:scale-110 transition-all duration-300 z-50"
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
