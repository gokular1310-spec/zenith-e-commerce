import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const OrdersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const ProductsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const AddProductIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const MessagesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

const SubAdminSidebar = () => {
    const { logout } = useAuth();
    
    const activeClassName = "bg-primary-50 text-primary-600 border-l-4 border-primary-500";
    const inactiveClassName = "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent";
    const baseClassName = "flex items-center px-4 py-3 text-sm font-medium transition-colors group";

    return (
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
                <span className="text-primary-600 text-xl font-bold">Zenith Vendor</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-2">
                    <NavLink to="/sub-admin/dashboard" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <DashboardIcon />
                        <span className="ml-3">Dashboard</span>
                    </NavLink>
                    <NavLink to="/sub-admin/orders" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <OrdersIcon />
                        <span className="ml-3">Orders</span>
                    </NavLink>
                    <NavLink to="/sub-admin/products" end className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <ProductsIcon />
                        <span className="ml-3">My Products</span>
                    </NavLink>
                    <NavLink to="/sub-admin/products/new" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <AddProductIcon />
                        <span className="ml-3">Add Product</span>
                    </NavLink>
                    <NavLink to="/sub-admin/messages" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <MessagesIcon />
                        <span className="ml-3">Messages</span>
                    </NavLink>
                </nav>
                <div className="px-2 py-4 mt-auto">
                     <button onClick={logout} className={`${baseClassName} ${inactiveClassName} w-full`}>
                        <LogoutIcon />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubAdminSidebar;