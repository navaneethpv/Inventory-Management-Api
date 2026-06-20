const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {createProduct} = require('../controllers/productController');

// Create a new product
router.post('/add', authMiddleware, createProduct);

module.exports = router;