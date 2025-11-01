import React from 'react';
import { Outlet } from 'react-router-dom';
import SubAdminSidebar from '../components/admin/SubAdminSidebar';

const SubAdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <SubAdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 shadow-md p-4">
          <h1 className="text-xl font-semibold">Sub-Admin Panel</h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SubAdminLayout;