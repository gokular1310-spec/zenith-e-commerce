import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SubAdminSidebar from '../components/admin/SubAdminSidebar';

const SubAdminSearch = () => {
    const [query, setQuery] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/sub-admin/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-xs ml-auto">
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your products, orders..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-gray-500 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
        </form>
    );
};

const SubAdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <SubAdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center gap-4">
          <h1 className="text-xl font-semibold flex-shrink-0">Sub-Admin Panel</h1>
          <SubAdminSearch />
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SubAdminLayout;