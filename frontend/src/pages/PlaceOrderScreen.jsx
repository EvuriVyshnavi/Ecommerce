import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
// Import RTK Query hook for creating the order
import { useCreateOrderMutation } from '../redux/slices/ordersApiSlice';
// Import cart actions to clear the cart after successful order
import { clearCartItems } from '../redux/slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Get cart state from Redux
    const cart = useSelector((state) => state.cart);
    
    // RTK Query hook for mutation: provides the function and status
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    // Redirection check: if any mandatory step is missing, redirect the user
    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    // Local UI error state to show a readable error message
    const [localError, setLocalError] = React.useState(null);

    // Handler to place the order
    const placeOrderHandler = async () => {
        setLocalError(null);
        try {
            // Map items robustly: product may be stored under `product` or `_id` depending on flow
            const orderItemsFormatted = cart.cartItems.map(item => ({
                product: item.product || item._id,
                qty: Number(item.qty),
                name: item.name,
                image: item.image,
                price: Number(item.price),
            }));

            // Convert price fields to numbers (cart may store them as strings)
            const payload = {
                orderItems: orderItemsFormatted,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: Number(cart.itemsPrice) || 0,
                shippingPrice: Number(cart.shippingPrice) || 0,
                taxPrice: Number(cart.taxPrice) || 0,
                totalPrice: Number(cart.totalPrice) || 0,
            };

            const res = await createOrder(payload).unwrap();

            // Log the raw response for debugging when API responses differ
            console.log('createOrder response:', res);

            // Normalize order id from possible response shapes
            const orderId = res?._id || res?.id || (res?.data && (res.data._id || res.data.id));

            if (!orderId) {
                // If the server returned an unexpected payload, surface an error
                setLocalError('Order created but server returned an unexpected response. Check server logs.');
                return;
            }

            // Clear cart and navigate to created order, pass the order object in navigation state
            dispatch(clearCartItems());
            navigate(`/order/${orderId}`, { state: { order: res } });

        } catch (err) {
            // RTK Query returns a serialized error object; attempt to extract a friendly message
            console.error('Order placement failed:', err);
            const friendly = err?.data?.message || err?.error || err?.message || 'Order placement failed';
            setLocalError(friendly);
        }
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row className="items-center">
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                        onError={(e) => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjI1IiB5PSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjEwIj5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4='; }}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link 
                                                        // Ensure the link uses the correct product ID field for navigation
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            
                            {/* Display general error messages */}
                            <ListGroup.Item>
                                {(error || localError) && (
                                    <Message variant='danger'>
                                        {localError || error?.data?.message || error.error}
                                    </Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>₹{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>₹{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax (5%):</Col>
                                    <Col>₹{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                        <Col>
                                        <strong>₹{cart.totalPrice}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems.length === 0 || isLoading}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                                {isLoading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;