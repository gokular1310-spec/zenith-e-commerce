import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { api } from '../../services/mockApiService';
import { useAuth } from '../../hooks/useAuth';

const ContactPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: user?.email || '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await api.startConversation(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: user?.email || '', message: '' }); // Reset form on success
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          We'd love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
          <p className="mt-4 text-gray-600">Fill up the form and our team will get back to you within 24 hours.</p>
          <div className="mt-8 space-y-4 text-gray-700">
            <p className="flex items-center">
              <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>(123) 456-7890</span>
            </p>
            <p className="flex items-center">
              <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span>contact@zenith.com</span>
            </p>
            <p className="flex items-center">
              <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>123 Zenith Ave, Tech City, 10101</span>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!user && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
              <div className="mt-1">
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1">
              <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} disabled={!!user} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <div className="mt-1">
              <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"></textarea>
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </div>
          {submitStatus === 'success' && (
            <div className="text-green-600 text-center p-4 bg-green-50 rounded-md">
                <p>Thank you for your message! A new conversation has been started.</p>
                {user && (
                    <p className="mt-2">You can view and reply to this message in the <Link to="/my-messages" className="font-bold underline">My Messages</Link> section.</p>
                )}
            </div>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-center">Something went wrong. Please try again later.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;