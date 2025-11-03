import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { api } from '../../services/mockApiService';
import ThemeSwitcher from './ThemeSwitcher';
import { useSiteAppearance } from '../../hooks/useSiteAppearance';
import { BackgroundSetting } from '../../types';

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
  const { activeThemeSettings } = useSiteAppearance();
  const [categories, setCategories] = useState<string[]>([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  
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
  
  const generateBackgroundStyle = (bg: BackgroundSetting | undefined) => {
    if (!bg) return {};
    if (bg.type === 'gradient' && bg.color2) {
        return { background: `linear-gradient(${bg.direction || 'to right'}, ${bg.color1}, ${bg.color2})` };
    }
    return { backgroundColor: bg.color1 };
  };

  const headerStyle = {
    ...generateBackgroundStyle(activeThemeSettings?.header.background),
    color: activeThemeSettings?.header.textColor,
  };
  
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    const baseStyle = { color: activeThemeSettings?.header.textColor };
    if (isActive) {
      return { ...activeLinkStyle }; // Active style takes precedence
    }
    return baseStyle;
  };
  
  const iconColorStyle = { color: activeThemeSettings?.header.textColor };

  const categoryLinks = (isMobile = false) => {
    const baseClass = isMobile
      ? "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-600"
      : "text-gray-600 dark:text-gray-300 hover:text-primary-600 font-medium px-3 py-2 rounded-md text-sm transition";

    return (
        <>
            <NavLink to="/" end className={baseClass} style={({ isActive }) => isActive ? activeCategoryStyle : undefined} onClick={() => isMobile && setIsCategoryMenuOpen(false)}>
                All
            </NavLink>
            {categories.map(category => (
                <NavLink key={category} to={`/?category=${category}`} className={baseClass} style={({ isActive }) => isActive ? activeCategoryStyle : undefined} onClick={() => isMobile && setIsCategoryMenuOpen(false)}>
                    {category}
                </NavLink>
            ))}
        </>
    );
  };


  return (
    <header className="shadow-md sticky top-0 z-50" style={headerStyle}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 transition-colors">
                <svg className="h-8 w-auto text-primary-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
                </svg>
                <span className="text-2xl font-bold" style={{ color: activeThemeSettings?.header.textColor }}>Zenith</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-8">
             <NavLink to="/" style={getLinkStyle}>Home</NavLink>
             <NavLink to="/about" style={getLinkStyle}>About</NavLink>
             <NavLink to="/team" style={getLinkStyle}>Team</NavLink>
             <NavLink to="/contact" style={getLinkStyle}>Contact</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <Link to="/cart" className="relative" style={iconColorStyle}>
              <ShoppingCartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
              )}
            </Link>
            {user ? (
                <div className="relative group">
                    <button style={iconColorStyle}><UserIcon /></button>
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">{user.email}</div>
                        <Link to="/my-profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Profile</Link>
                        {user.role === 'admin' && (
                            <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-t border-gray-200 dark:border-gray-600">Admin Panel</Link>
                        )}
                         {user.role === 'sub-admin' && (
                            <Link to="/sub-admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-t border-gray-200 dark:border-gray-600">Vendor Panel</Link>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <Link to="/login" className="text-sm font-medium px-3 py-2 rounded-md" style={{ color: activeThemeSettings?.header.textColor }}>
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
        <nav className="bg-gray-100 dark:bg-gray-700 border-t border-b border-gray-200 dark:border-gray-600">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center justify-center h-12 space-x-6">
                    {categoryLinks(false)}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                        className="w-full text-left py-3 font-medium text-gray-700 dark:text-gray-300 flex justify-between items-center"
                        aria-expanded={isCategoryMenuOpen}
                    >
                        <span>Browse Categories</span>
                        <svg className={`w-5 h-5 transition-transform transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {isCategoryMenuOpen && (
                        <div className="py-2 space-y-1">
                            {categoryLinks(true)}
                        </div>
                    )}
                </div>
            </div>
        </nav>
      )}
    </header>
  );
};

export default Header;