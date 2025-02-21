import React from 'react';
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
import OrderConfirmation from './components/OrderConfirmation'; // Import OrderConfirmation
import OrderPage from './components/OrderPage'; // Ensure the file exists in the correct path


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} /> {/* New Route */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
      
      <Footer />
    </Router>
  );
};

export default App;
