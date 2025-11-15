import React, { useRef } from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.offsetWidth * 0.8; // Scroll by 80% of the visible width
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-6">{title}</h2>
            <div className="relative">
                <div ref={scrollRef} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                    {products.map(product => (
                        <div key={product.id} className="flex-shrink-0 w-80">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                 {/* Scroll Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-[-1.5rem]">
                    <button
                        onClick={() => scroll('left')}
                        className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors absolute -left-5"
                        aria-label="Scroll left"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors absolute -right-5"
                        aria-label="Scroll right"
                    >
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
        </section>
    );
};

// A helper class to hide scrollbars that might not be available in all Tailwind versions
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.append(style);

export default ProductCarousel;