import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="order-confirmation-container">
      <h1>Order Placed Successfully🎉!</h1>
      <p>Check your email for your order tracking number and payment receipt.</p>
      <p>Thank you for shopping with Oluyemi Classic IT!</p>
      <button className="check-order-btn" onClick={() => navigate('/orders')}>Check Order</button>
    </div>
  );
};

export default OrderConfirmation;