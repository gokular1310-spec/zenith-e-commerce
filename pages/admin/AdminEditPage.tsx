import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page, NewPage } from '../../types';
import { api } from '../../services/mockApiService';
import PageEditor from '../../components/admin/PageEditor';
import Spinner from '../../components/common/Spinner';

const AdminEditPage = () => {
    const { pageId } = useParams<{ pageId: string }>();
    const navigate = useNavigate();
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!pageId) return;
        const fetchPage = async () => {
            setLoading(true);
            try {
                const data = await api.getPageById(pageId);
                if (data) {
                    setPage(data);
                } else {
                    navigate('/admin/pages');
                }
            } catch (error) {
                console.error("Failed to fetch page:", error);
                navigate('/admin/pages');
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [pageId, navigate]);

    const handleSave = async (pageData: NewPage) => {
        if (!pageId) return;
        setIsSaving(true);
        try {
            await api.updatePage(pageId, pageData);
            navigate('/admin/pages');
        } catch (error) {
            console.error("Failed to update page:", error);
            alert("Error updating page. Please try again.");
            setIsSaving(false);
        }
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Edit Page</h2>
            {page ? (
                <PageEditor initialData={page} onSave={handleSave} isSaving={isSaving} />
            ) : (
                <p className="text-gray-400">Page data could not be loaded.</p>
            )}
        </div>
    );
};

export default AdminEditPage;
