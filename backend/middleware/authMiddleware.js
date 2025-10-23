import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; // Assuming you have this library installed and use it
import User from '../models/userModel.js'; // Assuming your model is named userModel.js and uses export default

// Middleware to check if a user is authenticated (has a valid token)
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Check for token in the 'Authorization: Bearer <token>' header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (removes 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user data to the request object (excluding password)
            // Note: Assuming your decoded token has 'userId' instead of 'id' from your CommonJS code
            req.user = await User.findById(decoded.userId).select('-password'); 

            // Continue
            next();

        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Middleware to check if the authenticated user is an admin
export const admin = (req, res, next) => {
    // req.user is attached by the 'protect' middleware.
    // Assuming the admin flag is stored as req.user.isAdmin (boolean)
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};