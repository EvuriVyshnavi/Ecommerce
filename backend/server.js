import path from 'path'; // Node.js utility for file paths
import fs from 'fs'; // Node.js utility for file system operations (used for creating the uploads folder)
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 

// Import custom utilities
import connectDB from './config/db.js'; 
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; 
import { getDirname } from './utils/pathUtils.js'; // Utility to resolve __dirname in ES modules

// Import all routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // 🛑 NEW: Import the upload route
import deliveryRoutes from './routes/deliveryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import authRoutes from './routes/authRoutes.js';

// --- Configuration Setup ---
dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// --- CORS Configuration ---
import cors from 'cors';
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from frontend
    credentials: true // Allow cookies to be sent
}));

// --- Body Parser Middleware (allows reading JSON and URL-encoded bodies) ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Cookie Parser Middleware (allows reading cookies from requests) ---
app.use(cookieParser());

// --- Define API Routes ---
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/upload', uploadRoutes); // 🛑 Mount the upload route
app.use('/api/delivery', deliveryRoutes);

// ==============================================
// 🛑 FILE UPLOAD CONFIGURATION AND STATIC SERVING 🛑
// ==============================================

// 1. Get the directory name for the current file (proshop/backend)
const __dirname = getDirname(import.meta.url); 

// 2. Define the absolute path to the uploads directory
const uploadPath = path.join(__dirname, '../frontend/public/images');

// 3. Check if the uploads directory exists, and create it if it doesn't
if (!fs.existsSync(uploadPath)) {
    // fs.mkdirSync is synchronous, which is acceptable at server startup
    fs.mkdirSync(uploadPath);
    console.log(`Created uploads directory at: ${uploadPath}`);
}

// 4. Map the virtual URL path /images to the physical directory backend/uploads
// This allows the browser to access images via paths like http://localhost:5000/images/image-12345.jpg
app.use('/images', express.static(uploadPath)); 

// ==============================================
// Fallback for Frontend in Production
// ==============================================

if (process.env.NODE_ENV === 'production') {
    // In production, serve the static frontend build
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    
    // Any route not handled by the API should serve the index.html from the frontend build
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    // In development, provide a simple message for the root URL
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// --- Error Handling Middleware ---
app.use(notFound); // Handles 404s
app.use(errorHandler); // Handles other errors (like the Multer error in uploadRoutes.js)

// --- Start Server ---
const port = process.env.PORT || 5000;
const host = process.env.HOST || '127.0.0.1';

// Better startup logging to aid debugging when requests fail
console.log(`Starting server. NODE_ENV=${process.env.NODE_ENV || 'development'}, PORT=${port}, HOST=${host}`);

// Global error handlers to capture unexpected crashes
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Bind explicitly to localhost to avoid ambiguous interface binding issues
app.listen(port, host, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on ${host}:${port}`);
});