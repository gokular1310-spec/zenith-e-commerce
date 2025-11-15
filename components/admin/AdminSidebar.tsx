import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const OrdersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const ProductsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const PagesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const MessagesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const AIIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


const AdminSidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
    const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
    const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);


    useEffect(() => {
        setIsUserMenuOpen(location.pathname.startsWith('/admin/users'));
        setIsPagesMenuOpen(location.pathname.startsWith('/admin/pages'));
        setIsProductsMenuOpen(location.pathname.startsWith('/admin/products'));
        setIsSettingsMenuOpen(location.pathname.startsWith('/admin/settings'));
    }, [location.pathname]);

    const activeClassName = "bg-primary-50 text-primary-600 border-l-4 border-primary-500";
    const inactiveClassName = "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent";
    const baseClassName = "flex items-center px-4 py-3 text-sm font-medium transition-colors group";
    const subMenuBaseClassName = "flex items-center pl-11 pr-4 py-2 text-sm font-medium transition-colors group";


    return (
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
                <span className="text-primary-600 text-2xl font-bold">Zenith Admin</span>
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

                    {/* Products Dropdown Menu */}
                    <div>
                        <button onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)} className={`${baseClassName} w-full justify-between ${isProductsMenuOpen ? 'text-gray-900' : 'text-gray-600'}`}>
                            <div className="flex items-center">
                                <ProductsIcon />
                                <span className="ml-3">Products</span>
                            </div>
                            <svg className={`w-5 h-5 transition-transform ${isProductsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {isProductsMenuOpen && (
                            <div className="mt-1 space-y-1">
                                <NavLink to="/admin/products" end className={({isActive}) => `${subMenuBaseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                                    All Products
                                </NavLink>
                                <NavLink to="/admin/products/new" className={({isActive}) => `${subMenuBaseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                                    Add New
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Pages Dropdown Menu */}
                    <div>
                        <button onClick={() => setIsPagesMenuOpen(!isPagesMenuOpen)} className={`${baseClassName} w-full justify-between ${isPagesMenuOpen ? 'text-gray-900' : 'text-gray-600'}`}>
                            <div className="flex items-center">
                                <PagesIcon />
                                <span className="ml-3">Pages</span>
                            </div>
                            <svg className={`w-5 h-5 transition-transform ${isPagesMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {isPagesMenuOpen && (
                            <div className="mt-1 space-y-1">
                                <NavLink to="/admin/pages" end className={({isActive}) => `${subMenuBaseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                                    All Pages
                                </NavLink>
                                <NavLink to="/admin/pages/new" className={({isActive}) => `${subMenuBaseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                                    Add New
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/admin/messages" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <MessagesIcon />
                        <span className="ml-3">Messages</span>
                    </NavLink>
                    
                    {/* Users Dropdown Menu */}
                    <div>
                        <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className={`${baseClassName} w-full justify-between ${isUserMenuOpen ? 'text-gray-900' : 'text-gray-600'}`}>
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

                    {/* Site Settings Dropdown */}
                    <div>
                        <button onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)} className={`${baseClassName} w-full justify-between ${isSettingsMenuOpen ? 'text-gray-900' : 'text-gray-600'}`}>
                            <div className="flex items-center">
                                <SettingsIcon />
                                <span className="ml-3">Site Settings</span>
                            </div>
                            <svg className={`w-5 h-5 transition-transform ${isSettingsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {isSettingsMenuOpen && (
                            <div className="mt-1 space-y-1">
                                <NavLink to="/admin/settings/themes" className={({isActive}) => `${subMenuBaseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                                    Themes
                                </NavLink>
                                <NavLink to="/admin/settings/social-media" className={({isActive}) => `${subMenuBaseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                                    Social Media
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/admin/ai-settings" className={({isActive}) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}>
                        <AIIcon />
                        <span className="ml-3">AI Settings</span>
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

export default AdminSidebar;