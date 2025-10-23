import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div 
      // Tailwind classes to ensure the loader is centered on the page
      className='flex justify-center items-center'
      style={{
        // Give it some height so it appears correctly in the main container
        width: '100%',
        minHeight: '300px', // Adjusted height from '100vh' to prevent full page takeover
      }}
    >
      <Spinner
        animation='border'
        role='status'
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block',
          color: '#10B981' // Tailwind 'green-500' color for a nice grocery theme
        }}
      >
        {/* Screen reader text for accessibility */}
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;