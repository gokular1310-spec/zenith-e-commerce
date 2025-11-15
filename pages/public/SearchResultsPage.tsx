import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Product } from '../../types';
import { api } from '../../services/mockApiService';
import ProductCard from '../../components/public/ProductCard';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const SearchResultsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await api.searchProducts(query);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-8">
        {query ? `Search results for "${query}"` : 'Search'}
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h2>
            <p className="text-gray-600 mb-6">
                {query ? `Sorry, we couldn't find any products matching "${query}".` : 'Please enter a search term to begin.'}
            </p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
