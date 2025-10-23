import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div 
      className='flex justify-center items-center'
      style={{
        width: '100%',
        height: '100vh',
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
        }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
