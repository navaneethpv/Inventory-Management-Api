const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const {category, name, description, price, stockQuantity,status} = req.body;
        if (price <= 0) {
            return res.status(400).json({ success: false, message: 'Price must be greater than zero'});
        }
        if (stockQuantity < 0) {
            return res.status(400).json({ success: false, message: 'Stock cannot be negative'});
        }
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ success: false, message: 'Category not found'});
        }
        const product = await Product.create({
            category,
            name,
            description,
            price,
            stockQuantity,
            status
        });
        res.status(201).json({ success: true, product });
    }catch (error) {
        res.status(500).json({ success: false, message: 'Server Error while creating product', error: error.message
        })
    } 
}

// List products 
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get one product by ID
exports.getProduct = async (req, res) => {
  try {
    const product =
      await Product.findById(req.params.id)
        .populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

