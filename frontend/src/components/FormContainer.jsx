import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * A reusable component to contain and center forms (like Login and Register).
 * It uses Bootstrap's grid system to ensure responsiveness.
 */
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        {/*
          Col md={6}: On medium screens and up, the column takes up 6 of the 12 available columns (half width).
          Col xs={12}: On extra-small screens (mobile), it takes up the full width.
        */}
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
