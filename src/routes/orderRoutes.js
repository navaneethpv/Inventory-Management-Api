const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { createOrders, getOrders} = require('../controllers/orderController');

// Create a new order
router.post('/create', authMiddleware, createOrders);

// List all orders
router.get('/list', authMiddleware, getOrders);

module.exports = router;