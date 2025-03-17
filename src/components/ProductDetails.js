import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import products from './productsData';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-price">₦{product.price.toLocaleString()}</p>
          <p className="product-description">{product.description || "No description available."}</p>
          <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
          <Link to="/" className="back-link">Back to Products</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
