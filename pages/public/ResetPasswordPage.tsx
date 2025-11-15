import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/mockApiService';
import Button from '../../components/common/Button';

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!token) {
    // This case should be handled gracefully, but for now we'll keep the simple text.
    return (
      <div className="text-center p-8">
        <p className="text-red-500">No reset token provided. Please request a new link.</p>
        <Link to="/forgot-password">Request a new password reset</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.resetPassword(token, newPassword);
      if (response.success) {
        setMessage('Your password has been reset successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.message || 'Failed to reset password. The link may be invalid or expired.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 rounded-full filter blur-3xl animate-float-4"></div>
      <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-teal-500/30 dark:bg-teal-500/20 rounded-full filter blur-3xl animate-float-5"></div>
      
      {/* Glassmorphism Card */}
      <div className="w-full max-w-md bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 z-10">
        <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <svg className="h-8 w-auto text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
              </svg>
              <span className="text-3xl font-bold text-gray-800 dark:text-white">Zenith</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Password</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {message && <p className="text-green-800 dark:text-green-300 text-sm text-center bg-green-100 dark:bg-green-900/50 p-3 rounded-md">{message}</p>}
          {error && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
          
          {!message && (
            <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="new-password" className="sr-only">New Password</label>
                  <input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-colors"
                    placeholder="New password (min. 8 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-colors"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </div>
            </>
          )}
        </form>
         {message && (
             <div className="text-sm text-center mt-6">
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                    Proceed to Login
                </Link>
            </div>
         )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
