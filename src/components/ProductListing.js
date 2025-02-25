import React from 'react';
import { useCart } from '../CartContext';
import products from './productsData';
import './ProductListing.css';

const ProductListing = () => {
  const { addToCart } = useCart();

  return (
    <div className="product-list-container">
      <h2>All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">₦{product.price.toLocaleString()}</p>

            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
