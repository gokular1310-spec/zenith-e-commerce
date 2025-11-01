import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import { api } from '../../services/mockApiService';

const OrdersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const MessagesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


const MyProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: ''});
  
  // State for editable fields
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.mobile || '');

  // State for password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    const updatePayload: { email?: string, mobile?: string, password_bcrypt?: string } = {};

    // Basic details
    if (email !== user.email) updatePayload.email = email;
    if (mobile !== (user.mobile || '')) updatePayload.mobile = mobile;

    // Password change logic
    if (newPassword) {
      if (currentPassword !== user.password_bcrypt) {
        setMessage({ type: 'error', text: 'Current password is incorrect.' });
        setIsSubmitting(false);
        return;
      }
      if (newPassword.length < 8) {
        setMessage({ type: 'error', text: 'New password must be at least 8 characters long.'});
        setIsSubmitting(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match.' });
        setIsSubmitting(false);
        return;
      }
      updatePayload.password_bcrypt = newPassword;
    }

    try {
      if (Object.keys(updatePayload).length > 0) {
        await api.updateUser(user.id, updatePayload);
        setMessage({ type: 'success', text: 'Profile updated successfully! Please re-login to see all changes.' });
        // Reset password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
         setMessage({ type: 'info', text: 'No changes were made.' });
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-500">Manage your account details and security settings.</p>
      </div>
      
      {/* Account Info */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-500">Role</label>
            <p className="mt-1 text-lg text-gray-800 p-3 bg-gray-100 rounded-md capitalize">{user.role}</p>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-500">Account Status</label>
            <div className="mt-1 p-3 bg-gray-100 rounded-md">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                </span>
            </div>
            </div>
        </div>
      </div>
      
      {/* Login & Security Form */}
      <form onSubmit={handleSaveChanges} className="border rounded-lg p-6">
         <h2 className="text-xl font-semibold text-gray-800 mb-4">Login & Security</h2>
         <div className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input type="tel" id="mobile" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="e.g., 555-123-4567" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div className="border-t pt-4 space-y-4">
                <p className="text-sm text-gray-600">To change your password, fill out all three fields below.</p>
                <div>
                    <label htmlFor="currentPassword"  className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input type="password" id="currentPassword" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div>
                    <label htmlFor="newPassword"  className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                </div>
                 <div>
                    <label htmlFor="confirmPassword"  className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
                </div>
            </div>
         </div>
         <div className="mt-6 flex items-center justify-end">
             {message.text && (
                <p className={`mr-4 text-sm ${
                    message.type === 'success' ? 'text-green-600' : 
                    message.type === 'error' ? 'text-red-600' : 'text-gray-600'
                }`}>{message.text}</p>
             )}
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
         </div>
      </form>
      
      {/* Quick Links & Logout */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Management</h2>
        <div className="space-y-3">
          <Link to="/my-orders" className="block">
            <button className="w-full flex items-center text-left p-3 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-base font-medium">
                <OrdersIcon />
                My Orders
            </button>
          </Link>
          <Link to="/my-messages" className="block">
            <button className="w-full flex items-center text-left p-3 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-base font-medium">
                <MessagesIcon />
                My Messages
            </button>
          </Link>
          <button 
            onClick={logout} 
            className="w-full flex items-center text-left p-3 rounded-md bg-red-50 hover:bg-red-100 transition-colors text-red-700 text-base font-medium"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
