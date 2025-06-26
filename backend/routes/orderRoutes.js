const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/orders - Fetch orders for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    // req.user.id is available from authMiddleware
    const orders = await Order.find({ user: req.user.id })
      .sort({ orderDate: -1 }) // Sort by most recent
      .populate('user', 'name email'); // Optionally populate user details (e.g., name, email)

    if (!orders) {
      // This case might not be strictly necessary as find returns [] if no match
      // but can be kept for explicitness or if find could return null in some edge case.
      return res.status(404).json({ msg: 'No orders found for this user.' });
    }

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ msg: 'Server error while fetching orders.' });
  }
});

// Potential future routes:
// router.get('/:orderId', authMiddleware, async (req, res) => { ... }); // Fetch a specific order

module.exports = router;
