import React, { useState, useEffect } from 'react';
import { SocialMediaLinks } from '../../types';
import { api } from '../../services/mockApiService';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';

const AdminSocialMediaPage = () => {
    const [links, setLinks] = useState<SocialMediaLinks>({ facebook: '', twitter: '', instagram: '', linkedin: '' });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLinks = async () => {
            setLoading(true);
            try {
                const data = await api.getSocialMediaLinks();
                setLinks(data);
            } catch (error) {
                console.error("Failed to fetch social media links:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLinks();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLinks(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');
        try {
            await api.updateSocialMediaLinks(links);
            setMessage('Social media links updated successfully!');
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error("Failed to update social media links:", error);
            setMessage('Failed to update links. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Social Media Links</h2>
            <p className="text-gray-500 mb-6">These links will be displayed in the website footer. Leave an input blank to hide the icon.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                    <input type="url" id="facebook" name="facebook" value={links.facebook} onChange={handleChange} placeholder="https://facebook.com/your-page" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
                </div>
                 <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">Twitter (X) URL</label>
                    <input type="url" id="twitter" name="twitter" value={links.twitter} onChange={handleChange} placeholder="https://twitter.com/your-handle" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
                </div>
                 <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                    <input type="url" id="instagram" name="instagram" value={links.instagram} onChange={handleChange} placeholder="https://instagram.com/your-profile" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
                </div>
                 <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                    <input type="url" id="linkedin" name="linkedin" value={links.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/your-profile" className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900" />
                </div>
                <div className="flex justify-end items-center pt-4">
                    {message && <p className="text-green-600 mr-4 text-sm">{message}</p>}
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? <><Spinner /> Saving...</> : 'Save Links'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdminSocialMediaPage;