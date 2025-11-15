import React from 'react';
import { Link } from 'react-router-dom';

const PleaseVerifyPage = () => {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification link to your email address. Please click the link to complete your registration.
          </p>
          <p className="mt-2 text-center text-xs text-gray-500">
            (For this demo, the link is printed in the browser's developer console).
          </p>
        </div>
        <div className="text-sm text-center">
          <Link to="/" className="font-medium text-primary-600 hover:text-primary-500">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PleaseVerifyPage;
