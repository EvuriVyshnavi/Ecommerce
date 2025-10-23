import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        // Show Ice Creams first on initial load
        const prioritizeIceCreams = (arr) => {
          if (!Array.isArray(arr)) return arr;
          const ice = arr.filter(p => p.category === 'Ice Creams');
          const others = arr.filter(p => p.category !== 'Ice Creams');
          return [...ice, ...others];
        };

        setFilteredProducts(prioritizeIceCreams(data));
        setLoading(false);
      } catch (err) {
        setError('Error fetching products from the server. Check if backend is running.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchTerm = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Prioritize Ice Creams when displaying lists
    const prioritizeIceCreams = (arr) => {
      if (!Array.isArray(arr)) return arr;
      const ice = arr.filter(p => p.category === 'Ice Creams');
      const others = arr.filter(p => p.category !== 'Ice Creams');
      return [...ice, ...others];
    };

    setFilteredProducts(prioritizeIceCreams(filtered));
  }, [searchParams, products]);

  const handleSearch = (searchTerm, category) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Keep Ice Creams at the top after user search
    const prioritizeIceCreams = (arr) => {
      if (!Array.isArray(arr)) return arr;
      const ice = arr.filter(p => p.category === 'Ice Creams');
      const others = arr.filter(p => p.category !== 'Ice Creams');
      return [...ice, ...others];
    };

    setFilteredProducts(prioritizeIceCreams(filtered));
  };

  if (loading) {
    return <h2>Loading Products...</h2>;
  }
  if (error) {
    return <h2 style={{ color: 'red' }}>{error}</h2>;
  }

  return (
    <div>
      <Header
        selectedCategory={searchParams.get('category') || ''}
        onCategoryChange={(category) => {
          const newSearchParams = new URLSearchParams(searchParams);
          if (category) {
            newSearchParams.set('category', category);
          } else {
            newSearchParams.delete('category');
          }
          setSearchParams(newSearchParams);
        }}
      />
      <div className="container mt-4">
        <h1>Latest Groceries</h1>
        <SearchBar onSearch={handleSearch} />
        {filteredProducts.length === 0 ? (
          <div className="text-center">
            <h3>No products found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
