import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/mockApiService';
import Button from '../../components/common/Button';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const response = await api.forgotPassword(email);
      setMessage(response.message);
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              No worries! We'll send you reset instructions.
            </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {message && <p className="text-green-800 dark:text-green-300 text-sm text-center bg-green-100 dark:bg-green-900/50 p-3 rounded-md">{message}</p>}
          {error && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
          
          {!message && (
            <>
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-colors"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            </>
          )}
        </form>
        <div className="text-sm text-center mt-6">
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
            &larr; Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
