import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/mockApiService';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Get data from checkout page
  const { shippingAddress, cartItems, totalPrice } = location.state || {};

  if (!shippingAddress || !cartItems || cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleConfirmPayment = async () => {
    if (!user) {
      setError("You must be logged in to place an order.");
      return;
    }

    setIsProcessing(true);
    setError('');
    try {
      const newOrder = await api.placeOrder({
        cartItems,
        shippingAddress,
        customerEmail: user.email
      });
      clearCart();
      navigate('/order-confirmation', { state: { orderId: newOrder.id }, replace: true });
    } catch (err) {
      console.error("Failed to place order:", err);
      setError("There was an issue placing your order. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Order</h1>
      <p className="text-gray-600 mb-6">Please review your order details before completing your purchase.</p>

      <div className="space-y-6">
        {/* Shipping Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-3">Shipping To</h2>
          <p className="font-medium">{shippingAddress.fullName}</p>
          <p>{shippingAddress.addressLine1}</p>
          <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
        </div>

        {/* Payment Method (Dummy) */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-3">Payment Method</h2>
          <div className="flex items-center bg-gray-100 p-4 rounded-md">
            <svg className="w-8 h-8 text-gray-500 mr-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path></svg>
            <div>
                <p className="font-medium">Visa ending in 1234</p>
                <p className="text-sm text-gray-500">This is a simulated payment.</p>
            </div>
          </div>
        </div>
        
        {/* Total */}
        <div className="border-t pt-4">
            <div className="flex justify-between items-center text-2xl font-bold text-gray-900">
                <span>Order Total</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
        </div>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <Button
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className="w-full text-lg"
        >
          {isProcessing ? <><Spinner /> Processing...</> : `Pay $${totalPrice.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
