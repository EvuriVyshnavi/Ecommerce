import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import DeliverySlot from '../models/DeliverySlot.js';
import Notification from '../models/Notification.js';

// @desc    Get delivery slots for a specific date and area
// @route   GET /api/delivery/slots
// @access  Public
const getDeliverySlots = asyncHandler(async (req, res) => {
  const { date, area } = req.query;

  if (!date || !area) {
    res.status(400);
    throw new Error('Date and area are required');
  }

  const slots = await DeliverySlot.find({
    date: new Date(date),
    deliveryArea: area,
    isAvailable: true,
  }).sort({ timeSlot: 1 });

  res.json(slots);
});

// @desc    Update order delivery status
// @route   PUT /api/delivery/orders/:id/status
// @access  Private/Admin
const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const { status, deliveryPerson, estimatedDeliveryTime, trackingNumber } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.deliveryStatus = status;

  if (status === 'out_for_delivery' && deliveryPerson) {
    order.deliveryPerson = deliveryPerson;
  }

  if (estimatedDeliveryTime) {
    order.estimatedDeliveryTime = new Date(estimatedDeliveryTime);
  }

  if (trackingNumber) {
    order.trackingNumber = trackingNumber;
  }

  if (status === 'delivered') {
    order.isDelivered = true;
    order.deliveredAt = new Date();
  }

  const updatedOrder = await order.save();

  // Create notification for user
  await Notification.create({
    user: order.user,
    title: 'Order Status Update',
    message: `Your order status has been updated to: ${status.replace('_', ' ')}`,
    type: 'delivery_update',
    order: order._id,
  });

  res.json(updatedOrder);
});

// @desc    Get delivery tracking information
// @route   GET /api/delivery/orders/:id/tracking
// @access  Private
const getDeliveryTracking = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).select(
    'deliveryStatus estimatedDeliveryTime trackingNumber deliveryPerson deliveryLocation createdAt'
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json(order);
});

// @desc    Get all orders for delivery management
// @route   GET /api/delivery/orders
// @access  Private/Admin
const getDeliveryOrders = asyncHandler(async (req, res) => {
  const { status, date } = req.query;

  let filter = {};

  if (status) {
    filter.deliveryStatus = status;
  }

  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    filter.createdAt = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  const orders = await Order.find(filter)
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.json(orders);
});

// @desc    Update delivery location (for real-time tracking)
// @route   PUT /api/delivery/orders/:id/location
// @access  Private/Admin
const updateDeliveryLocation = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.deliveryLocation = { latitude, longitude };
  await order.save();

  res.json({ message: 'Delivery location updated' });
});

export {
  getDeliverySlots,
  updateDeliveryStatus,
  getDeliveryTracking,
  getDeliveryOrders,
  updateDeliveryLocation,
};
