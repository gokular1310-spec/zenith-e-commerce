import React from 'react';

const ReturnPolicyPage = () => {
  return (
    <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Return Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p>At Zenith, we want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, we're here to help.</p>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our 30-Day Guarantee</h2>
          <p>You can return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.).</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Items Eligible for Return</h2>
          <p>To be eligible for a return, your item must be:</p>
          <ul>
            <li>Unused and in the same condition that you received it.</li>
            <li>In its original packaging with all tags and accessories.</li>
            <li>Accompanied by a receipt or proof of purchase.</li>
          </ul>
          <p>Please note that some items, such as software or personal care products, may not be eligible for return.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How to Start a Return</h2>
          <p>To initiate a return, please follow these steps:</p>
          <ol>
            <li>Log in to your account and go to the "My Orders" page.</li>
            <li>Find the order you wish to return and click "View Details".</li>
            <li>Click the "Request Return" button and fill out the required information.</li>
            <li>Our support team will review your request and provide you with a return shipping label and instructions.</li>
          </ol>
        </div>

        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Refunds</h2>
            <p>Once we receive and inspect your return, we will send you an email to notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.</p>
        </div>
        
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Questions?</h2>
            <p>If you have any questions about our return policy, please don't hesitate to <a href="/#/contact" className="text-primary-600 hover:underline">contact our support team</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;