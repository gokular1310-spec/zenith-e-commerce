import React, { createContext, useState, useEffect, PropsWithChildren, useCallback } from 'react';
import { ThemeSettings } from '../types';
import { api } from '../services/mockApiService';

interface SiteAppearanceContextType {
  activeThemeSettings: ThemeSettings | null;
  reloadThemeSettings: () => void;
  loading: boolean;
}

export const SiteAppearanceContext = createContext<SiteAppearanceContextType | undefined>(undefined);

export const SiteAppearanceProvider = ({ children }: PropsWithChildren) => {
  const [activeThemeSettings, setActiveThemeSettings] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchActiveTheme = useCallback(async () => {
    setLoading(true);
    try {
      const settings = await api.getActiveThemeSettings();
      setActiveThemeSettings(settings);
    } catch (error) {
      console.error("Failed to fetch active theme settings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveTheme();
  }, [fetchActiveTheme]);

  const value = { 
    activeThemeSettings, 
    reloadThemeSettings: fetchActiveTheme,
    loading
  };

  return (
    <SiteAppearanceContext.Provider value={value}>
      {children}
    </SiteAppearanceContext.Provider>
  );
};