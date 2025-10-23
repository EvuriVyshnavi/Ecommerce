// frontend/src/pages/OrderScreen.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetOrderDetailsQuery } from '../redux/slices/ordersApiSlice';
import { useLocation } from 'react-router-dom';

const OrderScreen = () => {
  const { id } = useParams();
  const location = useLocation();

  // If the order object was passed via navigation state, use it immediately
  const initialOrder = location?.state?.order || null;

  // Fetch order details using RTK Query (only if we don't have initialOrder)
  const { data: fetchedOrder, isLoading, error } = useGetOrderDetailsQuery(id, { skip: Boolean(initialOrder) });

  const order = initialOrder || fetchedOrder;

  if (isLoading) return <Loader />;
  if (error) return <Message variant='danger'>{error?.data?.message || error.message || 'Failed to load order. Please check the order id or server.'}</Message>;

  // Safety: ensure order exists
  if (!order) return <Message variant='info'>Order not found</Message>;

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className='text-3xl font-bold mb-4'>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {/* Shipping Section */}
            <ListGroup.Item>
              <h2 className='text-xl font-semibold'>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress?.address}, {order.shippingAddress?.city},{' '}
                {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
              </p>
              {order.isDelivered ? (
                <div className='text-green-600'>Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</div>
              ) : (
                <div className='text-red-600'>Not Delivered</div>
              )}
            </ListGroup.Item>

            {/* Payment Method Section */}
            <ListGroup.Item>
              <h2 className='text-xl font-semibold'>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <div className='text-green-600'>Paid on {new Date(order.paidAt).toLocaleDateString()}</div>
              ) : (
                <div className='text-red-600'>Not Paid</div>
              )}
            </ListGroup.Item>

            {/* Order Items Section */}
            <ListGroup.Item>
              <h2 className='text-xl font-semibold'>Order Items</h2>
              <ListGroup variant='flush'>
                {(order.orderItems || []).map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <a href={`/product/${item.product}`}>{item.name}</a>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ₹{Number(item.price).toFixed(2)} = ₹{(item.qty * Number(item.price)).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='text-2xl font-bold'>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{Number(order.itemsPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{Number(order.shippingPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{Number(order.taxPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{Number(order.totalPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;