import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { ShippingAddress } from '../../types';
import Button from '../../components/common/Button';

const CheckoutPage = () => {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
  });

  useEffect(() => {
    // Prefill with dummy data for faster testing
    setShippingAddress({
      fullName: 'Test Customer',
      addressLine1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'USA',
    });
  }, []);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/payment', { state: { shippingAddress, cartItems: items, totalPrice } });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Shipping Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="fullName" id="fullName" value={shippingAddress.fullName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
            <input type="text" name="addressLine1" id="addressLine1" value={shippingAddress.addressLine1} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" name="city" id="city" value={shippingAddress.city} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
              <input type="text" name="state" id="state" value={shippingAddress.state} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
              <input type="text" name="postalCode" id="postalCode" value={shippingAddress.postalCode} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input type="text" name="country" id="country" value={shippingAddress.country} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
          </div>
          <div className="pt-6">
            <Button type="submit" className="w-full">
              Proceed to Payment
            </Button>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <img src={item.imageUrls[0]} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex justify-between text-lg font-medium text-gray-900">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;