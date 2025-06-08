import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import products from './productsData';
import './ProductListing.css';

const Spinner = () => (
  <div style={{
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '8px',
  }} />
);

const ProductListing = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingProductId, setLoadingProductId] = useState(null); // Track loading product
  const productsPerPage = 6; 

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

  const handleAddToCart = async (product) => {
    setLoadingProductId(product.id);
    try {
      await addToCart(product);
    } finally {
      setLoadingProductId(null);
    }
  };

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
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart(product)}
                disabled={loadingProductId === product.id}
              >
                {loadingProductId === product.id ? (
                  <>
                    Adding
                    <Spinner />
                  </>
                ) : (
                  'Add to Cart'
                )}
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

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductListing;
