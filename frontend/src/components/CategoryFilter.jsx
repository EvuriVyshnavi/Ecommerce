import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    'All',
    'Fruits',
    'Vegetables',
    'Ice Creams',
    'Juices',
  ];

  const handleCategoryClick = (category) => {
    const categoryValue = category === 'All' ? '' : category;
    onCategoryChange(categoryValue);
  };

  return (
    <div style={{ padding: '10px' }}>
      <h5 style={{ marginBottom: '10px', color: '#333' }}>Categories</h5>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {categories.map(category => (
          <button
            key={category}
            style={{
              padding: '8px 12px',
              border: selectedCategory === (category === 'All' ? '' : category) ? '2px solid #007bff' : '1px solid #ddd',
              backgroundColor: selectedCategory === (category === 'All' ? '' : category) ? '#007bff' : 'white',
              color: selectedCategory === (category === 'All' ? '' : category) ? 'white' : '#333',
              borderRadius: '4px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
