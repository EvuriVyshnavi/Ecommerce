import React from 'react';
// Redux imports (useDispatch, addToCart) remain commented out to keep the file compilable for now.

const Product = ({ product }) => {
  // Placeholder handler for Add to Cart, since Redux is commented out
  const placeholderCartHandler = () => {
    console.log('Add to Cart clicked. Functionality temporarily stubbed.');
  };

  // Use the image path as provided by the backend (it's already an absolute path under /images)
  const imageUrl = product.image || '/images/no-image.jpg';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl p-4 flex flex-col sm:flex-row items-center space-x-4">
      
      {/* 1. Image Display with Corrected Path */}
      <div className="w-24 h-24 flex items-center justify-center p-2">
        <img
          src={imageUrl}
          alt={product.name}
          className="max-w-full max-h-full object-contain rounded"
          // Add an onError handler that attempts to load a .svg fallback when .jpg is missing
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            try {
              const src = e.target.src || '';
              if (src.endsWith('.jpg')) {
                e.target.src = src.replace(/\.jpg$/i, '.svg');
                return;
              }
            } catch (err) {
              // ignore
            }
            e.target.src = 'https://placehold.co/96x96/E0E7FF/374151?text=No+Image';
          }}
        />
      </div>

      {/* 2. Product Details */}
      <div className="flex-1 min-w-0">
        <div className="text-gray-900 font-semibold truncate">{product.name}</div>
        <div className="text-sm text-gray-500">{product.unit}</div>
        <div className="text-xl font-bold text-green-600 mt-1">
          ₹{product.price.toFixed(2)}
        </div>
      </div>

      {/* 3. Action Controls */}
      <div className="flex items-center space-x-2 mt-3 sm:mt-0">
        <input
          type="number"
          defaultValue={1}
          min="1"
          max="99"
          id={`qty-${product._id}`}
          className="w-16 p-2 border border-gray-300 rounded text-center focus:ring-green-500 focus:border-green-500"
        />
        <button
          onClick={placeholderCartHandler}
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-150 shadow-md flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;