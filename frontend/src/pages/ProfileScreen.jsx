// frontend/src/pages/ProfileScreen.jsx

import React, { useState } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Message from '../components/Message';
// import Loader from '../components/Loader';

const ProfileScreen = () => {
  const [name, setName] = useState('User Name');
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  // Placeholder data for order history
  const orders = [
    { _id: '12345', createdAt: '2025-05-01', total: 55.99, isPaid: true, isDelivered: true },
    { _id: '67890', createdAt: '2025-06-15', total: 102.50, isPaid: true, isDelivered: false },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      // Dispatch update profile action here
      console.log('Updating profile...');
    }
  };

  return (
    <Row>
      {/* -------------------- Column 1: User Profile Form -------------------- */}
      <Col md={3}>
        <h2 className='text-2xl font-bold mb-4'>User Profile</h2>
        {message && <div className='text-red-600 mb-3'>{message}</div>}
        {/* {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />} */}
        
        <Form onSubmit={submitHandler}>
          {/* Name Field */}
          <Form.Group controlId='name' className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Email Field */}
          <Form.Group controlId='email' className='mb-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Password Field */}
          <Form.Group controlId='password' className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Confirm Password Field */}
          <Form.Group controlId='confirmPassword' className='mb-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='w-full mt-3'>
            Update Profile
          </Button>
        </Form>
      </Col>

      {/* -------------------- Column 2: Order History -------------------- */}
      <Col md={9}>
        <h2 className='text-2xl font-bold mb-4'>My Orders</h2>
        {/* {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : ( */}
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>₹{order.total}</td>
                <td className={order.isPaid ? 'text-green-600' : 'text-red-600'}>
                  {order.isPaid ? 'Yes' : 'No'}
                </td>
                <td className={order.isDelivered ? 'text-green-600' : 'text-red-600'}>
                  {order.isDelivered ? 'Yes' : 'No'}
                </td>
                <td>
                  <Button
                    href={`/order/${order._id}`}
                    className='btn-sm'
                    variant='light'
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* )} */}
      </Col>
    </Row>
  );
};

export default ProfileScreen;