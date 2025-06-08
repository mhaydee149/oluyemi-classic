import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/orders');
    }, 7000); // redirect after 7 seconds

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="order-confirmation-container">
      <h1>Order Placed Successfully 🎉!</h1>
      <p>Check your Mail Inbox for your order tracking number and payment receipt.</p>
      <p>Thank you for shopping with Oluyemi Classic IT!</p>
      <button
        className="check-order-btn"
        onClick={() => navigate('/orders')}
      >
        Check Order
      </button>
    </div>
  );
};

export default OrderConfirmation;
