import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { api } from '../../services/mockApiService';

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
)

const Header = () => {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const [categories, setCategories] = useState<string[]>([]);
  
  const activeLinkStyle = {
    color: '#2563eb',
    fontWeight: '600'
  };

  const activeCategoryStyle = {
    color: '#ffffff',
    backgroundColor: '#2563eb'
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await api.getCategories();
        setCategories(cats.sort());
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
                <svg className="h-8 w-auto" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
                </svg>
                <span className="text-2xl font-bold">Zenith</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-8">
             <NavLink to="/" className="text-gray-500 hover:text-gray-900" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Home</NavLink>
             <NavLink to="/about" className="text-gray-500 hover:text-gray-900" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>About</NavLink>
             <NavLink to="/team" className="text-gray-500 hover:text-gray-900" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Team</NavLink>
             <NavLink to="/contact" className="text-gray-500 hover:text-gray-900" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Contact</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-500 hover:text-gray-900">
              <ShoppingCartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
              )}
            </Link>
            {user ? (
                <div className="relative group">
                    <button className="text-gray-500 hover:text-gray-900"><UserIcon /></button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">{user.email}</div>
                        <Link to="/my-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                        {user.role === 'admin' && (
                            <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t">Admin Panel</Link>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-primary-600 px-3 py-2 rounded-md">
                        Sign in
                    </Link>
                    <Link to="/register" className="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-3 py-2 rounded-md">
                        Sign up
                    </Link>
                </div>
            )}
          </div>
        </div>
      </div>
       {categories.length > 0 && (
        <nav className="bg-gray-100 border-t border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-12 space-x-6">
                     <NavLink to="/" end className="text-gray-600 hover:text-primary-600 font-medium px-3 py-2 rounded-md text-sm transition" style={({ isActive }) => isActive ? activeCategoryStyle : undefined}>
                        All
                    </NavLink>
                    {categories.map(category => (
                        <NavLink key={category} to={`/?category=${category}`} className="text-gray-600 hover:text-primary-600 font-medium px-3 py-2 rounded-md text-sm transition" style={({ isActive }) => isActive ? activeCategoryStyle : undefined}>
                            {category}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
      )}
    </header>
  );
};

export default Header;