import express from 'express';
import {
  getDeliverySlots,
  updateDeliveryStatus,
  getDeliveryTracking,
  getDeliveryOrders,
  updateDeliveryLocation,
} from '../controllers/deliveryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/slots', getDeliverySlots);

// Protected routes
router.get('/orders/:id/tracking', protect, getDeliveryTracking);

// Admin routes
router.get('/orders', protect, admin, getDeliveryOrders);
router.put('/orders/:id/status', protect, admin, updateDeliveryStatus);
router.put('/orders/:id/location', protect, admin, updateDeliveryLocation);

export default router;
