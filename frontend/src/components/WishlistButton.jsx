import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const WishlistButton = ({ productId }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Check if product is in wishlist (from localStorage for now)
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (isWishlisted) {
      const updatedWishlist = wishlist.filter(id => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    } else {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  return (
    <button
      className={`btn btn-sm ${isWishlisted ? 'btn-danger' : 'btn-outline-danger'}`}
      onClick={toggleWishlist}
      style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
    >
      {isWishlisted ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default WishlistButton;
