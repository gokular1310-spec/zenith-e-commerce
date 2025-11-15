import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const ComingSoonPage = () => {
  return (
    <div className="text-center bg-white p-12 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-6">
        <svg className="h-10 w-10 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 14.5A2.5 2.5 0 0112 12a2.5 2.5 0 012.5 2.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 9.5a2.5 2.5 0 01-5 0" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 7.636l-.707-.707" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.636 7.636l.707-.707" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Coming Soon!</h1>
      <p className="mt-4 max-w-md mx-auto text-lg text-gray-500">
        We're working hard to bring you something amazing. Stay tuned for exciting new features and content.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button>
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoonPage;
