import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import products from './productsData';

const Home = () => {
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products per page in Featured Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

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
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">₦{product.price.toLocaleString()}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

     {/* Pagination for Featured Products */}
{totalPages > 1 && (
  <div className="pagination">
    <button 
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
      disabled={currentPage === 1}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button 
        key={index} 
        onClick={() => setCurrentPage(index + 1)}
        className={currentPage === index + 1 ? 'active' : ''}
      >
        {index + 1}
      </button>
    ))}

    <button 
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)}

    </div>
  );
};

export default Home;
