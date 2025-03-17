import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import products from './productsData';
import './ProductListing.css';

const ProductListing = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Change this number for more products per page

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const productCategory = product.category ? product.category.toLowerCase() : '';
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || productCategory === category.toLowerCase())
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="product-list-container">
      <h2>All Products</h2>

      {/* Search & Filter */}
      <div className="search-filter">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && <button onClick={() => setSearchTerm('')}>Clear</button>}

        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          <option value="phones">Phones</option>
          <option value="accessories">Accessories</option>
          <option value="laptops">Laptops</option>
        </select>
      </div>

      {/* Product List */}
      <div className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image" 
                loading="lazy"
                onError={(e) => e.target.src = 'fallback-image.jpg'}
              />
              <h3>{product.name}</h3>
              <p className="product-price">₦{product.price.toLocaleString()}</p>
              <Link to={`/product/${product.id}`} className="details-link">View Details</Link>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Pagination */}
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

export default ProductListing;
