import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const AdminPagesListPage = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getPages();
      setPages(data.sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
    } catch (error) {
      console.error("Failed to fetch pages:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleDelete = async (pageId: string) => {
    if (window.confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      try {
        const success = await api.deletePage(pageId);
        if (success) {
          setPages(currentPages => currentPages.filter(p => p.id !== pageId));
        } else {
           alert('Failed to delete page.');
        }
      } catch (error) {
        console.error("Failed to delete page:", error);
        alert('Failed to delete page.');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Pages</h2>
        <Link to="/admin/pages/new">
            <Button>Add New Page</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Slug</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Last Updated</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(page => (
              <tr key={page.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{page.title}</td>
                <td className="px-6 py-4 font-mono text-xs">/pages/{page.slug}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(page.updatedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                    <a href={`/#/pages/${page.slug}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="!px-3 !py-1 bg-blue-100 text-blue-700 hover:bg-blue-200">View</Button>
                    </a>
                    <Link to={`/admin/pages/edit/${page.id}`}>
                        <Button variant="secondary" className="!px-3 !py-1">Edit</Button>
                    </Link>
                    <Button variant="secondary" className="!px-3 !py-1 bg-red-100 text-red-700 hover:bg-red-200" onClick={() => handleDelete(page.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPagesListPage;