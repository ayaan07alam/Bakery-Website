import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, AlertCircle, CheckCircle, Upload, X, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8080/api`;

// Reusable image upload component
const ImageUploadField = ({ label, value, fieldName, onUpload }) => {
    const [uploading, setUploading] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const form = new FormData();
            form.append('file', file);
            const res = await axios.post(`${API_URL}/upload`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const url = res.data.startsWith('http') ? res.data : `${API_URL.replace('/api', '')}${res.data}`;
            onUpload(fieldName, url);
        } catch {
            alert('Image upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-brand-yellow transition-colors bg-gray-50">
                {value ? (
                    <div className="relative">
                        <img src={value} alt="preview" className="h-44 w-full object-cover rounded-lg shadow-sm" />
                        <button
                            type="button"
                            onClick={() => onUpload(fieldName, '')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md"
                        >
                            <X size={14} />
                        </button>
                        <label className="absolute bottom-2 right-2 bg-white/90 border border-gray-300 text-gray-700 font-bold py-1.5 px-3 rounded-lg text-xs inline-flex items-center gap-1 cursor-pointer hover:bg-gray-50 shadow-sm">
                            <Upload size={12} /> Change Photo
                            <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
                        </label>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <ImageIcon size={32} className="mx-auto text-gray-400 mb-3" />
                        <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-5 rounded-lg inline-flex items-center gap-2 transition-all shadow-sm text-sm">
                            <Upload size={14} />
                            <span>{uploading ? 'Uploading...' : 'Upload Photo'}</span>
                            <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
                        </label>
                        <p className="text-xs text-gray-400 mt-2">JPG, PNG up to 10MB</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const DEFAULTS = {
    aboutHeroImage: '', aboutHeroBadge: 'Since 1978',
    aboutHeroTitle: 'Our Story', aboutHeroSubtitle: 'Baking happiness for nearly 50 years in the heart of Kolkata.',
    aboutContentTitle: 'Tradition Meets Passion',
    aboutContentText: "Founded in 1978 by the Saha family, our bakery started as a humble storefront on Park Street with a single mission: to bring authentic, high-quality baked goods to our community.\n\nWhat began with just a few signature loaves of bread and simple tea cakes has grown into one of Kolkata's most beloved baking institutions.",
    aboutContentImage: '',
    aboutStat1Number: '45+', aboutStat1Label: 'Years of Trust',
    aboutStat2Number: '1M+', aboutStat2Label: 'Happy Customers',
    aboutValue1Title: 'Premium Quality', aboutValue1Desc: 'We use only Grade-A ingredients sourced from trusted local suppliers and top global brands.',
    aboutValue2Title: 'Made with Love', aboutValue2Desc: 'Every product is handcrafted by our team of master bakers who treat baking as an art form.',
    aboutValue3Title: '100% Eggless Options', aboutValue3Desc: 'We are famous for our extensive range of 100% eggless cakes that taste just as divine.',
    aboutTeamTitle: 'Meet The Makers', aboutTeamSubtitle: 'Behind every delicious pastry is a team of dedicated professionals who wake up before dawn to ensure your morning bread is fresh.',
    aboutTeam1Image: '', aboutTeam1Name: '', aboutTeam1Role: '',
    aboutTeam2Image: '', aboutTeam2Name: '', aboutTeam2Role: '',
    aboutTeam3Image: '', aboutTeam3Name: '', aboutTeam3Role: '',
    aboutTeam4Image: '', aboutTeam4Name: '', aboutTeam4Role: '',
};

const AboutManager = () => {
    const [settings, setSettings] = useState(DEFAULTS);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => { fetchSettings(); }, []);

    const fetchSettings = async () => {
        try {
            const res = await axios.get(`${API_URL}/site-settings`);
            const d = res.data;
            setSettings({
                aboutHeroImage: d.aboutHeroImage || '',
                aboutHeroBadge: d.aboutHeroBadge || 'Since 1978',
                aboutHeroTitle: d.aboutHeroTitle || 'Our Story',
                aboutHeroSubtitle: d.aboutHeroSubtitle || '',
                aboutContentTitle: d.aboutContentTitle || '',
                aboutContentText: d.aboutContentText || '',
                aboutContentImage: d.aboutContentImage || '',
                aboutStat1Number: d.aboutStat1Number || '',
                aboutStat1Label: d.aboutStat1Label || '',
                aboutStat2Number: d.aboutStat2Number || '',
                aboutStat2Label: d.aboutStat2Label || '',
                aboutValue1Title: d.aboutValue1Title || '',
                aboutValue1Desc: d.aboutValue1Desc || '',
                aboutValue2Title: d.aboutValue2Title || '',
                aboutValue2Desc: d.aboutValue2Desc || '',
                aboutValue3Title: d.aboutValue3Title || '',
                aboutValue3Desc: d.aboutValue3Desc || '',
                aboutTeamTitle: d.aboutTeamTitle || '',
                aboutTeamSubtitle: d.aboutTeamSubtitle || '',
                aboutTeam1Image: d.aboutTeam1Image || '', aboutTeam1Name: d.aboutTeam1Name || '', aboutTeam1Role: d.aboutTeam1Role || '',
                aboutTeam2Image: d.aboutTeam2Image || '', aboutTeam2Name: d.aboutTeam2Name || '', aboutTeam2Role: d.aboutTeam2Role || '',
                aboutTeam3Image: d.aboutTeam3Image || '', aboutTeam3Name: d.aboutTeam3Name || '', aboutTeam3Role: d.aboutTeam3Role || '',
                aboutTeam4Image: d.aboutTeam4Image || '', aboutTeam4Name: d.aboutTeam4Name || '', aboutTeam4Role: d.aboutTeam4Role || '',
            });
            setLoading(false);
        } catch {
            setMessage({ type: 'error', text: 'Failed to load settings' });
            setLoading(false);
        }
    };

    const handleChange = (e) => setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleImageUpload = (fieldName, url) => setSettings(prev => ({ ...prev, [fieldName]: url }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            // We send only the about fields merged with current full settings
            const fullRes = await axios.get(`${API_URL}/site-settings`);
            const merged = { ...fullRes.data, ...settings };
            await axios.put(`${API_URL}/site-settings`, merged);
            setMessage({ type: 'success', text: '✅ About page updated successfully!' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setMessage({ type: '', text: '' }), 5000);
        } catch {
            setMessage({ type: 'error', text: 'Failed to save. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-xl text-gray-600">Loading...</div>
        </div>
    );

    const inputCls = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-shadow bg-white";

    const SectionCard = ({ title, subtitle, children }) => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
            <div className="p-8 space-y-5">{children}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-gray-900">About Page Manager</h1>
                            <p className="text-gray-500 text-sm mt-1">Edit all content and images on the About page</p>
                        </div>
                    </div>
                    <a href="/about" target="_blank" className="text-sm text-brand-red font-bold hover:underline flex items-center gap-1">
                        View Live →
                    </a>
                </div>

                {/* Success/Error Banner */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 shadow-md border ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span className="font-semibold">{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* ── HERO SECTION ── */}
                    <SectionCard title="🖼️ Hero Section" subtitle="The large banner at the very top of the About page">
                        <ImageUploadField label="Hero Background Image" value={settings.aboutHeroImage} fieldName="aboutHeroImage" onUpload={handleImageUpload} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text</label>
                                <input type="text" name="aboutHeroBadge" value={settings.aboutHeroBadge} onChange={handleChange} placeholder='e.g. "Since 1978"' className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Main Title (Big Heading)</label>
                                <input type="text" name="aboutHeroTitle" value={settings.aboutHeroTitle} onChange={handleChange} placeholder='e.g. "Our Story"' className={inputCls} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                                <input type="text" name="aboutHeroSubtitle" value={settings.aboutHeroSubtitle} onChange={handleChange} className={inputCls} />
                            </div>
                        </div>
                    </SectionCard>

                    {/* ── OUR STORY ── */}
                    <SectionCard title="📖 Our Story Section" subtitle="Text on the left, image on the right">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                            <input type="text" name="aboutContentTitle" value={settings.aboutContentTitle} onChange={handleChange} placeholder='e.g. "Tradition Meets Passion"' className={inputCls} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Story Text <span className="text-gray-400 font-normal">(Press Enter to add new paragraphs)</span></label>
                            <textarea name="aboutContentText" value={settings.aboutContentText} onChange={handleChange} rows="8" className={inputCls} />
                        </div>
                        <ImageUploadField label="Side Image (shown on the right)" value={settings.aboutContentImage} fieldName="aboutContentImage" onUpload={handleImageUpload} />
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Statistics (shown below the story text)</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <p className="text-xs font-bold text-brand-red uppercase tracking-wider mb-3">Stat 1</p>
                                    <div className="space-y-2">
                                        <input type="text" name="aboutStat1Number" value={settings.aboutStat1Number} onChange={handleChange} placeholder="45+" className={inputCls} />
                                        <input type="text" name="aboutStat1Label" value={settings.aboutStat1Label} onChange={handleChange} placeholder="Years of Trust" className={inputCls} />
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <p className="text-xs font-bold text-brand-red uppercase tracking-wider mb-3">Stat 2</p>
                                    <div className="space-y-2">
                                        <input type="text" name="aboutStat2Number" value={settings.aboutStat2Number} onChange={handleChange} placeholder="1M+" className={inputCls} />
                                        <input type="text" name="aboutStat2Label" value={settings.aboutStat2Label} onChange={handleChange} placeholder="Happy Customers" className={inputCls} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    {/* ── CORE VALUES ── */}
                    <SectionCard title="🏆 Core Values Section" subtitle='The 3 highlight cards (e.g. "Why We Are Different")'>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                    <p className="text-xs font-bold text-brand-red uppercase tracking-wider mb-3">Card {i}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-600 mb-1">Title</label>
                                            <input type="text" name={`aboutValue${i}Title`} value={settings[`aboutValue${i}Title`]} onChange={handleChange} className={inputCls} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-600 mb-1">Description</label>
                                            <input type="text" name={`aboutValue${i}Desc`} value={settings[`aboutValue${i}Desc`]} onChange={handleChange} className={inputCls} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* ── TEAM SECTION ── */}
                    <SectionCard title="👨‍🍳 Team Section" subtitle="The 4-photo team grid at the bottom of the About page">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                <input type="text" name="aboutTeamTitle" value={settings.aboutTeamTitle} onChange={handleChange} placeholder="Meet The Makers" className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Section Subtitle</label>
                                <input type="text" name="aboutTeamSubtitle" value={settings.aboutTeamSubtitle} onChange={handleChange} className={inputCls} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                    <p className="text-xs font-bold text-brand-red uppercase tracking-wider mb-4">Team Member {i}</p>
                                    <ImageUploadField
                                        label="Photo"
                                        value={settings[`aboutTeam${i}Image`]}
                                        fieldName={`aboutTeam${i}Image`}
                                        onUpload={handleImageUpload}
                                    />
                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-600 mb-1">Name</label>
                                            <input type="text" name={`aboutTeam${i}Name`} value={settings[`aboutTeam${i}Name`]} onChange={handleChange} placeholder="e.g. Ravi Saha" className={inputCls} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-600 mb-1">Role</label>
                                            <input type="text" name={`aboutTeam${i}Role`} value={settings[`aboutTeam${i}Role`]} onChange={handleChange} placeholder="e.g. Head Baker" className={inputCls} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* ── SAVE ── */}
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                    >
                        <Save size={22} />
                        {saving ? 'Saving...' : 'Save About Page'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AboutManager;
