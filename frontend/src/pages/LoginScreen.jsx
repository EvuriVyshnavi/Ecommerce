import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer'; // Assuming you have this component
// 🛑 Correctly import the RTK Query hook and Auth actions
import { useLoginMutation } from '../redux/slices/usersApiSlice'; 
import { setCredentials } from '../redux/slices/authSlice';       

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // RTK Query hook for login
  const [login, { isLoading, error }] = useLoginMutation(); 

  // Check for user info in state
  const { userInfo } = useSelector((state) => state.auth);

  // Get the redirect path from the URL, defaulting to the home page
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // 1. Execute the login mutation. RTK Query handles the POST request
      // and automatically targets the correct URL: /api/users/auth
      const res = await login({ email, password }).unwrap(); 
      
      // 2. Dispatch the setCredentials action to update Redux state and localStorage
      dispatch(setCredentials({ ...res }));                   

      // 3. Navigate to the appropriate screen
      navigate(redirect);
      
    } catch (err) {
      // The RTK Query error object is already set in the state variable 'error'
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <h1 className='text-3xl mb-4'>Sign In</h1>

      {/* Display error message if the mutation failed */}
      {error && (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          className='mt-3 w-full'
          disabled={isLoading}
        >
          Sign In
        </Button>
      </Form>

      {/* Display loader while request is in progress */}
      {isLoading && <Loader />}

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
