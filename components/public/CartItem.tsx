import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center py-5">
      <div className="flex-shrink-0">
        <img src={item.imageUrls[0]} alt={item.name} className="w-24 h-24 rounded-md object-cover" />
      </div>
      <div className="ml-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
            <input
              id={`quantity-${item.id}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
              className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;