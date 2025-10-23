import express from 'express';
// Assuming you have a userController to handle the logic
import { 
  authUser, 
  registerUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile 
} from '../controllers/userController.js';

// Assuming you will create a middleware for protection later
// import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Public routes for user authentication
router.post('/auth', authUser); // Login route: POST /api/users/auth
router.post('/', registerUser); // Register route: POST /api/users
router.post('/logout', logoutUser); // Logout route: POST /api/users/logout

// Protected routes (will need 'protect' middleware later)
// For now, these are public until you add the 'protect' middleware
router.route('/profile')
  .get(getUserProfile) // GET /api/users/profile
  .put(updateUserProfile); // PUT /api/users/profile


export default router;