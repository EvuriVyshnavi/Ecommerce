import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter as Router
import { Container } from 'react-bootstrap';

// Layout & Components
import Header from './components/Header';
import Footer from './components/Footer';

// Public Screens (Visible to all users)
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';

// Protected/Private Screen Imports (Required Login)
import PrivateRoute from './components/PrivateRoute';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import ProfileScreen from './pages/ProfileScreen';
import DeliverySlotsScreen from './pages/DeliverySlotsScreen';
import DeliveryTracking from './components/DeliveryTracking';


function App() {
  return (
    // 🛑 REMOVED <Router> TAG HERE 🛑
    <>
      <main className='py-3'>
        <Container>
          {/* Define all application routes here */}
          <Routes>

            {/* =====================================
              1. PUBLIC ROUTES (Accessible by everyone)
              =====================================
            */}
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />

            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            {/* Order details should be accessible after placing an order (public for now) */}
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/' element={<HomeScreen />} />


            {/* =====================================
              2. PRIVATE ROUTES (Protected by PrivateRoute)
              =====================================
            */}
            <Route path='' element={<PrivateRoute />}>
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              {/* 🛑 FIX APPLIED HERE: Added the missing route for the payment page */}
              <Route path='/paymentmethod' element={<PaymentScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/deliveryslots' element={<DeliverySlotsScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id/tracking' element={<DeliveryTracking />} />
            </Route>

          </Routes>
        </Container>
      </main>
      <Footer />
    </>
    // 🛑 REMOVED </Router> TAG HERE 🛑
  );
}

export default App;
