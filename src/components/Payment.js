import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext'; // 🔹 Ensure you use this to update cart
import './Payment.css';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const { setCart } = useCart(); // ✅ Using setCart to update cart state
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    if (cardNumber && expiryDate && cvv) {
      setPaymentStatus("Processing Payment...");
      setTimeout(() => {
        setPaymentStatus("Payment Successful! Redirecting...");
  
        // Get existing cart items
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
  
        // Convert cart items into order format
        const newOrders = cart.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
          totalPrice: item.quantity
            ? item.quantity * parseFloat(item.price.replace("$", ""))
            : parseFloat(item.price.replace("$", "")),
        }));
  
        // ✅ Save
  
  
        // ✅ Save new orders to localStorage
        const updatedOrders = [...previousOrders, ...newOrders];
localStorage.setItem("orders", JSON.stringify(updatedOrders));
window.dispatchEvent(new Event("storage")); // 🔹 Force update

  
        // ✅ Clear the cart
        localStorage.removeItem("cart");
        setCart([]); // ✅ Clear cart state properly
  
        setTimeout(() => {
          navigate("/order-confirmation");
        }, 3000);
      }, 3000);
    } else {
      setPaymentStatus("Please fill in all the fields correctly.");
    }
  };

  return (
    <div className="payment-container">
      <h1>Secure Payment</h1>
      <div className="payment-icons">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="payment-logo" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="payment-logo" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-logo" />
      </div>
      <form onSubmit={handlePayment} className="payment-form">
        <div className="form-group">
          <label>Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required className="input-field" />
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label>Expiry Date</label>
            <input type="text" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required className="input-field" />
          </div>
          <div className="form-group half-width">
            <label>CVV</label>
            <input type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required className="input-field" />
          </div>
        </div>
        <button type="submit" className="payment-btn">Pay Now</button>
      </form>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  );
};

export default Payment;
