import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Registration from './components/Registration';
import Login from './components/Login';
import Payment from './components/Payment';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';
import OrderConfirmation from './components/OrderConfirmation';
import OrderPage from './components/OrderPage';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import ChatBot from './ChatBot';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// Spinner component for full-page loading
const Spinner = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  }}>
    <div style={{
      border: '6px solid #f3f3f3',
      borderTop: '6px solid #3498db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load delay (replace with your auth/data fetch)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spinner />;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/orders" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
      <Footer />

      {/* Render ChatBot on all pages */}
      <ChatBot />
    </Router>
  );
};

export default App;
