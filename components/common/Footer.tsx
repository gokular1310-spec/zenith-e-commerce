import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</Link></li>
              <li><Link to="/team" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Our Team</Link></li>
              <li><Link to="/contact" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Account</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/my-profile" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">My Profile</Link></li>
              <li><Link to="/my-orders" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">My Orders</Link></li>
              <li><Link to="/cart" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Cart</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/return-policy" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Return Policy</Link></li>
              <li><Link to="/my-orders" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Track Order</Link></li>
              <li><Link to="/my-messages" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Messages</Link></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/privacy-policy" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-center text-base text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Zenith E-Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;