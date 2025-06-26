import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { PaystackConsumer } from 'react-paystack';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const { cart, setCart } = useCart();
  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get user info

  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.price) * (item.quantity || 1),
    0
  );

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: totalAmount * 100, // amount in kobo for Paystack
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    metadata: {
      userId: user ? user.id : null, // user.id should be user._id from backend
      cartItems: cart.map(item => ({
        productId: item.id || item.productId || null, // Prefer a stable product ID
        name: item.name,
        quantity: item.quantity || 1,
        price: Number(item.price)
      })),
      customerEmail: email // Include customer email in metadata as well
    }
  };

  const onSuccess = async (reference) => {
    // Note: Order creation and primary email confirmation are now handled by the backend webhook.
    // The frontend's responsibility is to clear the cart and navigate the user.
    // The metadata (userId, cartItems, customerEmail) has been sent to Paystack.
    console.log('[onSuccess] Payment succeeded via Paystack client:', reference);

    // Clear UI & navigate immediately
    setProcessing(false);
    setCart([]);
    localStorage.removeItem('cart');
    navigate('/order-confirmation', {
      state: { paymentReference: reference.reference }
    });
  };

  const onClose = () => {
    console.log('[onClose] Payment popup closed by user.');
    setProcessing(false);
  };

  const handlePayNowClick = (initializePayment) => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    setProcessing(true);
    try {
      initializePayment(onSuccess, onClose);
    } catch (error) {
      console.error('Error initializing payment:', error);
      alert('Failed to start payment. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Secure Payment</h1>

      <div className="payment-icons">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
          alt="Visa"
          className="payment-logo"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
          alt="Mastercard"
          className="payment-logo"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="payment-logo"
        />
      </div>

      <form onSubmit={e => e.preventDefault()} className="payment-form">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="input-field"
          disabled={processing}
          autoComplete="email"
        />

        <h3>Total: ₦{totalAmount.toLocaleString()}</h3>

        <PaystackConsumer {...config}>
          {({ initializePayment }) => (
            <button
              type="button"
              className="payment-btn"
              onClick={() => handlePayNowClick(initializePayment)}
              disabled={processing}
              aria-busy={processing}
            >
              {processing ? 'Processing...' : 'Pay Now'}
            </button>
          )}
        </PaystackConsumer>
      </form>
    </div>
  );
};

export default Payment;