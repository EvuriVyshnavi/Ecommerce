import React from 'react';
// Note: This component assumes Font Awesome is linked in your public HTML file.

const Rating = ({ value, text }) => {
  return (
    <div className='flex items-center space-x-1'>
      {[...Array(5)].map((_, index) => {
        // Star logic:
        // 1. Full Star: value is greater than or equal to the index + 1 (e.g., 3.5 >= 3)
        // 2. Half Star: value is greater than or equal to the index + 0.5 (e.g., 3.5 >= 3.5)
        // 3. Empty Star: value is less than the index + 0.5

        const starClass = value >= index + 1
          ? 'fas fa-star' // Full star
          : value >= index + 0.5
          ? 'fas fa-star-half-alt' // Half star
          : 'far fa-star'; // Empty star

        return (
          <span key={index} className='text-yellow-500'>
            <i className={starClass}></i>
          </span>
        );
      })}
      
      {/* Display the review count text if provided */}
      <span className='ml-2 text-sm text-gray-600'>
        {text && text}
      </span>
    </div>
  );
};

export default Rating;
