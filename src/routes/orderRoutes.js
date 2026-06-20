const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {createOrder, getOrders, getOrderById, updateOrderStatus} = require('../controllers/orderController');

// Create a new order
router.post('/create', authMiddleware, createOrder);

// List all orders
router.get('/list', authMiddleware, getOrders);

// Get order details by ID
router.get('/:id', authMiddleware, getOrderById);

// Update order status
router.put('/:id/status', authMiddleware, updateOrderStatus);

module.exports = router;