import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/public/CartItem';
import Button from '../../components/common/Button';

const CartPage = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center bg-white p-12 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>
      <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center text-lg font-medium text-gray-700">
          <span>Subtotal ({totalItems} items)</span>
          <span className="font-bold text-xl text-gray-900">₹{totalPrice.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            onClick={clearCart}
            variant="secondary"
          >
            Clear Cart
          </Button>
          <Link to="/checkout" className="w-full sm:w-auto">
            <Button className="w-full">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;