// backend/routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = express.Router();

// @route   POST /api/auth/register
// This calls the registerUser function when a POST request hits this URL
router.post('/register', registerUser);

// @route   POST /api/auth/login
// This calls the loginUser function when a POST request hits this URL
router.post('/login', loginUser);

export default router;
