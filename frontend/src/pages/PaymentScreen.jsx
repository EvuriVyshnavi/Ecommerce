import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
// Import the action we defined in cartSlice
import { savePaymentMethod } from '../redux/slices/cartSlice'; 

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Get shipping address and current payment method from Redux
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod: currentPaymentMethod } = cart;

  // If shipping address is missing, redirect back to shipping page
  useEffect(() => {
    if (!shippingAddress || Object.keys(shippingAddress).length === 0) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  // 2. Local state for the selected payment method
  const [paymentMethod, setPaymentMethod] = useState(currentPaymentMethod || 'PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    // 3. Dispatch action to save the selected payment method to the cart state
    dispatch(savePaymentMethod(paymentMethod));
    // 4. Navigate to the final Place Order screen
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2  /> {/* Highlight up to Step 2 */}

      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            {/* PayPal/Credit Card Option */}
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal' // Value saved to Redux
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            {/* Stripe Option (if you plan to use it later) */}
            <Form.Check
              className='my-2'
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe' // Value saved to Redux
              checked={paymentMethod === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
