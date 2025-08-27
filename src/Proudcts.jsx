import React, { useState, useEffect } from 'react';
import Proudct from './Proudct';
import Filter from './Filter';
import './Proudct.css';

function Proudcts({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply search filter when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleFilter = (filterOptions) => {
    let filtered = products;
    
    // Filter by category
    if (filterOptions.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category === filterOptions.category
      );
    }
    
    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= filterOptions.minPrice && 
      product.price <= filterOptions.maxPrice
    );
    
    // Apply search filter if search term exists
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="proudcts container">
      <h1 className="prod-header">Our Products</h1>
      
      {/* Show search results */}
      {searchTerm && (
        <div className="search-results">
          <h3>Search results for: "{searchTerm}"</h3>
          <p>Found {filteredProducts.length} products</p>
          <button 
            onClick={() => window.location.reload()} 
            className="clear-search-btn"
          >
            Clear Search
          </button>
        </div>
      )}

      <Filter categories={categories} onFilter={handleFilter} />
      
      <div className="products-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>
      
      <div className="cards">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Proudct key={product.id} myProd={product} />
          ))
        ) : (
          <div className="no-products">No products match your search criteria</div>
        )}
      </div>
    </div>
  );
}

export default Proudcts;