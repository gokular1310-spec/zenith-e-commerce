import React, { useEffect, useState } from 'react';
// FIX: Replaced `Object.entries` with `Object.keys` to resolve type inference errors on `subCategories`. Added `useLocation` hook to fix an undeclared variable error.
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const Header = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { activeThemeSettings } = useSiteAppearance();
  const [categoryTree, setCategoryTree] = useState<{ [key: string]: string[] }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const activeLinkStyle = {
    color: '#2563eb',
    fontWeight: '600'
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
        navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        setSearchQuery('');
        setIsMobileMenuOpen(false); // Close mobile menu on search
    }
  };

  useEffect(() => {
    const fetchCategoryTree = async () => {
      try {
        const tree = await api.getCategoryTree();
        setCategoryTree(tree);
      } catch (error) {
        console.error("Failed to fetch category tree", error);
      }
    };
    fetchCategoryTree();
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

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

  return (
    <>
      <header className="shadow-md sticky top-0 z-50" style={headerStyle}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
               <div className="flex-shrink-0">
                  <Link to="/" className="flex items-center space-x-2 transition-colors">
                      <svg className="h-8 w-auto text-primary-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
                      </svg>
                      <span className="text-2xl font-bold" style={{ color: activeThemeSettings?.header.textColor }}>Zenith</span>
                  </Link>
               </div>
               <nav className="hidden md:flex md:space-x-8 ml-10">
                   <NavLink to="/" style={getLinkStyle} end>Home</NavLink>
                   
                   {/* Shop Mega-Menu Dropdown */}
                   <div className="relative group">
                      <button className="flex items-center font-medium" style={getLinkStyle({ isActive: false })}>
                          <span>Shop</span>
                          <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
                      <div className="absolute left-0 mt-2 w-auto bg-white dark:bg-gray-800 rounded-md shadow-lg p-6 z-20 hidden group-hover:block transition-all duration-300">
                          <div className="flex flex-row space-x-8">
                              {[0, 1, 2, 3].map(colIndex => (
                                  <div key={colIndex} className="flex flex-col space-y-6 min-w-[200px]">
                                      {Object.keys(categoryTree)
                                          .filter((_, index) => index % 4 === colIndex)
                                          .map((category) => {
                                              const subCategories = categoryTree[category];
                                              return (
                                                  <div key={category}>
                                                      <NavLink to={`/?category=${category}`} className="font-bold text-gray-800 dark:text-gray-200 hover:text-primary-600 block" style={({isActive}) => isActive && !location.search.includes('subcategory') ? activeLinkStyle : {}}>{category}</NavLink>
                                                      {subCategories.length > 0 && (
                                                          <ul className="space-y-2 mt-2 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                                                              {subCategories.map(sub => (
                                                                  <li key={sub}>
                                                                      <NavLink to={`/?category=${category}&subcategory=${sub}`} className="text-gray-600 dark:text-gray-300 hover:text-primary-600 text-sm" style={({isActive}) => isActive ? activeLinkStyle : {}}>{sub}</NavLink>
                                                                  </li>
                                                              ))}
                                                          </ul>
                                                      )}
                                                  </div>
                                              );
                                          })}
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
                   <NavLink to="/deals" style={getLinkStyle}>Deals</NavLink>
                   <NavLink to="/about" style={getLinkStyle}>About</NavLink>
                   <NavLink to="/team" style={getLinkStyle}>Team</NavLink>
                   <NavLink to="/careers" style={getLinkStyle}>Careers</NavLink>
                   <NavLink to="/press" style={getLinkStyle}>Press</NavLink>
                   <NavLink to="/contact" style={getLinkStyle}>Contact</NavLink>
                   <NavLink to="/coming-soon" style={getLinkStyle}>Blog</NavLink>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center" aria-label="Search">
                    <SearchIcon />
                  </button>
                </form>
              </div>
               {/* Mobile Hamburger Menu */}
              <div className="md:hidden">
                  <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open main menu">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                  </button>
              </div>
              <ThemeSwitcher />
              <Link to="/cart" className="relative" style={iconColorStyle}>
                <ShoppingCartIcon />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
                )}
              </Link>
              {user ? (
                  <div className="relative group hidden md:block">
                      <button style={iconColorStyle}><UserIcon /></button>
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">{user.email}</div>
                          <Link to="/my-profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Profile</Link>
                          <Link to="/my-wishlist" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Wishlist</Link>
                          {user.role === 'admin' && (
                              <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-t border-gray-200 dark:border-gray-600">Admin Panel</Link>
                          )}
                           {user.role === 'sub-admin' && (
                              <Link to="/sub-admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-t border-gray-200 dark:border-gray-600">Vendor Panel</Link>
                          )}
                          <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-t border-gray-200 dark:border-gray-600">Logout</button>
                      </div>
                  </div>
              ) : (
                  <div className="hidden md:flex items-center space-x-2">
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
      </header>

      {/* Mobile Menu Sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity ${isMobileMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`} 
          onClick={() => setIsMobileMenuOpen(false)}>
        </div>
        
        {/* Sidebar */}
        <div className={`relative w-80 h-full bg-white dark:bg-gray-800 shadow-xl ml-auto flex flex-col transform transition-transform ease-in-out duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="text-gray-500 dark:text-gray-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="search"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-4 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </form>
                </div>
                <nav className="p-4 space-y-1">
                    <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" style={({isActive}) => isActive ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
                    {Object.keys(categoryTree).map((category) => {
                        const subCategories = categoryTree[category];
                        return (
                        <div key={category} className="px-3 py-2">
                            <NavLink to={`/?category=${category}`} className="font-bold text-gray-800 dark:text-gray-200 block" style={({isActive}) => isActive && !location.search.includes('subcategory') ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>
                                {category}
                            </NavLink>
                            {subCategories.length > 0 && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    {subCategories.map(sub => (
                                        <li key={sub}>
                                            <NavLink to={`/?category=${category}&subcategory=${sub}`} className="text-gray-600 dark:text-gray-300 text-sm block hover:text-primary-600" style={({isActive}) => isActive ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>
                                                {sub}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        );
                    })}
                     <NavLink to="/deals" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" style={({isActive}) => isActive ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>Deals</NavLink>
                     <NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" style={({isActive}) => isActive ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
                     <NavLink to="/team" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" style={({isActive}) => isActive ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>Team</NavLink>
                     <NavLink to="/careers" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" style={({isActive}) => isActive ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>Careers</NavLink>
                     <NavLink to="/press" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" style={({isActive}) => isActive ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>Press</NavLink>
                     <NavLink to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" style={({isActive}) => isActive ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
                     <NavLink to="/coming-soon" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" style={({isActive}) => isActive ? activeLinkStyle : {}} onClick={() => setIsMobileMenuOpen(false)}>Blog</NavLink>
                </nav>
            </div>

            {/* Footer / Auth links */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!user ? (
                <div className="flex items-center gap-4">
                      <Link to="/login" className="text-sm font-medium px-4 py-2 rounded-md w-full text-center border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign in
                    </Link>
                    <Link to="/register" className="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-md w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign up
                    </Link>
                </div>
            ) : (
                <div className="space-y-2">
                      <div className="font-medium text-gray-800 dark:text-gray-200">{user.email}</div>
                      <Link to="/my-profile" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                      <Link to="/my-wishlist" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>My Wishlist</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
                    )}
                      {user.role === 'sub-admin' && (
                        <Link to="/sub-admin" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Vendor Panel</Link>
                    )}
                </div>
            )}
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;