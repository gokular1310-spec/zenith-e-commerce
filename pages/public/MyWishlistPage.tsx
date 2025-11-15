import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { api } from '../../services/mockApiService';
import { useWishlist } from '../../hooks/useWishlist';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import ProductCard from '../../components/public/ProductCard';

const MyWishlistPage = () => {
  const { wishlist, loading: wishlistLoading } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlist.length > 0) {
        setLoading(true);
        try {
          // In a real app, you might have an endpoint for this.
          // Here, we fetch all and filter.
          const allProducts = await api.getProducts();
          const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id));
          setProducts(wishlistProducts);
        } catch (error) {
          console.error("Failed to fetch wishlist products:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
        setLoading(false);
      }
    };

    if (!wishlistLoading) {
        fetchProducts();
    }
  }, [wishlist, wishlistLoading]);

  if (loading || wishlistLoading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-8">
        My Wishlist
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-6">Explore our products and save your favorites to view them here later. Click the heart icon on any product to add it!</p>
            <Link to="/">
              <Button>Start Shopping</Button>
            </Link>
        </div>
      )}
    </div>
  );
};

export default MyWishlistPage;
