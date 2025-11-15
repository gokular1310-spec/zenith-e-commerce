import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteAppearance } from '../../hooks/useSiteAppearance';
import { BackgroundSetting } from '../../types';

const Footer = () => {
  const { activeThemeSettings } = useSiteAppearance();

  const generateBackgroundStyle = (bg: BackgroundSetting | undefined) => {
    if (!bg) return {};
    if (bg.type === 'gradient' && bg.color2) {
        return { background: `linear-gradient(${bg.direction || 'to right'}, ${bg.color1}, ${bg.color2})` };
    }
    return { backgroundColor: bg.color1 };
  };

  const footerStyle = {
    ...generateBackgroundStyle(activeThemeSettings?.footer.background),
    color: activeThemeSettings?.footer.textColor,
  };

  const linkStyle = {
    color: activeThemeSettings?.footer.textColor
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-12" style={footerStyle}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: activeThemeSettings?.footer.textColor }}>Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base hover:opacity-80" style={linkStyle}>About</Link></li>
              <li><Link to="/team" className="text-base hover:opacity-80" style={linkStyle}>Our Team</Link></li>
              <li><Link to="/careers" className="text-base hover:opacity-80" style={linkStyle}>Careers</Link></li>
              <li><Link to="/press" className="text-base hover:opacity-80" style={linkStyle}>Press</Link></li>
              <li><Link to="/contact" className="text-base hover:opacity-80" style={linkStyle}>Contact Us</Link></li>
              <li><Link to="/deals" className="text-base hover:opacity-80" style={linkStyle}>Deals</Link></li>
              <li><Link to="/coming-soon" className="text-base hover:opacity-80" style={linkStyle}>Blog</Link></li>
            </ul>
          </div>
          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: activeThemeSettings?.footer.textColor }}>Account</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/my-profile" className="text-base hover:opacity-80" style={linkStyle}>My Profile</Link></li>
              <li><Link to="/my-orders" className="text-base hover:opacity-80" style={linkStyle}>My Orders</Link></li>
              <li><Link to="/cart" className="text-base hover:opacity-80" style={linkStyle}>Cart</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: activeThemeSettings?.footer.textColor }}>Support</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/return-policy" className="text-base hover:opacity-80" style={linkStyle}>Return Policy</Link></li>
              <li><Link to="/my-orders" className="text-base hover:opacity-80" style={linkStyle}>Track Order</Link></li>
              <li><Link to="/my-messages" className="text-base hover:opacity-80" style={linkStyle}>Messages</Link></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: activeThemeSettings?.footer.textColor }}>Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/privacy-policy" className="text-base hover:opacity-80" style={linkStyle}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-base hover:opacity-80" style={linkStyle}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-center text-base" style={{ color: activeThemeSettings?.footer.textColor, opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} Zenith E-Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;