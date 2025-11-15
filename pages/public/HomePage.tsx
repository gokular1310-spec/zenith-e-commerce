import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import ProductCarousel from '../../components/public/ProductCarousel';
import Button from '../../components/common/Button';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/public/ProductCard';

const floatingImageClasses = [
    "absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-20 animate-float-1 transition-all duration-1000 object-cover",
    "absolute -bottom-16 right-10 w-64 h-64 rounded-lg opacity-20 animate-float-2 transform rotate-12 transition-all duration-1000 object-cover",
    "absolute top-1/2 -right-20 w-40 h-40 rounded-full opacity-10 animate-float-3 transition-all duration-1000 object-cover",
    "absolute top-1/4 left-1/4 w-32 h-32 rounded-xl opacity-15 animate-float-4 transform -rotate-6 transition-all duration-1000 object-cover",
    "absolute bottom-1/4 -left-20 w-52 h-52 rounded-2xl opacity-15 animate-float-5 transform rotate-3 transition-all duration-1000 object-cover",
];

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

  const [loading, setLoading] = useState(true);
  
  // State for homepage carousels
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [specialOffers, setSpecialOffers] = useState<Product[]>([]);
  const [under99, setUnder99] = useState<Product[]>([]);
  const [inspired, setInspired] = useState<Product[]>([]);
  
  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [floatingProducts, setFloatingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        if (category) {
          // Fetch and filter products if category is present in URL
          const allProducts = await api.getProducts();
          let products = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
          if (subcategory) {
              products = products.filter(p => p.subCategory && p.subCategory.toLowerCase() === subcategory.toLowerCase());
          }
          setFilteredProducts(products);
        } else {
          // Fetch carousel data for the main homepage
          const [
            allProductsData,
            bestSellersData,
            dealsData,
            under99Data,
            inspiredData
          ] = await Promise.all([
            api.getProducts(),
            api.getBestSellers(),
            api.getSpecialOffers(),
            api.getProductsUnderPrice(8000),
            api.getInspiredByHistory(),
          ]);
          setAllProducts(allProductsData);
          setBestSellers(bestSellersData);
          setSpecialOffers(dealsData);
          setUnder99(under99Data);
          setInspired(inspiredData);
        }
      } catch (error) {
        console.error("Failed to fetch page data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [category, subcategory]);
  
  // Effect for floating images
  useEffect(() => {
    if (category || allProducts.length < 5) return;

    const selectRandomProducts = () => {
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        setFloatingProducts(shuffled.slice(0, 5));
    };

    selectRandomProducts(); // Initial selection

    const intervalId = setInterval(selectRandomProducts, 30000); // 30 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount or when category changes
  }, [allProducts, category]);


  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }
  
  // Render filtered product grid view if a category is selected
  if (category) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-8 capitalize">
          {subcategory ? subcategory : category}
        </h1>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h2>
              <p className="text-gray-600 mb-6">There are no products in this category yet. Please check back later!</p>
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
          </div>
        )}
      </div>
    );
  }

  // Render original homepage with hero and carousels
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply"></div>
          {/* Floating decorative images */}
          {floatingProducts.map((product, index) => (
            <img 
              key={index} 
              src={product.imageUrls[0]} 
              alt="" 
              className={floatingImageClasses[index]} 
            />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto text-center py-24 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Elevate Your Lifestyle</span>
            <span className="block text-primary-600 dark:text-primary-400">With Premium Tech</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-700 dark:text-gray-300">
            Discover a curated selection of the finest gadgets, accessories, and lifestyle products designed to enhance your world.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <Link to="/deals">
                <Button className="w-full sm:w-auto text-lg py-3 px-8">
                    Shop Deals
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Carousels */}
      {bestSellers.length > 0 && <ProductCarousel title="Best Sellers" products={bestSellers} />}
      {specialOffers.length > 0 && <ProductCarousel title="Special Offers" products={specialOffers} />}
      {under99.length > 0 && <ProductCarousel title="Under ₹8000" products={under99} />}
      {inspired.length > 0 && <ProductCarousel title="Inspired by Your History" products={inspired} />}
    </div>
  );
};

export default HomePage;