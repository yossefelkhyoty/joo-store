import { useState, useEffect, useCallback } from 'react';
import Proudct from './Proudct';
import Filter from './Filter';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorState from './components/ErrorState';
import { useApp } from './context/useApp';
import { fetchProducts } from './services/api';
import './Proudct.css';

function applyFilters(products, { category, minPrice, maxPrice, searchTerm }) {
  let filtered = products;

  if (category && category !== 'all') {
    filtered = filtered.filter(product => product.category === category);
  }

  filtered = filtered.filter(
    product => product.price >= minPrice && product.price <= maxPrice
  );

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      product =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
  }

  return filtered;
}

function Proudcts() {
  const { searchTerm, clearSearch } = useApp();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: Infinity,
  });

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setCategories([...new Set(data.map(product => product.category))]);
    } catch (err) {
      setError(err.message || 'Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    setFilteredProducts(applyFilters(products, { ...activeFilters, searchTerm }));
  }, [searchTerm, products, activeFilters]);

  const handleFilter = filterOptions => {
    setActiveFilters(filterOptions);
    setFilteredProducts(applyFilters(products, { ...filterOptions, searchTerm }));
  };

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error) {
    return (
      <div className="container">
        <ErrorState message={error} onRetry={loadProducts} />
      </div>
    );
  }

  return (
    <div className="proudcts container">
      <h1 className="prod-header">Our Products</h1>

      {searchTerm && (
        <div className="search-results">
          <h3>Search results for: &ldquo;{searchTerm}&rdquo;</h3>
          <p>Found {filteredProducts.length} products</p>
          <button onClick={clearSearch} className="clear-search-btn" type="button">
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
          <div className="no-products">
            <i className="fas fa-search" aria-hidden="true" />
            <p>No products match your criteria</p>
            <button onClick={clearSearch} className="clear-search-btn" type="button">
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Proudcts;
