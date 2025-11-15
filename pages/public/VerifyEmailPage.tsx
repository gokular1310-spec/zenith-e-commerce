import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const VerifyEmailPage = () => {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('No verification token provided.');
        return;
      }

      try {
        const response = await api.verifyEmail(token);
        if (response.success) {
          setStatus('success');
          setMessage('Your email has been successfully verified!');
        } else {
          setStatus('error');
          setMessage(response.message || 'Verification failed. The link may be invalid or expired.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    verify();
  }, [token]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <>
            <Spinner />
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Verifying your email...
            </h2>
          </>
        );
      case 'success':
        return (
          <>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verification Successful!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {message}
            </p>
            <div className="mt-6">
                <Link to="/login">
                    <Button className="w-full">Proceed to Login</Button>
                </Link>
            </div>
          </>
        );
      case 'error':
        return (
          <>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verification Failed
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {message}
            </p>
            <div className="mt-6">
                 <Link to="/register">
                    <Button className="w-full">Register Again</Button>
                </Link>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
