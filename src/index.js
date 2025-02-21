// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from react-dom/client
import './index.css';
import App from './App';
import { CartProvider } from './CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root

root.render(
  <CartProvider>  {/* Wrap App with CartProvider */}
    <App />
  </CartProvider>
);
