import React, { useEffect } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import whatsappIcon from '../assets/whatsapp-icon.png';
import './Cart.css';

const Cart = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const sellerPhoneNumber = "2348102841046";

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
      alert('Cart is now empty');
    }
  };

  const removeFromCart = (index) => {
    if (window.confirm("Remove this item from the cart?")) {
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
    }
  };

  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    const newQuantity = (updatedCart[index].quantity || 1) + change;
    if (newQuantity > 0) {
      updatedCart[index].quantity = newQuantity;
      updatedCart[index].totalPrice = newQuantity * Number(updatedCart[index].price);
      setCart(updatedCart);
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.price) * (item.quantity || 1), 0
  );

  const proceedToCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to proceed to checkout.");
      navigate("/login");
    } else if (cart.length === 0) {
      alert('Your cart is empty! Please add some items before proceeding.');
    } else {
      navigate('/checkout');
    }
  };

  const sendWhatsAppMessage = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add some products before messaging.");
      return;
    }

    let message = "Hello, I am interested in purchasing the following products:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ₦${Number(item.price).toLocaleString()} (Qty: ${item.quantity || 1})\n`;
      message += `Image: ${item.image}\n\n`;
    });
    message += `\nTotal: ₦${totalAmount.toLocaleString()}\n\nPlease let me know how to proceed.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${sellerPhoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">₦{Number(item.price).toLocaleString()}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(index, -1)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(index, 1)}>+</button>
                </div>
              </div>
              <div className="cart-item-actions">
                <button className="cart-item-remove" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ₦{totalAmount.toLocaleString()}</h3>

          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
          <button className="checkout-now-btn" onClick={proceedToCheckout}>Checkout Now</button>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
            style={{ marginTop: '10px' }}
          >
            Continue Shopping
          </button>

          <div className="whatsapp-section">
            <p>You can click on WhatsApp to message us with your selected product.</p>
            <button className="whatsapp-btn" onClick={sendWhatsAppMessage}>
              <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon" />
              Message on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
