import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const OrdersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const ProductsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const AddProductIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const MessagesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const AIIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>

const AdminSidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        if (location.pathname.startsWith('/admin/users')) {
            setIsUserMenuOpen(true);
        }
    }, [location.pathname]);

    const activeClassName = "bg-gray-700 text-white";
    const inactiveClassName = "text-gray-300 hover:bg-gray-700 hover:text-white";
    const baseClassName = "flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors";
    const subMenuBaseClassName = "flex items-center pl-11 pr-4 py-2 rounded-md text-sm font-medium transition-colors";


    return (
        <div className="flex flex-col w-64 bg-gray-800">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <span className="text-white text-2xl font-bold">Zenith Admin</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-2">
                    <NavLink to="/admin/dashboard" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <DashboardIcon />
                        <span className="ml-3">Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/orders" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <OrdersIcon />
                        <span className="ml-3">Orders</span>
                    </NavLink>
                    <NavLink to="/admin/products" end className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <ProductsIcon />
                        <span className="ml-3">Products</span>
                    </NavLink>
                    <NavLink to="/admin/products/new" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <AddProductIcon />
                        <span className="ml-3">Add Product</span>
                    </NavLink>
                    <NavLink to="/admin/messages" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <MessagesIcon />
                        <span className="ml-3">Messages</span>
                    </NavLink>
                    
                    {/* Users Dropdown Menu */}
                    <div>
                        <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className={`${baseClassName} w-full justify-between ${inactiveClassName}`}>
                            <div className="flex items-center">
                                <UsersIcon />
                                <span className="ml-3">Users</span>
                            </div>
                            <svg className={`w-5 h-5 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {isUserMenuOpen && (
                            <div className="mt-1 space-y-1">
                                <NavLink to="/admin/users" end className={({isActive}) => `${subMenuBaseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                                    User Management
                                </NavLink>
                                <NavLink to="/admin/users/new" className={({isActive}) => `${subMenuBaseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                                    Add User
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/admin/ai-settings" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <AIIcon />
                        <span className="ml-3">AI Settings</span>
                    </NavLink>
                </nav>
                <div className="px-2 py-4">
                     <button onClick={logout} className={`${baseClassName} ${inactiveClassName} w-full`}>
                        <LogoutIcon />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;