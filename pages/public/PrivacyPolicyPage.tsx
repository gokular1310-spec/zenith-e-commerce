import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>Zenith E-Commerce ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Zenith.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact customer service. This may include:</p>
        <ul>
          <li>Name, email address, phone number</li>
          <li>Shipping and billing addresses</li>
          <li>Payment information (processed by a secure third-party)</li>
          <li>Order history and product preferences</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your account and orders</li>
          <li>Provide customer support</li>
          <li>Improve our website and product offerings</li>
          <li>Send you marketing communications, if you opt-in</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Information Sharing</h2>
        <p>We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing, shipping, and data analysis. These providers are obligated to protect your information and are not authorized to use it for any other purpose.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Your Choices</h2>
        <p>You can review and update your account information at any time by logging into your account. You may also opt-out of receiving marketing emails from us by following the unsubscribe link in those emails.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us through our <a href="/#/contact" className="text-primary-600 hover:underline">Contact Page</a>.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;