import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import ProductCarousel from '../../components/public/ProductCarousel';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [specialOffers, setSpecialOffers] = useState<Product[]>([]);
  const [under99, setUnder99] = useState<Product[]>([]);
  const [inspired, setInspired] = useState<Product[]>([]);

  useEffect(() => {
    const fetchHomePageData = async () => {
      setLoading(true);
      try {
        const [
          bestSellersData,
          dealsData,
          under99Data,
          inspiredData
        ] = await Promise.all([
          api.getBestSellers(),
          api.getSpecialOffers(),
          api.getProductsUnderPrice(99),
          api.getInspiredByHistory(),
        ]);
        setBestSellers(bestSellersData);
        setSpecialOffers(dealsData);
        setUnder99(under99Data);
        setInspired(inspiredData);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomePageData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply"></div>
          {/* Floating decorative images */}
          <img src="https://placehold.co/600x400/06b6d4/white?text=Tech" alt="" className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-20 animate-float-1" />
          <img src="https://placehold.co/600x400/1e40af/white?text=Zenith" alt="" className="absolute -bottom-16 right-10 w-64 h-64 rounded-lg opacity-20 animate-float-2 transform rotate-12" />
          <img src="https://placehold.co/600x400/1d4ed8/white?text=Gear" alt="" className="absolute top-1/2 -right-20 w-40 h-40 rounded-full opacity-10 animate-float-3" />
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
      {under99.length > 0 && <ProductCarousel title="The $99 Store" products={under99} />}
      {inspired.length > 0 && <ProductCarousel title="Inspired by Your History" products={inspired} />}
    </div>
  );
};

export default HomePage;