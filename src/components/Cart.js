import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const clearCart = () => {
    setCart([]);
    alert('Cart is now empty');
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
    alert('One item removed from the cart');
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    updatedCart[index].totalPrice = updatedCart[index].quantity * updatedCart[index].price;
    setCart(updatedCart);
  };
  
  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updatedCart[index].totalPrice = updatedCart[index].quantity * updatedCart[index].price;
    } else {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };
  
  const totalAmount = cart.reduce((total, item) =>
    total + (item.price * (item.quantity || 1)), 0
  );

  const proceedToCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to proceed to checkout.");
      navigate("/login");
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty! Please add some items before proceeding.');
    } else {
      navigate('/checkout');
    }
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
                  <button onClick={() => decreaseQuantity(index)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => increaseQuantity(index)}>+</button>
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
        </div>
      )}
    </div>
  );
};

export default Cart;
