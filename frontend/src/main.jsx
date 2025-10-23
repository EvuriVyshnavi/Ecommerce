// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// NOTE: BrowserRouter is imported here but should be handled in App.jsx or another high-level component
// If you are defining routes in App.jsx, you need to import BrowserRouter there, not here.
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './redux/store'; 
import App from './App.jsx';

// Import all required CSS
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provides the Redux store to the entire application */}
    <Provider store={store}>
      {/* 🛑 CRITICAL FIX: Ensure the <BrowserRouter> is ONLY used once, 
           usually wrapped around the <App /> component where routes are defined.
           If your application is still crashing, this wrapper must be REMOVED here 
           and put inside the App.jsx file instead. 
           
           For now, let's assume it's needed here, but check App.jsx next if it fails.
      */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);