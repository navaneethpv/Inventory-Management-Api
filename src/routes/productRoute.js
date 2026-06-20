const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {createProduct, getProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/productController');

// Create a new product
router.post('/add', authMiddleware, createProduct);
router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);
module.exports = router;