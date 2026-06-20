const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {createOrder, getOrders, getOrderById} = require('../controllers/orderController');

// Create a new order
router.post('/create', authMiddleware, createOrder);

// List all orders
router.get('/list', authMiddleware, getOrders);

// Get order details by ID
router.get('/details/:id', authMiddleware, getOrderById);

module.exports = router;