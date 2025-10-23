// frontend/src/components/CheckoutSteps.jsx

import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

// This component takes boolean props (step1, step2, etc.) to determine which steps are active.
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      {/* Step 0: Cart */}
      <Nav.Item>
        <LinkContainer to='/cart'>
          <Nav.Link>Cart</Nav.Link>
        </LinkContainer>
      </Nav.Item>

      {/* Step 1: Shipping */}
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      {/* Step 2: Payment */}
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      {/* Step 3: Place Order */}
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>

      {/* Step 4: Order Details */}
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/order'>
            <Nav.Link>Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;