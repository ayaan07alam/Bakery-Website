import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import SiteSettings from './pages/admin/SiteSettings';
import HeroManager from './pages/admin/HeroManager';
import LeadManager from './pages/admin/LeadManager';
import MenuManager from './pages/admin/MenuManager';
import ProductManager from './pages/admin/ProductManager';
import CategoryManager from './pages/admin/CategoryManager';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ExitIntentPopup from './components/ExitIntentPopup';
import WelcomePopup from './components/WelcomePopup';
import PhoneCollectorModal from './components/PhoneCollectorModal';
import QuickCallbackWidget from './components/QuickCallbackWidget';
import CookieConsent from './components/CookieConsent';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import { useVisitorTracking } from './hooks/useVisitorTracking';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { sessionId, trackPageView } = useVisitorTracking();

  // Track page views on route changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname, trackPageView]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CartDrawer />

      <FloatingWhatsApp currentPage={location.pathname} />
      <ScrollToTop />
      <ScrollToTopButton />
      <main className={`flex-grow ${isAdminRoute ? 'pt-32 pb-8' : location.pathname === '/' ? '' : 'pt-32 pb-8'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Admin Routes - Protected */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><SiteSettings /></ProtectedRoute>} />
          <Route path="/admin/hero-slides" element={<ProtectedRoute><HeroManager /></ProtectedRoute>} />
          <Route path="/admin/leads" element={<ProtectedRoute><LeadManager /></ProtectedRoute>} />
          <Route path="/admin/menu" element={<ProtectedRoute><MenuManager /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><ProductManager /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><CategoryManager /></ProtectedRoute>} />

          {/* Public Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </main>
      <Footer />

      {/* Lead Generation Components - Only on non-admin routes */}
      {!isAdminRoute && (
        <>
          <ExitIntentPopup />
          <WelcomePopup />
          <PhoneCollectorModal sessionId={sessionId} currentPage={location.pathname} />
          <QuickCallbackWidget sessionId={sessionId} currentPage={location.pathname} />
          <CookieConsent />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
