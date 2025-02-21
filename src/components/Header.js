import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Header.css';

const Header = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear session
    alert('Logged out successfully!');
    navigate('/login'); // Redirect to login page
  };

  return (
    <header>
      <h1>Oluyemi Classic IT</h1>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/cart">Cart ({cart.length})</Link> |
        <Link to="/checkout">Checkout</Link> |
        <Link to="/about-us">About Us</Link> |
        <Link to="/contact-us">Contact Us</Link> |

        {/* Show Login/Register only if user is NOT logged in */}
        {!user && (
          <>
            <Link to="/login" style={{ color: 'yellow', fontWeight: 'bold' }}>Login</Link> |
            <Link to="/register">Register</Link> |
          </>
        )}

        {/* Show Logout only if user IS logged in */}
        {user && (
          <button 
            onClick={handleLogout} 
            style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
