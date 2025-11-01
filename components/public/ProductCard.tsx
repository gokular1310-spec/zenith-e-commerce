import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl">
        <div className="relative pb-[75%]"> {/* 4:3 Aspect Ratio */}
          <img className="absolute h-full w-full object-cover" src={product.imageUrl} alt={product.name} />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-primary-600">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
            <Button onClick={handleAddToCart} className="opacity-0 group-hover:opacity-100 transition-opacity">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;