import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Product, Review } from '../../types';
import { api } from '../../services/mockApiService';
import { useCart } from '../../hooks/useCart';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import ProductCard from '../../components/public/ProductCard';
import ProductReviews from '../../components/public/ProductReviews';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    if (!productId) return;
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const [productData, allProductsData] = await Promise.all([
            api.getProductById(parseInt(productId, 10)),
            api.getProducts()
        ]);
        setProduct(productData || null);
        setAllProducts(allProductsData);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  const handleReviewAdded = (newReview: Review) => {
    setProduct(prevProduct => {
        if (!prevProduct) return null;
        const updatedReviews = [...(prevProduct.reviews || []), newReview];
        return { ...prevProduct, reviews: updatedReviews };
    });
  };

  const { relatedProducts, suggestedProducts } = useMemo(() => {
    if (!product || allProducts.length === 0) {
      return { relatedProducts: [], suggestedProducts: [] };
    }
    const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const suggested = allProducts.filter(p => p.category !== product.category && p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 4);
    return { relatedProducts: related, suggestedProducts: suggested };
  }, [product, allProducts]);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  if (!product) {
    return <div className="text-center text-xl">Product not found.</div>;
  }
  
  const handleAddToCart = () => {
    addItem(product);
  };
  
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isOnSale ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="space-y-12">
      {/* Main Product Section */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 relative">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
            {isOnSale && (
                <div className="absolute top-6 left-0 bg-red-500 text-white font-bold py-1 px-4 rounded-r-full shadow-md">
                    {discountPercent}% OFF
                </div>
            )}
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wide">{product.category}</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{product.name}</h1>
            <div className="flex items-baseline gap-4 mt-4">
                <p className="text-3xl text-gray-800">${product.price.toFixed(2)}</p>
                {isOnSale && (
                    <p className="text-2xl text-gray-500 line-through">${product.originalPrice?.toFixed(2)}</p>
                )}
            </div>
            <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>
            <div className="mt-8">
              <Button onClick={handleAddToCart} className="w-full sm:w-auto text-lg py-3 px-6">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Specs and Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {product.specs && (
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Specifications</h3>
                <ul className="space-y-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                        <li key={key} className="flex justify-between text-sm border-b pb-2">
                            <span className="font-semibold text-gray-600">{key}</span>
                            <span className="text-gray-800">{value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <ProductReviews productId={product.id} reviews={product.reviews || []} onReviewAdded={handleReviewAdded} />
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
      )}

      {/* Suggested Products Section */}
       {suggestedProducts.length > 0 && (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;