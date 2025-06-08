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

  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.price) * (item.quantity || 1),
    0
  );

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: totalAmount * 100, // amount in kobo for Paystack
    publicKey: 'pk_test_8cf3b8ddf1302360895d3365e9de8327aec489e4',
  };

  const onSuccess = async (reference) => {
    console.log('[onSuccess] Payment succeeded:', reference);

    try {
      const orderDate = new Date().toISOString();
      const orderReference = reference.reference;

      const newOrders = cart.map(item => ({
        id: `${orderReference}-${item.id || item.name}`,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity || 1,
        totalPrice: Number(item.price) * (item.quantity || 1),
        image: item.image || '',
        date: orderDate,
        status: 'ongoing',
        reference: orderReference,
      }));

      const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const updatedOrders = [...existingOrders, ...newOrders];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      console.log('[onSuccess] Orders saved locally.');
    } catch (error) {
      console.error('[onSuccess] Error saving orders:', error);
    }

    // Send confirmation email asynchronously without waiting
    (async () => {
      try {
        const response = await fetch('http://localhost:5000/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            reference: reference.reference,
            products: cart.map(item => item.name).join(', '),
            date: new Date().toLocaleString(),
            amount: totalAmount,
          }),
        });
        if (!response.ok) {
          const errText = await response.text();
          console.error('[onSuccess] Email sending failed:', errText);
        } else {
          console.log('[onSuccess] Confirmation email sent.');
        }
      } catch (error) {
        console.error('[onSuccess] Email sending error:', error);
      }
    })();

    // Clear UI & navigate immediately
    setProcessing(false);
    setCart([]);
    localStorage.removeItem('cart');
    navigate('/order-confirmation');
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