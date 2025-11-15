import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to login. Please try again.');
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-primary-500/30 dark:bg-primary-500/20 rounded-full filter blur-3xl animate-float-1"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-indigo-500/30 dark:bg-indigo-500/20 rounded-full filter blur-3xl animate-float-2"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/30 dark:bg-pink-500/20 rounded-full filter blur-3xl animate-float-3"></div>

      {/* Glassmorphism Card */}
      <div className="w-full max-w-md bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 z-10">
        <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <svg className="h-8 w-auto text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
              </svg>
              <span className="text-3xl font-bold text-gray-800 dark:text-white">Zenith</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Sign up
              </Link>
            </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
          <div className="space-y-4">
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
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full py-3 text-base" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
