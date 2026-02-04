import React, { useState } from 'react';
import { Send, Mail } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden bg-brand-dark rounded-t-[3rem] mt-10">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-red blur-[100px]"></div>
                <div className="absolute bottom-[-50%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-yellow blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-brand-yellow font-bold text-sm uppercase tracking-wider mb-6 border border-white/10 animate-fade-in-up">
                    <Mail size={16} />
                    <span>Join the Inner Circle</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 animate-fade-in-up delay-100">
                    Get Sweet Offers & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-400">Exclusive Updates</span>
                </h2>

                <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
                    Subscribe to our newsletter and be the first to know about new seasonal menus, flash sales, and special events at Saha Bakery.
                </p>

                <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto animate-fade-in-up delay-300">
                    <div className="relative flex items-center">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full h-16 pl-6 pr-36 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow/50 transition-all backdrop-blur-sm"
                            required
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className={`absolute right-2 h-12 px-8 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center gap-2
                                ${status === 'success'
                                    ? 'bg-green-500 text-white cursor-default'
                                    : 'bg-brand-yellow text-brand-dark hover:bg-white hover:scale-105'
                                }`}
                        >
                            {status === 'loading' ? (
                                <span className="animate-pulse">Sending...</span>
                            ) : status === 'success' ? (
                                <span>Joined!</span>
                            ) : (
                                <>
                                    <span>Subscribe</span>
                                    <Send size={16} />
                                </>
                            )}
                        </button>
                    </div>
                    {status === 'success' && (
                        <p className="absolute -bottom-8 left-0 w-full text-center text-green-400 text-sm font-medium animate-fade-in">
                            Thank you for subscribing! Check your inbox soon.
                        </p>
                    )}
                </form>

                <p className="mt-8 text-gray-500 text-sm animate-fade-in-up delay-400">
                    We respect your privacy. No spam, ever.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
