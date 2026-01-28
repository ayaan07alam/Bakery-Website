import React, { useEffect } from 'react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-red-950 mb-4">Terms of Service</h1>
                    <p className="text-gray-500">Last Updated: January 2026</p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the Saha Bakery website, you accept and agree to be bound by the terms and provision of this agreement.
                            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">2. Ordering & Payment</h2>
                        <p>
                            All orders placed through our website are subject to availability and confirmation of the order price.
                            Establishment of an order occurs when you receive a confirmation email from us.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>We reserve the right to refuse any order.</li>
                            <li>Prices are subject to change without notice.</li>
                            <li>Payment must be received in full before dispatch of products.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">3. Delivery Policy</h2>
                        <p>
                            We aim to deliver products within the estimated timeframes; however, delays are occasionally inevitable due to unforeseen factors.
                            Saha Bakery shall be under no liability for any delay or failure to deliver the products within estimated timescales.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">4. Refunds & Cancellations</h2>
                        <p>
                            Due to the perishable nature of our products, we do not generally offer refunds after the order has been processed.
                            Cancellations must be made at least 24 hours before the scheduled delivery time to be eligible for a refund.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">5. Intellectual Property</h2>
                        <p>
                            The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and other proprietary laws.
                            The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
