const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {createProduct, getProducts} = require('../controllers/productController');

// Create a new product
router.post('/add', authMiddleware, createProduct);
router.get('/', authMiddleware, getProducts);

module.exports = router;