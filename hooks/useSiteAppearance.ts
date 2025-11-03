import { useContext } from 'react';
import { SiteAppearanceContext } from '../context/SiteAppearanceContext';

export const useSiteAppearance = () => {
  const context = useContext(SiteAppearanceContext);
  if (context === undefined) {
    throw new Error('useSiteAppearance must be used within a SiteAppearanceProvider');
  }
  return context;
};