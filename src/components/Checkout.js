import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div className="checkout-container">
        <h2>Access Denied</h2>
        <p>Please <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/login')}>log in</span> to checkout.</p>
      </div>
    );
  }

  const totalAmount = cart.reduce(
    (total, item) => total + parseFloat(item.price.replace('$', '')) * (item.quantity || 1), 
    0
  );

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty. Please add items to your cart before checking out.</p>
      ) : (
        <div className="checkout-items">
          <h3>Review Your Items:</h3>
          {cart.map((item, index) => (
            <div key={index} className="checkout-item">
              <img src={item.image} alt={item.name} className="checkout-item-image" />
              <div className="checkout-item-details">
                <h4>{item.name}</h4>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>  {/* Show correct quantity */}
              </div>
            </div>
          ))}
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button onClick={() => navigate('/payment')} className="checkout-btn">Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
