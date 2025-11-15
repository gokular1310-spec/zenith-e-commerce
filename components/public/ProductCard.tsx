import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import Button from '../common/Button';
import { useComparison } from '../../hooks/useComparison';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';

interface ProductCardProps {
  product: Product;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-all duration-200 ${filled ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`} fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 1 : 1.5} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.672l1.318-1.354a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { items: comparisonItems, addItem: addCompareItem, removeItem: removeCompareItem, isFull } = useComparison();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };
  
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isOnSale ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const isInCompare = comparisonItems.some(item => item.id === product.id);
  const canAddToCompare = !isFull || isInCompare;

  const handleCompareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.target.checked) {
          addCompareItem(product);
      } else {
          removeCompareItem(product.id);
      }
  };
  
  const isProductInWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
        navigate('/login');
        return;
    }
    if (isProductInWishlist) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product.id);
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl h-full flex flex-col">
        <div className="relative pb-[75%]"> {/* 4:3 Aspect Ratio */}
          <img className="absolute h-full w-full object-cover" src={product.imageUrls[0]} alt={product.name} />
           {isOnSale && (
              <div className="absolute top-3 left-0 bg-red-500 text-white font-bold text-xs py-1 px-3 rounded-r-full shadow-md">
                  {discountPercent}% OFF
              </div>
          )}
          <button 
              onClick={handleWishlistToggle}
              className="absolute top-2 right-2 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm rounded-full p-1.5 z-10 transition-colors"
              aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
              <HeartIcon filled={isProductInWishlist} />
          </button>
          <div className="absolute bottom-2 right-2 z-10" onClick={(e) => {e.preventDefault(); e.stopPropagation();}}>
            <label htmlFor={`compare-${product.id}`} className="flex items-center bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-opacity-75 transition-colors" title={!canAddToCompare ? 'Maximum 4 products for comparison' : ''}>
                <input
                    id={`compare-${product.id}`}
                    type="checkbox"
                    checked={isInCompare}
                    onChange={handleCompareChange}
                    disabled={!canAddToCompare}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer disabled:cursor-not-allowed"
                />
                <span className="ml-1.5 select-none">Compare</span>
            </label>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">{product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex-grow">
             <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                {isOnSale && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice?.toFixed(2)}</p>
                )}
             </div>
            <Button onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;