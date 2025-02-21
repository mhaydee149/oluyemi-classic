import React from 'react';
import { useCart } from '../CartContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'iPhone 13', price: '$799', image: 'https://images-cdn.ubuy.co.id/64dc1dbacb432b7bec5203e4-open-box-apple-iphone-13-pro-max-a2484.jpg' },
    { id: 2, name: 'AirPods Pro', price: '$249', image: 'https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_big.jpg.large.jpg' },
    { id: 3, name: 'Portable Power Bank', price: '$39', image: 'https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_3.0,q_auto/media/catalog/product/G/K/69398_1727450194.jpg' },
    { id: 4, name: 'Laptop Charger', price: '$59', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCURZ9sDM1Mf2pb5rJeo8gnlS_kDYCzS_y5A&s' },
  ];

  return (
    <div>
      {/* Carousel Section */}
      <Carousel showArrows={false} autoPlay infiniteLoop interval={2000} showThumbs={false} showStatus={false}>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} className="carousel-image" />
            <p className="legend">{product.name} - {product.price}</p>
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
            <p>{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
