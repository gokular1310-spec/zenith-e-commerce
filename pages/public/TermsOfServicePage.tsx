import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Zenith E-Commerce website (the "Service") operated by Zenith ("us", "we", or "our").</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Accounts</h2>
        <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Orders and Payments</h2>
        <p>By placing an order, you warrant that you are legally capable of entering into binding contracts. All prices are subject to change without notice. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in the description or price of the product, or error in your order.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Zenith and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Limitation of Liability</h2>
        <p>In no event shall Zenith, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Changes</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.</p>

        <p>If you have any questions about these Terms, please contact us.</p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;