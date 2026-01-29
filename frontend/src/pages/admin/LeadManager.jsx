import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, MessageSquare, CheckCircle, Trash2, Download, Calendar, Eye, Clock, Users } from 'lucide-react';

const LeadManager = () => {
    const [activeTab, setActiveTab] = useState('contact');
    const [contacts, setContacts] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [visitorSessions, setVisitorSessions] = useState([]);
    const [callbacks, setCallbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contactRes, subscriberRes, sessionsRes, callbacksRes] = await Promise.all([
                axios.get(`${API_URL}/contact`),
                axios.get(`${API_URL}/newsletter/subscribers`),
                axios.get(`${API_URL}/visitor-sessions`),
                axios.get(`${API_URL}/callback-requests`)
            ]);
            setContacts(contactRes.data);
            setSubscribers(subscriberRes.data);
            setVisitorSessions(sessionsRes.data);
            setCallbacks(callbacksRes.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (id) => {
        try {
            await axios.put(`${API_URL}/contact/${id}/resolve`);
            fetchData();
        } catch (error) {
            alert('Failed to resolve inquiry');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this inquiry?')) return;
        try {
            await axios.delete(`${API_URL}/contact/${id}`);
            fetchData();
        } catch (error) {
            alert('Failed to delete inquiry');
        }
    };

    const updateCallbackStatus = async (id, status, notes = '') => {
        try {
            await axios.put(`${API_URL}/callback-requests/${id}/status`, {
                status,
                notes
            });
            fetchData();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const exportToCSV = () => {
        let csvContent = '';
        let filename = '';

        if (activeTab === 'contact') {
            csvContent = 'data:text/csv;charset=utf-8,';
            csvContent += 'Name,Email,Phone,Subject,Message,Created,Resolved\n';
            contacts.forEach(c => {
                csvContent += `"${c.name}","${c.email}","${c.phone || 'N/A'}","${c.subject}","${c.message}","${new Date(c.createdAt).toLocaleString()}","${c.resolved ? 'Yes' : 'No'}"\n`;
            });
            filename = 'contact_inquiries.csv';
        } else if (activeTab === 'newsletter') {
            csvContent = 'data:text/csv;charset=utf-8,';
            csvContent += 'Email,Subscribed At,Active\n';
            subscribers.forEach(s => {
                csvContent += `"${s.email}","${new Date(s.subscribedAt).toLocaleString()}","${s.active ? 'Yes' : 'No'}"\n`;
            });
            filename = 'newsletter_subscribers.csv';
        } else if (activeTab === 'callbacks') {
            csvContent = 'data:text/csv;charset=utf-8,';
            csvContent += 'Name,Phone,Email,Preferred Time,Page,Product,Source,Status,Created\n';
            callbacks.forEach(c => {
                csvContent += `"${c.name || 'N/A'}","${c.phoneNumber}","${c.email || 'N/A'}","${c.preferredTime}","${c.pageWhenRequested}","${c.productInterest || 'N/A'}","${c.source}","${c.status}","${new Date(c.createdAt).toLocaleString()}"\n`;
            });
            filename = 'callback_requests.csv';
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-xl">Loading...</div></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-display text-brand-dark mb-2">Lead Manager</h1>
                        <p className="text-gray-600">Manage all customer interactions and visitor tracking</p>
                    </div>
                    <button
                        onClick={exportToCSV}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                    >
                        <Download size={20} />
                        <span>Export CSV</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-t-2xl border-b">
                    <div className="flex space-x-1 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('contact')}
                            className={`py-4 px-6 font-bold transition-all whitespace-nowrap ${activeTab === 'contact'
                                ? 'bg-brand-red text-white rounded-t-2xl'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Contact Inquiries ({contacts.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('callbacks')}
                            className={`py-4 px-6 font-bold transition-all whitespace-nowrap ${activeTab === 'callbacks'
                                ? 'bg-brand-red text-white rounded-t-2xl'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Phone size={16} className="inline mr-2" />
                            Callback Requests ({callbacks.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('visitors')}
                            className={`py-4 px-6 font-bold transition-all whitespace-nowrap ${activeTab === 'visitors'
                                ? 'bg-brand-red text-white rounded-t-2xl'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Users size={16} className="inline mr-2" />
                            Visitor Sessions ({visitorSessions.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('newsletter')}
                            className={`py-4 px-6 font-bold transition-all whitespace-nowrap ${activeTab === 'newsletter'
                                ? 'bg-brand-red text-white rounded-t-2xl'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Newsletter ({subscribers.length})
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-b-2xl shadow-sm p-6">
                    {/* Contact Inquiries Tab */}
                    {activeTab === 'contact' && (
                        <div className="space-y-4">
                            {contacts.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No inquiries yet</p>
                            ) : (
                                contacts.map(contact => (
                                    <div key={contact.id} className={`border rounded-xl p-6 ${contact.resolved ? 'bg-gray-50' : 'bg-white'}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-lg text-brand-dark">{contact.name}</h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                                    <span className="flex items-center space-x-1">
                                                        <Mail size={14} />
                                                        <span>{contact.email}</span>
                                                    </span>
                                                    {contact.phone && (
                                                        <span className="flex items-center space-x-1">
                                                            <Phone size={14} />
                                                            <span>{contact.phone}</span>
                                                        </span>
                                                    )}
                                                    <span className="flex items-center space-x-1">
                                                        <Calendar size={14} />
                                                        <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                {!contact.resolved && (
                                                    <button
                                                        onClick={() => handleResolve(contact.id)}
                                                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                                        title="Mark as resolved"
                                                    >
                                                        <CheckCircle size={20} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(contact.id)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-xs font-bold text-gray-500 uppercase">Subject:</span>
                                                <p className="text-gray-700">{contact.subject}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-gray-500 uppercase">Message:</span>
                                                <p className="text-gray-700">{contact.message}</p>
                                            </div>
                                        </div>
                                        {contact.resolved && (
                                            <div className="mt-3 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                                <CheckCircle size={14} />
                                                <span>Resolved</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Callback Requests Tab */}
                    {activeTab === 'callbacks' && (
                        <div className="space-y-4">
                            {callbacks.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No callback requests yet</p>
                            ) : (
                                callbacks.map(callback => (
                                    <div key={callback.id} className="border rounded-xl p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-lg text-brand-dark">{callback.name || 'Anonymous'}</h3>
                                                <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mt-1">
                                                    <span className="flex items-center space-x-1">
                                                        <Phone size={14} />
                                                        <span>{callback.phoneNumber}</span>
                                                    </span>
                                                    {callback.email && (
                                                        <span className="flex items-center space-x-1">
                                                            <Mail size={14} />
                                                            <span>{callback.email}</span>
                                                        </span>
                                                    )}
                                                    <span className="flex items-center space-x-1">
                                                        <Clock size={14} />
                                                        <span>{callback.preferredTime}</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <Calendar size={14} />
                                                        <span>{new Date(callback.createdAt).toLocaleDateString()}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${callback.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                callback.status === 'CONTACTED' ? 'bg-blue-100 text-blue-800' :
                                                    callback.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {callback.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <p><span className="font-bold">Page:</span> {callback.pageWhenRequested}</p>
                                            {callback.productInterest && <p><span className="font-bold">Product:</span> {callback.productInterest}</p>}
                                            {callback.message && <p><span className="font-bold">Message:</span> {callback.message}</p>}
                                            <p><span className="font-bold">Source:</span> {callback.source}</p>
                                            {callback.whatsappOptIn && <p className="text-green-600">✓ WhatsApp Opt-in</p>}
                                        </div>
                                        {callback.status === 'PENDING' && (
                                            <div className="mt-4 flex gap-2">
                                                <button
                                                    onClick={() => updateCallbackStatus(callback.id, 'CONTACTED')}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                                >
                                                    Mark as Contacted
                                                </button>
                                                <button
                                                    onClick={() => updateCallbackStatus(callback.id, 'COMPLETED')}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                                                >
                                                    Mark as Completed
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Visitor Sessions Tab */}
                    {activeTab === 'visitors' && (
                        <div className="space-y-4">
                            {visitorSessions.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No visitor sessions tracked yet</p>
                            ) : (
                                visitorSessions.slice(0, 50).map(session => {
                                    const pages = JSON.parse(session.pagesViewed || '[]');
                                    const products = JSON.parse(session.productsViewed || '[]');
                                    return (
                                        <div key={session.id} className={`border rounded-xl p-6 ${session.converted ? 'bg-green-50' : 'bg-white'}`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-bold text-brand-dark">
                                                        {session.associatedPhone || session.associatedEmail || 'Anonymous Visitor'}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">Session ID: {session.sessionId.substring(0, 8)}...</p>
                                                </div>
                                                {session.converted && (
                                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                                                        Converted Lead
                                                    </span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                                                <div>
                                                    <span className="text-gray-500">Time on Site:</span>
                                                    <p className="font-bold">{Math.floor(session.timeOnSite / 60)}m {session.timeOnSite % 60}s</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Pages Viewed:</span>
                                                    <p className="font-bold">{pages.length}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Products Viewed:</span>
                                                    <p className="font-bold">{products.length}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">First Visit:</span>
                                                    <p className="font-bold">{new Date(session.firstVisit).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            {pages.length > 0 && (
                                                <div className="text-sm">
                                                    <span className="font-bold text-gray-700">Pages:</span>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {pages.slice(0, 5).map((page, idx) => (
                                                            <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                                                {page.path}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}

                    {/* Newsletter Tab */}
                    {activeTab === 'newsletter' && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="text-left p-4 font-bold">Email</th>
                                        <th className="text-left p-4 font-bold">Subscribed</th>
                                        <th className="text-left p-4 font-bold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {subscribers.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center text-gray-500 py-8">No subscribers yet</td>
                                        </tr>
                                    ) : (
                                        subscribers.map(sub => (
                                            <tr key={sub.id} className="hover:bg-gray-50">
                                                <td className="p-4">{sub.email}</td>
                                                <td className="p-4 text-gray-600">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                                                <td className="p-4">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${sub.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {sub.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeadManager;
