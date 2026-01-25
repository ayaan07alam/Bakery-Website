import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ExitIntentPopup from './components/ExitIntentPopup';
import WelcomePopup from './components/WelcomePopup';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CartDrawer />
      <FloatingWhatsApp />
      <main className={`flex-grow ${isAdminRoute ? 'pt-32 pb-8' : 'py-8'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/settings" element={<SiteSettings />} />
          <Route path="/admin/hero-slides" element={<HeroManager />} />
          <Route path="/admin/leads" element={<LeadManager />} />
          <Route path="/admin/menu" element={<MenuManager />} />
        </Routes>
      </main>
      <Footer />
      <ExitIntentPopup />
      <WelcomePopup />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
