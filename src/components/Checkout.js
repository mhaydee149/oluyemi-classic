import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div className="checkout-container">
        <h2>Access Denied</h2>
        <p>
          Please{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            log in
          </span>{' '}
          to checkout.
        </p>
      </div>
    );
  }

  const totalAmount = cart.reduce((total, item) => {
    let price = item.price;
    if (typeof price === 'string') {
      price = price.replace(/[^0-9.-]+/g, '');
      price = parseFloat(price);
    }
    return total + (price || 0) * (item.quantity || 1);
  }, 0);

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return 'Hello, I want to order some products.';

    const productDetails = cart
      .map(
        (item) =>
          `*${item.name}* - ₦${Number(item.price).toLocaleString()} x ${
            item.quantity || 1
          }`
      )
      .join('\n');

    return `Hello, I want to buy the following items:\n\n${productDetails}\n\nTotal: ₦${totalAmount.toLocaleString()}`;
  };

  const whatsappLink = `https://wa.me/2348123456789?text=${encodeURIComponent(
    generateWhatsAppMessage()
  )}`;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">
          Your cart is empty. Please add items to your cart before checking out.
        </p>
      ) : (
        <div className="checkout-items">
          <h3>Review Your Items:</h3>
          {cart.map((item, index) => (
            <div key={index} className="checkout-item">
              <img src={item.image} alt={item.name} className="checkout-item-image" />
              <div className="checkout-item-details">
                <h4>{item.name}</h4>
                <p>Price: ₦{Number(item.price).toLocaleString()}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
            </div>
          ))}
          <h3>Total: ₦{totalAmount.toLocaleString()}</h3>
          <button onClick={() => navigate('/payment')} className="checkout-btn">
            Proceed to Payment
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <FaWhatsapp size={24} /> Message Us on WhatsApp
          </a>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
            style={{ marginTop: '10px' }}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
