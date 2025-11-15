import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { api } from '../../services/mockApiService';
import ProductCard from '../../components/public/ProductCard';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const DealsPage = () => {
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await api.getProducts();
        const deals = data.filter(p => p.originalPrice && p.originalPrice > p.price);
        setDealProducts(deals);
      } catch (error) {
        console.error("Failed to fetch products for deals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-8">
        Today's Special Offers
      </h1>
      {dealProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dealProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Deals Available</h2>
            <p className="text-gray-600 mb-6">It looks like there are no special offers at the moment. Please check back later!</p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
        </div>
      )}
    </div>
  );
};

export default DealsPage;