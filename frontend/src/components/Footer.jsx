// frontend/src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '10px 20px', background: '#f0f0f0', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
      <p>&copy; {new Date().getFullYear()} Grocery MERN App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
