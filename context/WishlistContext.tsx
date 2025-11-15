import React, { createContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import { api } from '../services/mockApiService';
import { useAuth } from '../hooks/useAuth';

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  loading: boolean;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        const data = await api.getWishlist(user.email);
        setWishlist(data);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    } else {
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (productId: number) => {
    if (!user) return;
    setWishlist(prev => [...prev, productId]); // Optimistic update
    try {
      await api.addToWishlist(user.email, productId);
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      setWishlist(prev => prev.filter(id => id !== productId)); // Revert on error
    }
  };
  
  const removeFromWishlist = async (productId: number) => {
    if (!user) return;
    setWishlist(prev => prev.filter(id => id !== productId)); // Optimistic update
    try {
      await api.removeFromWishlist(user.email, productId);
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      // Revert on error
      fetchWishlist();
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loading
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
