import React from 'react';
import { Link } from 'react-router-dom';
import { useComparison } from '../../hooks/useComparison';
import Button from '../common/Button';

const ComparisonTray = () => {
    const { items, removeItem, clearComparison } = useComparison();

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 text-white p-4 shadow-lg z-40 animate-slide-up">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h3 className="font-bold text-lg hidden sm:block">Compare Products</h3>
                    <div className="flex items-center gap-2">
                        {items.map(item => (
                            <div key={item.id} className="relative group">
                                <img src={item.imageUrls[0]} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label={`Remove ${item.name}`}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                         {[...Array(4 - items.length)].map((_, i) => (
                            <div key={i} className="w-12 h-12 bg-gray-700 rounded-md border-2 border-dashed border-gray-500 hidden sm:block"></div>
                        ))}
                    </div>
                    <span className="text-gray-400">({items.length}/4)</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="secondary" onClick={clearComparison} className="!py-2 !px-3 text-sm">
                        Clear All
                    </Button>
                    <Link to="/compare">
                        <Button disabled={items.length < 2} className="!py-2 !px-5 text-sm">
                            Compare Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ComparisonTray;