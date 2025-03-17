import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { FaShoppingCart, FaArrowUp } from 'react-icons/fa'; 
import './Header.css';

const Header = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    navigate('/login');
  };

  const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  const totalPrice = cart.reduce((sum, item) => 
    sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0
  );

  const [showGoUp, setShowGoUp] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowGoUp(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header>
        <h1>Oluyemi Classic IT</h1>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link> |
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Shop</Link> |
          <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
            <FaShoppingCart /> Cart ({totalItems})
          </Link> |
          <Link to="/checkout" className={location.pathname === '/checkout' ? 'active' : ''}>Checkout</Link> |
          <Link to="/about-us" className={location.pathname === '/about-us' ? 'active' : ''}>About Us</Link> |
          <Link to="/contact-us" className={location.pathname === '/contact-us' ? 'active' : ''}>Contact Us</Link> |

          {user && <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>} |

          {!user ? (
            <>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link> |
              <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link> |
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          )}
        </nav>
      </header>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button className="floating-cart" onClick={() => navigate('/cart')}>
          🛒 {totalItems} item{totalItems !== 1 ? 's' : ''} - ₦{totalPrice.toLocaleString()}
        </button>
      )}

      {/* Scroll-to-Top Button */}
      {showGoUp && (
        <button className="go-up-button show" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default Header;
