import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  if (!orderId) {
    // If there's no orderId, the user probably landed here by mistake.
    // Redirect them to the homepage.
    return <Navigate to="/" replace />;
  }

  return (
    <div className="text-center bg-white p-12 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
        <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Thank you for your order!</h1>
      <p className="text-gray-600 mt-4">Your order has been placed successfully. A confirmation email has been sent to you.</p>
      <p className="mt-6 font-semibold text-gray-800">
        Your Order ID is: <span className="text-primary-600 font-bold">{orderId}</span>
      </p>
      <div className="mt-8 flex justify-center space-x-4">
        <Link to="/">
          <Button variant="secondary">Continue Shopping</Button>
        </Link>
        <Link to="/my-orders">
          <Button>View My Orders</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
