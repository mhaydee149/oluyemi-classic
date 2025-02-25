import React from 'react';
import { useCart } from '../CartContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import products from './productsData';

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div>
      {/* Carousel Section */}
      <Carousel 
        showArrows={false} 
        autoPlay 
        infiniteLoop 
        interval={2000} 
        showThumbs={false} 
        showStatus={false} 
        showIndicators={false} // Removed dots
      >
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} className="carousel-image" />
            <p className="legend">
              {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name} - ₦{product.price.toLocaleString()}
            </p>
          </div>
        ))}
      </Carousel>

      {/* Featured Products */}
      <h2>Featured Products</h2>
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

export default Home;
