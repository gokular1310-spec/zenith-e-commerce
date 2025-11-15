import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { SiteAppearanceProvider } from './context/SiteAppearanceContext';

import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/public/HomePage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import CartPage from './pages/public/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import CheckoutPage from './pages/public/CheckoutPage';
import PaymentPage from './pages/public/PaymentPage';
import OrderConfirmationPage from './pages/public/OrderConfirmationPage';
import MyOrdersPage from './pages/public/MyOrdersPage';
import TrackOrderPage from './pages/public/TrackOrderPage';
import MyMessagesPage from './pages/public/MyMessagesPage';
import ConversationDetailPage from './pages/public/ConversationDetailPage';
import MyProfilePage from './pages/public/MyProfilePage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import ResetPasswordPage from './pages/public/ResetPasswordPage';
import DynamicPage from './pages/public/DynamicPage';
// Add static page imports
import AboutPage from './pages/public/AboutPage';
import TeamPage from './pages/public/TeamPage';
import ContactPage from './pages/public/ContactPage';
import ReturnPolicyPage from './pages/public/ReturnPolicyPage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import TermsOfServicePage from './pages/public/TermsOfServicePage';
import ComingSoonPage from './pages/public/ComingSoonPage';
import DealsPage from './pages/public/DealsPage';
import CareersPage from './pages/public/CareersPage';
import SearchResultsPage from './pages/public/SearchResultsPage';


import ProtectedRoute from './layouts/ProtectedRoute';
import CustomerProtectedRoute from './layouts/CustomerProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminAddProductPage from './pages/admin/AdminAddProductPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminAddUserPage from './pages/admin/AdminAddUserPage';
import AdminConversationDetailPage from './pages/admin/AdminConversationDetailPage';
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage';
import AdminAISettingsPage from './pages/admin/AdminAISettingsPage';
import AdminEditProductPage from './pages/admin/AdminEditProductPage';
import AdminPagesListPage from './pages/admin/AdminPagesListPage';
import AdminAddPage from './pages/admin/AdminAddPage';
import AdminEditPage from './pages/admin/AdminEditPage';
import AdminThemeSettingsPage from './pages/admin/AdminThemeSettingsPage';


import SubAdminProtectedRoute from './layouts/SubAdminProtectedRoute';
import SubAdminLayout from './layouts/SubAdminLayout';
import SubAdminDashboardPage from './pages/admin/SubAdminDashboardPage';
import SubAdminProductsPage from './pages/admin/SubAdminProductsPage';
import SubAdminAddProductPage from './pages/admin/SubAdminAddProductPage';
import SubAdminEditProductPage from './pages/admin/SubAdminEditProductPage';
import SubAdminOrdersPage from './pages/admin/SubAdminOrdersPage';
import SubAdminOrderDetailPage from './pages/admin/SubAdminOrderDetailPage';
import SubAdminMessagesPage from './pages/admin/SubAdminMessagesPage';
import SubAdminConversationDetailPage from './pages/admin/SubAdminConversationDetailPage';


// FIX: Extracting providers and routes into a separate component.
// This can resolve complex type inference issues with router context and hooks,
// which may be causing the misleading 'missing children' errors on AuthProvider,
// CartProvider, and ProtectedRoute.
const AppRoutes = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <SiteAppearanceProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products/:productId" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password/:token" element={<ResetPasswordPage />} />
              <Route path="search" element={<SearchResultsPage />} />
              
              {/* CMS-driven pages */}
              <Route path="pages/:slug" element={<DynamicPage />} />

              {/* Static Pages */}
              <Route path="about" element={<AboutPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="return-policy" element={<ReturnPolicyPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="terms-of-service" element={<TermsOfServicePage />} />
              <Route path="coming-soon" element={<ComingSoonPage />} />
              <Route path="deals" element={<DealsPage />} />
              <Route path="careers" element={<CareersPage />} />


              {/* Customer Protected Routes */}
              <Route element={<CustomerProtectedRoute />}>
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="my-orders" element={<MyOrdersPage />} />
                <Route path="my-orders/:orderId" element={<TrackOrderPage />} />
                <Route path="my-messages" element={<MyMessagesPage />} />
                <Route path="my-messages/:conversationId" element={<ConversationDetailPage />} />
                <Route path="my-profile" element={<MyProfilePage />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            {/* FIX: Refactored to use layout route pattern to resolve 'missing children' errors. */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="orders/:orderId" element={<AdminOrderDetailPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="products/new" element={<AdminAddProductPage />} />
                <Route path="products/edit/:productId" element={<AdminEditProductPage />} />
                <Route path="messages" element={<AdminMessagesPage />} />
                <Route path="messages/:conversationId" element={<AdminConversationDetailPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="users/new" element={<AdminAddUserPage />} />
                <Route path="ai-settings" element={<AdminAISettingsPage />} />
                <Route path="pages" element={<AdminPagesListPage />} />
                <Route path="pages/new" element={<AdminAddPage />} />
                <Route path="pages/edit/:pageId" element={<AdminEditPage />} />
                <Route path="pages/themes" element={<AdminThemeSettingsPage />} />
              </Route>
            </Route>
            
            {/* Sub-Admin Routes */}
            {/* FIX: Refactored to use layout route pattern to resolve 'missing children' errors. */}
            <Route element={<SubAdminProtectedRoute />}>
              <Route path="/sub-admin" element={<SubAdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<SubAdminDashboardPage />} />
                <Route path="orders" element={<SubAdminOrdersPage />} />
                <Route path="orders/:orderId" element={<SubAdminOrderDetailPage />} />
                <Route path="products" element={<SubAdminProductsPage />} />
                <Route path="products/new" element={<SubAdminAddProductPage />} />
                <Route path="products/edit/:productId" element={<SubAdminEditProductPage />} />
                <Route path="messages" element={<SubAdminMessagesPage />} />
                <Route path="messages/:conversationId" element={<SubAdminConversationDetailPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SiteAppearanceProvider>
      </CartProvider>
    </AuthProvider>
  );
}


function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;