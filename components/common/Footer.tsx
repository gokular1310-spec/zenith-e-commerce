import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteAppearance } from '../../hooks/useSiteAppearance';
import { BackgroundSetting, SocialMediaLinks } from '../../types';
import { api } from '../../services/mockApiService';


const FacebookIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>;
const TwitterIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>;
const InstagramIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2.45a7.227 7.227 0 013.316.816 7.222 7.222 0 012.427 2.427 7.226 7.226 0 01.816 3.316c.01.624.01 1.867 0 2.492a7.227 7.227 0 01-.816 3.316 7.222 7.222 0 01-2.427 2.427 7.226 7.226 0 01-3.316.816c-.624.01-1.867.01-2.492 0a7.227 7.227 0 01-3.316-.816 7.222 7.222 0 01-2.427-2.427 7.226 7.226 0 01-.816-3.316c-.01-.624-.01-1.867 0-2.492a7.227 7.227 0 01.816-3.316 7.222 7.222 0 012.427-2.427A7.226 7.226 0 019.823 2.45c.624-.01 1.867-.01 2.492 0zm-2.492 1.956a5.271 5.271 0 00-2.392.59 5.266 5.266 0 00-1.75 1.75 5.271 5.271 0 00-.59 2.392c-.01.597-.01 1.77 0 2.367a5.271 5.271 0 00.59 2.392c.484.978 1.135 1.628 2.108 2.108a5.271 5.271 0 002.392.59c.597.01 1.77.01 2.367 0a5.271 5.271 0 002.392-.59c.978-.484 1.628-1.135 2.108-2.108a5.271 5.271 0 00.59-2.392c.01-.597.01-1.77 0-2.367a5.271 5.271 0 00-.59-2.392c-.484-.978-1.135-1.628-2.108-2.108a5.271 5.271 0 00-2.392-.59c-.597-.01-1.77-.01-2.367 0zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12 14a2 2 0 110-4 2 2 0 010 4zm4.95-6.9a.9.9 0 100-1.8.9.9 0 000 1.8z" clipRule="evenodd" /></svg>;
const LinkedInIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;

const Footer = () => {
  const { activeThemeSettings } = useSiteAppearance();
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks | null>(null);
  
  useEffect(() => {
    const fetchLinks = async () => {
        try {
            const links = await api.getSocialMediaLinks();
            setSocialLinks(links);
        } catch (error) {
            console.error("Failed to fetch social media links:", error);
        }
    };
    fetchLinks();
  }, []);

  const generateBackgroundStyle = (bg: BackgroundSetting | undefined) => {
    if (!bg) return {};
    if (bg.type === 'gradient' && bg.color2) {
        return { background: `linear-gradient(${bg.direction || 'to right'}, ${bg.color1}, ${bg.color2})` };
    }
    return { backgroundColor: bg.color1 };
  };

  const footerStyle = {
    ...generateBackgroundStyle(activeThemeSettings?.footer.background),
    color: activeThemeSettings?.footer.textColor,
  };

  const linkColorStyle = { color: activeThemeSettings?.footer.textColor };

  return (
    <footer style={footerStyle}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/?category=Accessories" className="text-base hover:underline" style={linkColorStyle}>Accessories</Link></li>
              <li><Link to="/?category=Monitors" className="text-base hover:underline" style={linkColorStyle}>Monitors</Link></li>
              <li><Link to="/?category=Audio" className="text-base hover:underline" style={linkColorStyle}>Audio</Link></li>
              <li><Link to="/?category=Laptops" className="text-base hover:underline" style={linkColorStyle}>Laptops</Link></li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">About</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-base hover:underline" style={linkColorStyle}>Our Story</Link></li>
              <li><Link to="/team" className="text-base hover:underline" style={linkColorStyle}>Team</Link></li>
              <li><Link to="/careers" className="text-base hover:underline" style={linkColorStyle}>Careers</Link></li>
              <li><Link to="/press" className="text-base hover:underline" style={linkColorStyle}>Press</Link></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/contact" className="text-base hover:underline" style={linkColorStyle}>Contact Us</Link></li>
              <li><Link to="/return-policy" className="text-base hover:underline" style={linkColorStyle}>Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-base hover:underline" style={linkColorStyle}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-base hover:underline" style={linkColorStyle}>Terms of Service</Link></li>
            </ul>
          </div>
          {/* Column 4: Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <div className="flex mt-4 space-x-6">
                {socialLinks?.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={linkColorStyle}><span className="sr-only">Facebook</span><FacebookIcon /></a>
                )}
                {socialLinks?.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={linkColorStyle}><span className="sr-only">Twitter</span><TwitterIcon /></a>
                )}
                 {socialLinks?.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={linkColorStyle}><span className="sr-only">Instagram</span><InstagramIcon /></a>
                )}
                 {socialLinks?.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={linkColorStyle}><span className="sr-only">LinkedIn</span><LinkedInIcon /></a>
                )}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p>&copy; {new Date().getFullYear()} Zenith E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
