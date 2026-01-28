import React, { useEffect } from 'react';
import { Award, Clock, Heart, Users, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-red-50 min-h-screen">
            <SEO
                title="About Us - Our Story Since 1978"
                description="Discover the Saha Bakery story. Baking happiness for nearly 50 years in Berhampore with traditional recipes, premium ingredients, and handcrafted delicacies. Family-owned since 1978."
                keywords="Saha Bakery Story, About Saha Bakery, Bakery History, Traditional Bakery, Family Bakery Berhampore"
            />
            {/* === HERO SECTION === */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000"
                        alt="Bakery Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
                </div>

                <div className="relative z-10 text-center text-white px-6 animate-fade-in-up">
                    <span className="inline-block text-brand-yellow font-bold tracking-[0.3em] text-sm uppercase mb-4">Since 1978</span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 drop-shadow-2xl">
                        Our Story
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed border-l-4 border-brand-yellow pl-6">
                        Baking happiness for nearly 50 years in the heart of Kolkata.
                    </p>
                </div>
            </div>

            {/* === OUR JOURNEY === */}
            <section className="py-20 md:py-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 animate-fade-in-up">
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-red-950">
                                Tradition Meets <span className="text-brand-red">Passion</span>
                            </h2>
                            <p className="text-lg text-gray-700 leading-loose text-justify">
                                Founded in 1978 by the Saha family, our bakery started as a humble storefront on Park Street with a single mission: to bring authentic, high-quality baked goods to our community.
                                <br /><br />
                                What began with just a few signature loaves of bread and simple tea cakes has grown into one of Kolkata's most beloved baking institutions. Despite our growth, our core philosophy remains unchanged – we never compromise on quality, we use only the finest ingredients, and we bake with love.
                            </p>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                                <div>
                                    <h4 className="text-4xl font-bold text-brand-red mb-2">45+</h4>
                                    <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">Years of Trust</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-bold text-brand-red mb-2">1M+</h4>
                                    <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">Happy Customers</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-brand-yellow/20 rounded-3xl transform rotate-3"></div>
                            <img
                                src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000"
                                alt="Master Baker"
                                className="relative rounded-3xl shadow-premium transform -rotate-2 hover:rotate-0 transition-transform duration-500 hover:scale-105 object-cover h-[600px] w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* === CORE VALUES === */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-brand-red font-bold uppercase tracking-widest text-sm bg-red-50 px-4 py-2 rounded-full">Our Philosophy</span>
                        <h2 className="text-4xl font-display font-bold text-gray-900 mt-4">Why We Are Different</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Award,
                                title: "Premium Quality",
                                desc: "We use only Grade-A ingredients sourced from trusted local suppliers and top global brands."
                            },
                            {
                                icon: Heart,
                                title: "Made with Love",
                                desc: "Every product is handcrafted by our team of master bakers who treat baking as an art form."
                            },
                            {
                                icon: CheckCircle,
                                title: "100% Eggless Options",
                                desc: "We are famous for our extensive range of 100% eggless cakes that taste just as divine."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-red-50 p-10 rounded-3xl hover:bg-red-100 transition-colors duration-300 group">
                                <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-brand-red mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === TEAM SECTION === */}
            <section className="py-20 px-6">
                <div className="container mx-auto text-center max-w-4xl">
                    <h2 className="text-4xl font-display font-bold text-red-950 mb-6">Meet The Makers</h2>
                    <p className="text-lg text-gray-600 mb-12">
                        Behind every delicious pastry is a team of dedicated professionals who wake up before dawn to ensure your morning bread is fresh.
                    </p>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="group">
                                <div className="overflow-hidden rounded-2xl mb-4 shadow-md bg-white aspect-[3/4]">
                                    <img
                                        src={`https://images.unsplash.com/photo-${item === 1 ? '1583394293214-28ded15ee548' : item === 2 ? '1595273670150-bd0c3c392e46' : item === 3 ? '1539543424-3867b60db848' : '1556910103-1c02745a30bf'}?w=400&h=500&fit=crop`}
                                        alt="Team Member"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
