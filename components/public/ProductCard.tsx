import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import Button from '../common/Button';
import { useComparison } from '../../hooks/useComparison';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { items: comparisonItems, addItem: addCompareItem, removeItem: removeCompareItem, isFull } = useComparison();
  
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
      e.preventDefault();
      e.stopPropagation();
      if (e.target.checked) {
          addCompareItem(product);
      } else {
          removeCompareItem(product.id);
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
          <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
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