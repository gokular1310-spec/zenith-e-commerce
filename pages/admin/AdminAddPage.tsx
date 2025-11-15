import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewPage } from '../../types';
import { api } from '../../services/mockApiService';
import PageEditor from '../../components/admin/PageEditor';

const AdminAddPage = () => {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSave = async (pageData: NewPage) => {
        setIsSaving(true);
        try {
            await api.createPage(pageData);
            navigate('/admin/pages');
        } catch (error) {
            console.error("Failed to create page:", error);
            alert("Error creating page. Please try again.");
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Page</h2>
            <PageEditor onSave={handleSave} isSaving={isSaving} />
        </div>
    );
};

export default AdminAddPage;