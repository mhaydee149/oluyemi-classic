import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentReference = location.state?.paymentReference;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/orders');
    }, 10000); // Increased redirect time to 10 seconds

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="order-confirmation-container">
      <h1>Order Initiated Successfully! 🎉</h1>
      {paymentReference && (
        <p>Your Payment Reference: <strong>{paymentReference}</strong></p>
      )}
      <p>Your order is being processed. You will receive a confirmation email with the full details shortly.</p>
      <p>Thank you for shopping with Oluyemi Classic IT!</p>
      <button
        className="check-order-btn"
        onClick={() => navigate('/orders')}
      >
        Check Order Status
      </button>
    </div>
  );
};

export default OrderConfirmation;
