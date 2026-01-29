import React, { useState } from 'react';
import axios from 'axios';
import { Send, Mail, Phone as PhoneIcon, User, MessageSquare, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

        try {
            await axios.post(`${API_URL}/contact`, formData);
            setStatus({ type: 'success', message: 'Thank you! We\'ll get back to you soon.' });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <SEO
                title="Contact Us - Get in Touch"
                description="Contact Saha Bakery for custom orders, queries, or franchise inquiries. Visit us in Berhampore or call us for fresh cakes, pastries, and traditional sweets."
                keywords="Contact Saha Bakery, Bakery Contact Berhampore, Order Cakes Online, Custom Cake Orders, Bakery Franchise"
            />
            <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
                {/* Compact Header */}
                <div className="text-center mb-10 animate-fade-in-up">
                    <span className="inline-block text-brand-red font-bold tracking-[0.3em] text-xs uppercase bg-red-50 px-4 py-1.5 rounded-full mb-3">
                        Contact Us
                    </span>
                    <h1 className="text-4xl md:text-5xl font-display text-red-950 mb-4">Get In Touch</h1>
                    <p className="text-amber-900/80 text-base max-w-2xl mx-auto">
                        Have a question about our cakes or want to place a custom order? We'd love to hear from you!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8 animate-slide-in-left">
                        <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-premium transition-all duration-500 border border-gray-100 group">
                            <div className="flex items-start space-x-6">
                                <div className="bg-brand-yellow/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <PhoneIcon size={32} className="text-brand-red" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-2xl text-yellow-950 mb-2">Phone</h3>
                                    <p className="text-amber-900/80 text-lg mb-1">+91 95631 71459</p>
                                    <p className="text-amber-900/50 text-sm">Mon-Sun 9am to 6pm</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-premium transition-all duration-500 border border-gray-100 group">
                            <div className="flex items-start space-x-6">
                                <div className="bg-brand-yellow/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Mail size={32} className="text-brand-red" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-2xl text-yellow-950 mb-2">Email</h3>
                                    <p className="text-amber-900/80 text-lg mb-1">bakerysaha18@gmail.com</p>
                                    <p className="text-amber-900/50 text-sm">Online support 24/7</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-3xl shadow-soft hover:shadow-premium transition-all duration-500 border border-gray-100 group overflow-hidden">
                            <h3 className="font-display font-bold text-2xl text-yellow-950 mb-4 px-4 pt-2">Visit Our Bakery</h3>
                            <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-inner">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.3691689506063!2d88.24516469999999!3d24.0885097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f97e7f96df04b1%3A0xe3d2901896b57a4d!2sSaha%20Bakery!5e0!3m2!1sen!2sin!4v1769431188587!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Saha Bakery Location"
                                ></iframe>
                            </div>
                            <div className="px-4 pb-2 mt-4">
                                <p className="mb-2 text-lg leading-relaxed text-amber-900/80">Saha Bakery</p>
                                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-lg font-bold text-sm">
                                    <CheckCircle size={14} />
                                    <span>Open: 7:00 AM - 10:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-premium border border-gray-100 animate-slide-in-right">
                        <h2 className="text-3xl font-display font-bold text-red-950 mb-8">Send a Message</h2>

                        {status.message && (
                            <div className={`mb-8 p-6 rounded-2xl flex items-center space-x-4 ${status.type === 'success' ? 'bg-green-50 text-green-800 border-green-100' : 'bg-red-50 text-red-800 border-red-100'
                                } border animate-fade-in`}>
                                {status.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                                <span className="font-medium">{status.message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all outline-none"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all outline-none"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all outline-none"
                                        placeholder="+91..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all outline-none"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all outline-none resize-none"
                                    placeholder="Your message here..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                            >
                                <Send size={22} className={loading ? 'animate-pulse' : ''} />
                                <span className="text-lg uppercase tracking-wider">{loading ? 'Sending Message...' : 'Send Message'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
