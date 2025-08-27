import React, { useState } from 'react';
import './Filter.css';

function Filter({ categories, onFilter }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    onFilter({
      category: selectedCategory,
      minPrice: minPrice ? Number(minPrice) : 0,
      maxPrice: maxPrice ? Number(maxPrice) : Infinity
    });
  };

  const handleReset = () => {
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    onFilter({
      category: 'all',
      minPrice: 0,
      maxPrice: Infinity
    });
  };

  return (
    <div className="filter">
      <h3>Filter Products</h3>
      <div className="filter-controls">
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Price From:</label>
          <input 
            type="number" 
            value={minPrice} 
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
          />
        </div>

        <div className="filter-group">
          <label>Price To:</label>
          <input 
            type="number" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
          />
        </div>

        <div className="filter-buttons">
          <button onClick={handleFilter} className="filter-btn">Apply Filters</button>
          <button onClick={handleReset} className="reset-btn">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Filter;