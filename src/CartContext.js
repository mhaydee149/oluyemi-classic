import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add product, or increase quantity if it exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex !== -1) {
        // Update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
        return updatedCart;
      } else {
        // Add new product with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert('Product added to the cart');
  };

  // Remove item by index
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      return updatedCart;
    });
    alert('Product removed from the cart');
  };

  // Update quantity for item at index by delta (+1 or -1)
  const updateQuantity = (index, delta) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const currentQty = updatedCart[index].quantity || 1;
      const newQty = currentQty + delta;
      if (newQty < 1) return prevCart; // prevent quantity < 1
      updatedCart[index].quantity = newQty;
      return updatedCart;
    });
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
