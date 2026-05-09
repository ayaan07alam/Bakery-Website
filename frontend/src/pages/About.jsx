import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Award, Heart, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const DEFAULTS = {
    aboutHeroImage: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2000",
    aboutHeroBadge: "Since 1978",
    aboutHeroTitle: "Our Story",
    aboutHeroSubtitle: "Baking happiness for nearly 50 years in the heart of Kolkata.",
    aboutContentTitle: "Tradition Meets Passion",
    aboutContentText: "Founded in 1978 by the Saha family, our bakery started as a humble storefront on Park Street with a single mission: to bring authentic, high-quality baked goods to our community.\n\nWhat began with just a few signature loaves of bread and simple tea cakes has grown into one of Kolkata's most beloved baking institutions. Despite our growth, our core philosophy remains unchanged – we never compromise on quality, we use only the finest ingredients, and we bake with love.",
    aboutContentImage: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000",
    aboutStat1Number: "45+",
    aboutStat1Label: "Years of Trust",
    aboutStat2Number: "1M+",
    aboutStat2Label: "Happy Customers",
    aboutValue1Title: "Premium Quality",
    aboutValue1Desc: "We use only Grade-A ingredients sourced from trusted local suppliers and top global brands.",
    aboutValue2Title: "Made with Love",
    aboutValue2Desc: "Every product is handcrafted by our team of master bakers who treat baking as an art form.",
    aboutValue3Title: "100% Eggless Options",
    aboutValue3Desc: "We are famous for our extensive range of 100% eggless cakes that taste just as divine.",
    aboutTeamTitle: "Meet The Makers",
    aboutTeamSubtitle: "Behind every delicious pastry is a team of dedicated professionals who wake up before dawn to ensure your morning bread is fresh.",
    aboutTeam1Image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=500&fit=crop",
    aboutTeam1Name: "", aboutTeam1Role: "",
    aboutTeam2Image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=500&fit=crop",
    aboutTeam2Name: "", aboutTeam2Role: "",
    aboutTeam3Image: "https://images.unsplash.com/photo-1539543424-3867b60db848?w=400&h=500&fit=crop",
    aboutTeam3Name: "", aboutTeam3Role: "",
    aboutTeam4Image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400&h=500&fit=crop",
    aboutTeam4Name: "", aboutTeam4Role: "",
};

const About = () => {
    const [s, setS] = useState(DEFAULTS);
    const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8080/api`;

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${API_URL}/site-settings`).then(res => {
            if (res.data) {
                setS(prev => {
                    const merged = { ...prev };
                    Object.keys(DEFAULTS).forEach(key => {
                        merged[key] = res.data[key] || DEFAULTS[key];
                    });
                    return merged;
                });
            }
        }).catch(err => console.error('Error fetching about settings', err));
    }, []);

    const valueIcons = [Award, Heart, CheckCircle];
    const values = [
        { title: s.aboutValue1Title, desc: s.aboutValue1Desc },
        { title: s.aboutValue2Title, desc: s.aboutValue2Desc },
        { title: s.aboutValue3Title, desc: s.aboutValue3Desc },
    ];
    const teamMembers = [
        { img: s.aboutTeam1Image, name: s.aboutTeam1Name, role: s.aboutTeam1Role },
        { img: s.aboutTeam2Image, name: s.aboutTeam2Name, role: s.aboutTeam2Role },
        { img: s.aboutTeam3Image, name: s.aboutTeam3Name, role: s.aboutTeam3Role },
        { img: s.aboutTeam4Image, name: s.aboutTeam4Name, role: s.aboutTeam4Role },
    ];

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
                        src={s.aboutHeroImage}
                        alt="About Saha Bakery"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
                </div>
                <div className="relative z-10 text-center text-white px-6 animate-fade-in-up">
                    <span className="inline-block text-brand-yellow font-bold tracking-[0.3em] text-sm uppercase mb-4">
                        {s.aboutHeroBadge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 drop-shadow-2xl">
                        {s.aboutHeroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed border-l-4 border-brand-yellow pl-6">
                        {s.aboutHeroSubtitle}
                    </p>
                </div>
            </div>

            {/* === OUR JOURNEY === */}
            <section className="py-20 md:py-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 animate-fade-in-up">
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-red-950">
                                {s.aboutContentTitle}
                            </h2>
                            <p className="text-lg text-gray-700 leading-loose text-justify whitespace-pre-line">
                                {s.aboutContentText}
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                                <div>
                                    <h4 className="text-4xl font-bold text-brand-red mb-2">{s.aboutStat1Number}</h4>
                                    <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">{s.aboutStat1Label}</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-bold text-brand-red mb-2">{s.aboutStat2Number}</h4>
                                    <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">{s.aboutStat2Label}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-brand-yellow/20 rounded-3xl transform rotate-3"></div>
                            <img
                                src={s.aboutContentImage}
                                alt="Our Bakery"
                                className="relative rounded-3xl shadow-premium transform -rotate-2 hover:rotate-0 transition-transform duration-500 hover:scale-105 object-cover h-[500px] w-full"
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
                        {values.map((item, idx) => {
                            const Icon = valueIcons[idx];
                            return (
                                <div key={idx} className="bg-red-50 p-10 rounded-3xl hover:bg-red-100 transition-colors duration-300 group">
                                    <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-brand-red mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* === TEAM SECTION === */}
            <section className="py-20 px-6">
                <div className="container mx-auto text-center max-w-5xl">
                    <h2 className="text-4xl font-display font-bold text-red-950 mb-6">{s.aboutTeamTitle}</h2>
                    <p className="text-lg text-gray-600 mb-12">{s.aboutTeamSubtitle}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {teamMembers.map((member, idx) => (
                            <div key={idx} className="group">
                                <div className="overflow-hidden rounded-2xl mb-3 shadow-md bg-white aspect-[3/4]">
                                    <img
                                        src={member.img}
                                        alt={member.name || `Team Member ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                                {member.name && (
                                    <div className="text-center">
                                        <h4 className="font-bold text-gray-800">{member.name}</h4>
                                        {member.role && <p className="text-sm text-brand-red font-medium">{member.role}</p>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
