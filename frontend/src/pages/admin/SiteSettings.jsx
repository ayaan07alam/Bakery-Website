import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, AlertCircle, CheckCircle, Upload, X, Image as ImageIcon } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8080/api`;

// Reusable image upload field
const ImageUploadField = ({ label, value, fieldName, onUpload, onChange }) => {
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
                    <div className="relative group inline-block w-full">
                        <img src={value} alt="preview" className="h-40 w-full object-cover rounded-lg shadow-sm" />
                        <button
                            type="button"
                            onClick={() => onUpload(fieldName, '')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md"
                        >
                            <X size={14} />
                        </button>
                        <label className="absolute bottom-2 right-2 bg-white/90 border border-gray-300 text-gray-700 font-bold py-1.5 px-3 rounded-lg text-xs inline-flex items-center gap-1 cursor-pointer hover:bg-gray-50 shadow-sm">
                            <Upload size={12} /> Change
                            <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
                        </label>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <ImageIcon size={28} className="mx-auto text-gray-400 mb-2" />
                        <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-all shadow-sm text-sm">
                            <Upload size={14} />
                            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                            <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
                        </label>
                        {value === '' && (
                            <div className="mt-2">
                                <input
                                    type="url"
                                    placeholder="Or paste image URL..."
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow mt-1"
                                    onBlur={(e) => { if (e.target.value) onUpload(fieldName, e.target.value); }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const SiteSettings = () => {
    const [settings, setSettings] = useState({
        // General
        siteName: '', tagline: '',
        // Contact
        phone: '', email: '', address: '', openingHours: '',
        // Social
        facebookUrl: '', instagramUrl: '', twitterUrl: '',
        // About Hero
        aboutHeroImage: '', aboutHeroBadge: '', aboutHeroTitle: '', aboutHeroSubtitle: '',
        // About Story
        aboutContentTitle: '', aboutContentText: '', aboutContentImage: '',
        // About Stats
        aboutStat1Number: '', aboutStat1Label: '', aboutStat2Number: '', aboutStat2Label: '',
        // About Values
        aboutValue1Title: '', aboutValue1Desc: '',
        aboutValue2Title: '', aboutValue2Desc: '',
        aboutValue3Title: '', aboutValue3Desc: '',
        // About Team
        aboutTeamTitle: '', aboutTeamSubtitle: '',
        aboutTeam1Image: '', aboutTeam1Name: '', aboutTeam1Role: '',
        aboutTeam2Image: '', aboutTeam2Name: '', aboutTeam2Role: '',
        aboutTeam3Image: '', aboutTeam3Name: '', aboutTeam3Role: '',
        aboutTeam4Image: '', aboutTeam4Name: '', aboutTeam4Role: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => { fetchSettings(); }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get(`${API_URL}/site-settings`);
            const d = response.data;
            setSettings({
                siteName: d.siteName || '', tagline: d.tagline || '',
                phone: d.phone || '', email: d.email || '', address: d.address || '', openingHours: d.openingHours || '',
                facebookUrl: d.facebookUrl || '', instagramUrl: d.instagramUrl || '', twitterUrl: d.twitterUrl || '',
                aboutHeroImage: d.aboutHeroImage || '', aboutHeroBadge: d.aboutHeroBadge || '',
                aboutHeroTitle: d.aboutHeroTitle || '', aboutHeroSubtitle: d.aboutHeroSubtitle || '',
                aboutContentTitle: d.aboutContentTitle || '', aboutContentText: d.aboutContentText || '',
                aboutContentImage: d.aboutContentImage || '',
                aboutStat1Number: d.aboutStat1Number || '', aboutStat1Label: d.aboutStat1Label || '',
                aboutStat2Number: d.aboutStat2Number || '', aboutStat2Label: d.aboutStat2Label || '',
                aboutValue1Title: d.aboutValue1Title || '', aboutValue1Desc: d.aboutValue1Desc || '',
                aboutValue2Title: d.aboutValue2Title || '', aboutValue2Desc: d.aboutValue2Desc || '',
                aboutValue3Title: d.aboutValue3Title || '', aboutValue3Desc: d.aboutValue3Desc || '',
                aboutTeamTitle: d.aboutTeamTitle || '', aboutTeamSubtitle: d.aboutTeamSubtitle || '',
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

    const handleChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });
    const handleImageUpload = (fieldName, url) => setSettings(prev => ({ ...prev, [fieldName]: url }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            await axios.put(`${API_URL}/site-settings`, settings);
            setMessage({ type: 'success', text: '✅ Settings saved successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 4000);
        } catch {
            setMessage({ type: 'error', text: 'Failed to save settings' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-xl">Loading...</div>
        </div>
    );

    const inputCls = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-shadow";
    const sectionTitle = (title, subtitle) => (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-6">

                {/* Sticky Save Banner */}
                {message.text && (
                    <div className={`sticky top-4 z-50 mb-6 p-4 rounded-xl flex items-center space-x-3 shadow-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span className="font-semibold">{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* ── GENERAL INFO ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        {sectionTitle('General Information')}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Site Name</label>
                                <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} className={inputCls} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tagline</label>
                                <input type="text" name="tagline" value={settings.tagline} onChange={handleChange} className={inputCls} />
                            </div>
                        </div>
                    </div>

                    {/* ── CONTACT ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        {sectionTitle('Contact Information')}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                                <input type="text" name="phone" value={settings.phone} onChange={handleChange} className={inputCls} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input type="email" name="email" value={settings.email} onChange={handleChange} className={inputCls} required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Opening Hours</label>
                                <input type="text" name="openingHours" value={settings.openingHours} onChange={handleChange} className={inputCls} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                                <textarea name="address" value={settings.address} onChange={handleChange} rows="2" className={inputCls} />
                            </div>
                        </div>
                    </div>

                    {/* ── SOCIAL MEDIA ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        {sectionTitle('Social Media Links')}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[['facebookUrl', 'Facebook URL'], ['instagramUrl', 'Instagram URL'], ['twitterUrl', 'Twitter / X URL']].map(([name, label]) => (
                                <div key={name}>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
                                    <input type="url" name={name} value={settings[name]} onChange={handleChange} placeholder="https://..." className={inputCls} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ══════════════════════════════════════ */}
                    {/*         ABOUT PAGE EDITOR              */}
                    {/* ══════════════════════════════════════ */}

                    {/* ── ABOUT HERO ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        {sectionTitle('About Page — Hero Section', 'The large banner at the top of the About page')}
                        <div className="space-y-5">
                            <ImageUploadField
                                label="Hero Background Image"
                                value={settings.aboutHeroImage}
                                fieldName="aboutHeroImage"
                                onUpload={handleImageUpload}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Badge Text (e.g. "Since 1978")</label>
                                    <input type="text" name="aboutHeroBadge" value={settings.aboutHeroBadge} onChange={handleChange} className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hero Title (Big Heading)</label>
                                    <input type="text" name="aboutHeroTitle" value={settings.aboutHeroTitle} onChange={handleChange} className={inputCls} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hero Subtitle</label>
                                    <input type="text" name="aboutHeroSubtitle" value={settings.aboutHeroSubtitle} onChange={handleChange} className={inputCls} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── ABOUT STORY ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        {sectionTitle('About Page — Our Story Section', 'The text + image section in the middle')}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                <input type="text" name="aboutContentTitle" value={settings.aboutContentTitle} onChange={handleChange} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Story Text (press Enter for new paragraphs)</label>
                                <textarea name="aboutContentText" value={settings.aboutContentText} onChange={handleChange} rows="7" className={inputCls} />
                            </div>
                            <ImageUploadField
                                label="Story Section Image (right side)"
                                value={settings.aboutContentImage}
                                fieldName="aboutContentImage"
                                onUpload={handleImageUpload}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Stat 1 — Number</label>
                                    <input type="text" name="aboutStat1Number" value={settings.aboutStat1Number} onChange={handleChange} placeholder="45+" className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Stat 1 — Label</label>
                                    <input type="text" name="aboutStat1Label" value={settings.aboutStat1Label} onChange={handleChange} placeholder="Years of Trust" className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Stat 2 — Number</label>
                                    <input type="text" name="aboutStat2Number" value={settings.aboutStat2Number} onChange={handleChange} placeholder="1M+" className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Stat 2 — Label</label>
                                    <input type="text" name="aboutStat2Label" value={settings.aboutStat2Label} onChange={handleChange} placeholder="Happy Customers" className={inputCls} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── CORE VALUES ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        {sectionTitle('About Page — Core Values Section', '3 highlight cards below the story')}
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                                    <p className="font-bold text-sm text-brand-red mb-3 uppercase tracking-wider">Card {i}</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                                            <input type="text" name={`aboutValue${i}Title`} value={settings[`aboutValue${i}Title`]} onChange={handleChange} className={inputCls} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                            <textarea name={`aboutValue${i}Desc`} value={settings[`aboutValue${i}Desc`]} onChange={handleChange} rows="2" className={inputCls} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── TEAM ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        {sectionTitle('About Page — Team Section', 'The 4-person photo grid at the bottom')}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                <input type="text" name="aboutTeamTitle" value={settings.aboutTeamTitle} onChange={handleChange} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Section Subtitle</label>
                                <textarea name="aboutTeamSubtitle" value={settings.aboutTeamSubtitle} onChange={handleChange} rows="2" className={inputCls} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                                        <p className="font-bold text-sm text-brand-red mb-3 uppercase tracking-wider">Team Member {i}</p>
                                        <ImageUploadField
                                            label="Photo"
                                            value={settings[`aboutTeam${i}Image`]}
                                            fieldName={`aboutTeam${i}Image`}
                                            onUpload={handleImageUpload}
                                        />
                                        <div className="grid grid-cols-2 gap-3 mt-3">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                                                <input type="text" name={`aboutTeam${i}Name`} value={settings[`aboutTeam${i}Name`]} onChange={handleChange} placeholder="e.g. Ravi Saha" className={inputCls} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                                                <input type="text" name={`aboutTeam${i}Role`} value={settings[`aboutTeam${i}Role`]} onChange={handleChange} placeholder="e.g. Head Baker" className={inputCls} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── SAVE BUTTON ── */}
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-brand-red hover:bg-red-600 text-white font-bold py-5 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
                    >
                        <Save size={22} />
                        <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SiteSettings;
