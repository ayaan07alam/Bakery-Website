import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, MessageSquare, CheckCircle, Trash2, Download, Calendar } from 'lucide-react';

const LeadManager = () => {
    const [activeTab, setActiveTab] = useState('contact');
    const [contacts, setContacts] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contactRes, subscriberRes] = await Promise.all([
                axios.get('http://localhost:8080/api/contact'),
                axios.get('http://localhost:8080/api/newsletter/subscribers')
            ]);
            setContacts(contactRes.data);
            setSubscribers(subscriberRes.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/contact/${id}/resolve`);
            fetchData();
        } catch (error) {
            alert('Failed to resolve inquiry');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this inquiry?')) return;
        try {
            await axios.delete(`http://localhost:8080/api/contact/${id}`);
            fetchData();
        } catch (error) {
            alert('Failed to delete inquiry');
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
        } else {
            csvContent = 'data:text/csv;charset=utf-8,';
            csvContent += 'Email,Subscribed At,Active\n';
            subscribers.forEach(s => {
                csvContent += `"${s.email}","${new Date(s.subscribedAt).toLocaleString()}","${s.active ? 'Yes' : 'No'}"\n`;
            });
            filename = 'newsletter_subscribers.csv';
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
                        <h1 className="text-3xl font-logo text-brand-dark mb-2">Lead Manager</h1>
                        <p className="text-gray-600">Manage customer inquiries and newsletter subscribers</p>
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
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('contact')}
                            className={`flex-1 py-4 px-6 font-bold transition-all ${activeTab === 'contact'
                                    ? 'bg-brand-red text-white rounded-t-2xl'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            Contact Inquiries ({contacts.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('newsletter')}
                            className={`flex-1 py-4 px-6 font-bold transition-all ${activeTab === 'newsletter'
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
                    {activeTab === 'contact' ? (
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
                    ) : (
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
