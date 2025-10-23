import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const categories = [
    'All',
    'Fruits',
    'Vegetables',
    'Ice Creams',
    'Juices'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm, category);
    } else {
      // Navigate to home with search params
      navigate(`/?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for groceries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat === 'All' ? '' : cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-search"></i> Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
